import { SubHeading } from 'components/Common/Header/SubHeading';
import React from 'react';
import { ListOfUsers } from './ListOfUsers';
import { useModal } from 'hooks';
import { DiscardChanges } from 'pages/Profile/DiscardChanges';
export const User = () => {
  const { showModal, Modal } = useModal();
  return (
    <div>
      <SubHeading>Corperate users settings</SubHeading>
      <ListOfUsers decline={() => showModal()} />
      {Modal({
        children: (
          <DiscardChanges decline={() => showModal(false)} accept={() => showModal(false)}>
            Are you sure you want to disable user?
          </DiscardChanges>
        ),
        size: 'sm'
      })}
    </div>
  );
};
