import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { ProfileDetails } from './ProfileDetails';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useStore } from 'hooks';
import { Avatar } from './Avatar';
import { Audit } from 'pages/AuditTrail/AuditTrail';

export const Profile = () => {
  const { user } = useStore();

  return (
    <div className="p-6 w-full lg:w-[75%]">
      <Container>
        <div className="lg:flex md:block justify-between mt-2">
          <Heading>
            <h1>Profile Information</h1>
          </Heading>
          <Link to="/profile/edit-profile" className="border p-3 rounded-full  inline-block">
            Edit Profile
            <FontAwesomeIcon icon={faUserEdit} className="grooming-text cursor-pointer ml-1" />
          </Link>
        </div>
        <Avatar
          src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg"
          name={'Admin Officer'}
        />
        <ProfileDetails data={user}></ProfileDetails>
        <Audit style="py-5 pl-2 pr-2" />
      </Container>
    </div>
  );
};
