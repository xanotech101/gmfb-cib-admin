import { Container } from 'components/Container/Container';
import React from 'react';
import { InitiateRequestForm } from './InitiateRequestForm';

export const InitiateRequest = () => {
  return (
    <div className="lg:w-[70%] w-full py-6 pr-10 pl-5">
      <Container>
        <div className="mb-10 border-b pb-2">
          <h1 className="text-2xl font-medium leading-6 text-gray-900 mb-3">Initiate Request</h1>
          <p className="font-medium">Fill in customer&apos;s request details</p>
        </div>
        <InitiateRequestForm />
      </Container>
    </div>
  );
};
