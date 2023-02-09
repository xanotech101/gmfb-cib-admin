import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { Update } from './Update';

export const Settings = () => {
  return (
    <div className="pl-5 pr-4 my-8">
      <Container>
        <Heading>
          Settings
          <p className="mt-1 text-sm text-gray-500">Kindly make your changes below.</p>
        </Heading>
        <Update />
      </Container>
    </div>
  );
};
