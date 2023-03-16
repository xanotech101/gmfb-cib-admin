import React from 'react';
import { SubHeading } from 'components/Common/Header/SubHeading';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks';
import LogoutPrompt from 'pages/Auth/LogoutPrompt/LogoutPrompt';
import {
  ArrowRightIcon,
  // UserCircleIcon,
  ArrowLeftOnRectangleIcon
  // CloudArrowUpIcon
} from '@heroicons/react/20/solid';

import { List } from 'components/List/List';
import { Link } from 'react-router-dom';
export const Settings = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const SettingsData = [
    // {
    //   title: 'update profile',
    //   icon: <UserCircleIcon className="w-6 h-6 text-black" />,
    //   to: '/profile/edit-profile',
    //   brief: 'Update existing profile details.'
    // },
    // {
    //   title: 'bulk upload settings',
    //   icon: <CloudArrowUpIcon className="w-6 h-6 text-black" />,
    //   to: '/settings/general/limit-upload',
    //   brief: 'Limit bulk upload files.'
    // },
    {
      title: 'Logout',
      icon: <ArrowLeftOnRectangleIcon className="w-6 h-6 text-black" />,
      to: '/',
      brief: 'Kindly logout here.'
    }
  ];
  const handleLogout = () => {
    showModal();
  };
  return (
    <>
      <SubHeading>General Settings</SubHeading>
      <p className="mt-3">Here is a list of settings you can update.</p>
      <List>
        {SettingsData.map((setting) => (
          <List.Container key={setting.title}>
            <List.Item
              icon={setting.icon}
              title={
                setting.to === '/' ? (
                  <p className="cursor-pointer" onClick={handleLogout}>
                    {setting.title}
                  </p>
                ) : (
                  <Link to={setting.to} className="capitalize">
                    {setting.title}
                  </Link>
                )
              }
              variant="text-black">
              {setting.brief}
            </List.Item>
            <List.Item title={<ArrowRightIcon className="w-6 h-6" />} variant="text-black" />
          </List.Container>
        ))}
      </List>
      {Modal({
        children: <LogoutPrompt navigate={() => navigate('/')} closeModal={showModal} />,
        size: 'sm'
      })}
    </>
  );
};
