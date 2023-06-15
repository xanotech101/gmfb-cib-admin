import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NotificationItem } from './NotificationItem';
import { useStore, useModal, useNotifications } from 'hooks';
import { Button } from 'components/Button/Button';
import { TrashIcon } from '@heroicons/react/20/solid';

export const Notification = ({ open, setOpen }) => {
  const { showModal, Modal } = useModal();
  const { notifications } = useStore();
  const { deleteNotifications } = useNotifications();
  const [currentNotifications, setCurrentNotifications] = useState([]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="bg-white z-50 py-6 shadow-xl h-full">
                      <div className="px-4 sm:px-6 pb-4 border-b h-[5%]">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Notifications
                        </Dialog.Title>
                      </div>
                      <div className="flex h-[87%] flex-col overflow-y-scroll">
                        <div className="relative flex-1 divide-y divide-gray-200">
                          {notifications?.length > 0 ? (
                            notifications.map((notification) => (
                              <NotificationItem
                                key={notification._id}
                                notification={notification}
                                onDelete={(n) => {
                                  showModal();
                                  setCurrentNotifications((currentNotifications) => [
                                    ...new Set([...currentNotifications, n])
                                  ]);
                                }}
                              />
                            ))
                          ) : (
                            <div className="flex items-center justify-center flex-1 h-[80vh] px-4 sm:px-6">
                              <h3>
                                You have no notifications at the moment. Please check back later.
                              </h3>
                            </div>
                          )}
                        </div>
                      </div>
                      {notifications.length > 0 && (
                        <div className="absolute bottom-0 w-full border-t h-[8%] flex items-center">
                          <div className=" w-full flex items-center justify-center py-4">
                            <Button variant="transparent">
                              <span className="text-primary">Clear all notifications</span>
                              <TrashIcon className="h-5 w-5 ml-2 text-primary" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {Modal({
        children: (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Are you sure?</h1>
            <p className="text-gray-500 text-center mt-2">
              This action cannot be undone. Are you sure you want to delete this notification?
            </p>
            <div className="flex space-x-5 mt-6">
              <Button variant="outline" onClick={showModal}>
                {deleteNotifications.isLoading ? '...' : 'Cancel'}
              </Button>
              <Button
                disabled={deleteNotifications.isLoading}
                variant="danger"
                onClick={() =>
                  deleteNotifications.mutate({
                    notifications: currentNotifications,
                    callback: showModal
                  })
                }>
                Delete
              </Button>
            </div>
          </div>
        )
      })}
    </>
  );
};
