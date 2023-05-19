import React from 'react';
import { useModal } from 'hooks';
import { SubHeading } from 'components/Header/SubHeading';
import { DiscardChanges } from 'pages/Client/Profile/DiscardChanges';
export const ViewUsers = ({ decline }) => {
  const { showModal, Modal } = useModal();
  return (
    <div>
      <SubHeading>View Corperate Users</SubHeading>
      {Modal({
        children: (
          <DiscardChanges decline={decline} accept={() => showModal(false)}>
            Are you sure you want to decline?
          </DiscardChanges>
        ),
        size: 'sm'
      })}
    </div>
  );
};
