import { SubHeading } from 'components/Common/Header/SubHeading';
import React from 'react';
import { CorporateUsers } from './CorporateUsers';
import { useModal } from 'hooks';
import { DiscardChanges } from 'pages/Profile/components/DiscardChanges';
import { Container } from 'components/Container/Container';
export const UserSettings = () => {
  const { showModal, Modal } = useModal();
  return (
    <div>
      <Container>
        <SubHeading>Corperate users settings</SubHeading>
        <CorporateUsers decline={() => showModal()} />
        {Modal({
          children: (
            <DiscardChanges decline={() => showModal(false)} accept={() => showModal(false)}>
              Are you sure you want to disable user?
            </DiscardChanges>
          ),
          size: 'sm'
        })}
      </Container>
    </div>
  );
};
