// TODO: refactor navigation
import { Dialog, Transition, Menu } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Logo } from 'components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks';
import LogoutPrompt from 'pages/Auth/LogoutPrompt/LogoutPrompt';
import { Bars3BottomLeftIcon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { userService } from 'services';
import { useNotifications, useStore } from 'hooks';
import { Notification } from 'components/Notification/Notification';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { Avatar } from 'components/Avatar/Avatar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const Sidebar = () => {
  const { notify } = useNotifications();
  const token = localStorage.getItem('token');
  const { data } = useQuery({
    queryKey: ['userProfile'],
    queryFn: userService.getProfile,
    enabled: !!token,
    onSuccess: (data) => {
      useStore.setState({ user: data.user });
    }
  });

  // fetch notifications
  useNotifications();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const userNavigation = [
    { name: 'Your Profile', href: 'profile' },
    { name: 'Settings', href: 'settings' },
    { name: 'Sign out', href: '/' }
  ];
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const handleLogout = () => {
    showModal();
  };

  return (
    <div className="z-50">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed -z-50 inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col grooming-color  pt-5 pb-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex flex-shrink-0 items-center px-4">
                  <Logo className="filt" />
                </div>
                <div className="mt-5 h-0 flex-1 pr-2">
                  <NavItem closeSidebar={() => setSidebarOpen(false)} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex flex-1 flex-col md:pl-64 fixed w-full z-10 top-0">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}>
            <Bars3BottomLeftIcon className="h-6 w-6 grooming-text" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end px-4">
            <div className="ml-4 flex items-center md:ml-6">
              <button type="button" className=" p-1 text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>

                <div className="p-5">
                  <strong className="relative inline-flex items-center  px-2.5 py-1.5 text-xs  font-medium">
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full grooming-color flex justify-center items-center items">
                      <span className="text-white">{notify?.data?.count ?? 0}</span>
                    </span>
                    <BellIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={() => {
                        setOpen(true);
                      }}
                    />
                  </strong>
                </div>
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://freesvg.org/storage/img/thumb/abstract-user-flat-4.png"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95">
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item as="div">
                      <p className="truncate px-4 text-sm text-gray-700 font-bold flex items-center pt-2">
                        <div className="flex-shrink-0">
                          <Avatar
                            name={`${data?.user?.firstName ?? ''} ${data?.user?.lastName ?? ''}`}
                            size={30}
                            textSize={12}
                          />
                        </div>
                        <span className="ml-1 truncate">
                          {data?.user?.firstName} {data?.user?.lastName}
                        </span>
                      </p>
                      <p className="truncate px-4 pt-1 text-sm text-gray-700">
                        {data?.user?.email}
                      </p>
                    </Menu.Item>
                    <hr className="mt-2" />
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) =>
                          item.href === '/' ? (
                            <p
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                              )}
                              onClick={handleLogout}>
                              {item.name}
                            </p>
                          ) : (
                            <Link
                              to={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}>
                              {item.name}
                            </Link>
                          )
                        }
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col grooming-color pt-5 pr-2">
          <div className="flex flex-shrink-0 items-center px-4">
            <Logo className="filt" />
          </div>
          <div className="mt-5 flex flex-1 flex-col">
            <NavItem closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
        <Notification open={open} setOpen={setOpen} />
      </div>
      {Modal({
        children: <LogoutPrompt navigate={() => navigate('/')} closeModal={showModal} />,
        size: 'sm'
      })}
    </div>
  );
};
