import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
let current = true;
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const DropDown = ({ title, icon, children, text }) => {
  return (
    <Menu as="div" className=" block">
      <Menu.Button
        className={classNames(
          current ? `${text}` : `${text}`,
          'group flex items-center px-2 py-2 text-sm font-medium  w-full'
        )}>
        <span>{icon}</span>
        <span>{title}</span>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="  z-10 mt-2 w-60    bg-white my-3  overflow-hidden   shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item className="absolute right-2 top-1 cursor-pointer">
            <XMarkIcon className="w-5 h-5" />
          </Menu.Item>
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
