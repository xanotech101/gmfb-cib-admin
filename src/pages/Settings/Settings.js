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
import { KeyIcon } from '@heroicons/react/24/outline';
export const Settings = () => {
  const navigate = useNavigate();
  const { Modal, showModal } = useModal();
  const handleLogout = () => {
    showModal();
  };
  const SettingsData = [
    // {
    //   title: 'update profile',
    //   icon: <UserCircleIcon className="w-6 h-6 text-black" />,
    //   to: '/profile/edit-profile',
    //   brief: 'Update existing profile details.'
    // },
    {
      title: 'Update Security Question',
      icon: <KeyIcon className="w-6 h-6 text-black" />,
      to: '/settings/general/update-security-question',
      brief: 'update security questions'
    },
    {
      title: 'Logout',
      icon: <ArrowLeftOnRectangleIcon className="w-6 h-6 text-black" />,
      to: '/',
      brief: 'Kindly logout here.'
    }
  ];

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
                  <p className="cursor-pointer underline" onClick={handleLogout}>
                    {setting.title}
                  </p>
                ) : (
                  <Link to={setting.to} className="capitalize underline">
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
