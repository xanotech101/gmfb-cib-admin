import { SubHeading } from 'components/Header/SubHeading';
import { Container } from 'components/Container/Container';
import React from 'react';
import BulkUploadForm from './BulkUploadForm';

export const BulkUpload = () => {
  return (
    <div className="lg:w-[50%]">
      <Container>
        <SubHeading>Limit your bulk upload in this system. </SubHeading>
        <BulkUploadForm />
      </Container>
    </div>
  );
};
