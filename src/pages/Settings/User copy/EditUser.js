import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
export const EditUser = () => {
  return (
    <div className="">
      <Container>
        <form action="" className="">
          <Heading>Edit corperate user details</Heading>
          <p className="font-medium">Edit Corperate user details below</p>
          <div className="mt-4">
            <hr></hr>
          </div>
          <div className="mt-4">
            <Input label="Full name" type="text" />
          </div>
          <div className="mt-4">
            <Input label="Phone number" type="text" />
          </div>
          <div className="mt-4">
            <Input label="Email address" type="text" />
          </div>
          <div className="mt-4">
            <Input label="Authorizers ID" type="text" />
          </div>
          <div className="mt-4">
            <Input label="Password" type="password" />
          </div>
          <div className="flex gap-5 mt-4 justify-end">
            <Button variant="primary">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
