import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
let current = true;
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const DropDown = ({ title, icon, children }) => {
  return (
    <Menu as="div" className=" block mt-4">
      <Menu.Button
        className={classNames(
          current ? 'grooming-color2 text-white' : 'text-white grooming-color2',
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
        )}>
        <span>{icon}</span>
        <a>{title}</a>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute  z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
