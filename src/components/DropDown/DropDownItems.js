import React from 'react';
import { Menu } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export const DropDownItems = ({ children, flex, onClick }) => {
  return (
    <div className="rounded">
      <Menu.Item>
        {({ active }) => (
          <div
            onClick={onClick}
            className={classNames(
              active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
              'group  px-4 py-2 text-sm'
            )}>
            <div className={`text-black ${flex} mt-2`}>{children}</div>
          </div>
        )}
      </Menu.Item>
    </div>
  );
};
