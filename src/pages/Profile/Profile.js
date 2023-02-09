import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { ProfileDetails } from './ProfileDetails';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useStore } from 'hooks';
import { Avatar } from './Avatar';

export const Profile = () => {
  const { user } = useStore();

  return (
    <div className="Dash my-8 lg:ml-8 px-4 lg:px-0">
      <Container>
        <div className="lg:flex md:block justify-between mt-2">
          <Heading>
            <h1>Profile Information</h1>
          </Heading>
          <Link to="/editprofile" className="border p-3 rounded-full  inline-block">
            Edit Profile
            <FontAwesomeIcon icon={faUserEdit} className="grooming-text cursor-pointer ml-1" />
          </Link>
        </div>
        <Avatar
          src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/bruce-mars.jpeg"
          name={'Admin Officer'}
        />
        <ProfileDetails data={user}></ProfileDetails>
      </Container>
    </div>
  );
};
