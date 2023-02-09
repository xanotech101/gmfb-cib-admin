import React from 'react'
import { Menu } from '@headlessui/react'
export const DropDownItems = ({children,classNames}) => {
  return (
    <div>
         <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                   <span className='text-black flex items-center'>{children}</span>
                   <hr></hr>
                </a>
              )}
            </Menu.Item>
    </div>
  )
}
