import React from 'react';
import { Menu } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const DropDownItems = ({ children, flex }) => {
  return (
    <div>
      <Menu.Item>
        {({ active }) => (
          <a
            href="#"
            className={classNames(
              active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
              'group flex items-center px-4 py-2 text-sm'
            )}>
            <div className={`text-black ${flex}`}>{children}</div>
            <hr></hr>
          </a>
        )}
      </Menu.Item>
    </div>
  );
};
