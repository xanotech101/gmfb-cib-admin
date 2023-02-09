import React from 'react';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { LinkButton } from 'components/Button/LinkRouteButton';
import { useModal } from 'hooks';
import { DiscardChanges } from './DiscardChanges';
import { useNavigate } from 'react-router-dom';
import { EditProfileForm } from './EditProfileForm';
export const EditProfile = () => {
  const navigate = useNavigate();
  function handleNavigation() {
    navigate('/profile');
    showModal(false);
  }
  const { showModal, Modal } = useModal();
  return (
    <div className="Dash my-8 lg:ml-8 px-4 lg:px-0">
      <LinkButton to="/profile">Back</LinkButton>
      <Container>
        <Heading>Edit Personal Info</Heading>
        <p className="text-sm">Update your photo and personal details here.</p>
        <EditProfileForm showModal={() => showModal()} />
      </Container>
      {Modal({
        children: (
          <DiscardChanges accept={handleNavigation} decline={() => showModal(false)}>
            Do you want to update changes?
          </DiscardChanges>
        ),
        size: 'sm'
      })}
    </div>
  );
};
