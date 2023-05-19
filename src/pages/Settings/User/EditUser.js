import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Header/Heading';
export const EditUser = () => {
  return (
    <div className="Dash py-5 px-7">
      <Container>
        <form action="" className="">
          <Heading>Edit corperate user details</Heading>
          <p className="font-medium">Edit Corperate user details below</p>
          <hr className="my-4"></hr>
          <div className="space-y-6">
            <Input label="Full name" type="text" />
            <Input label="Phone number" type="text" />
            <Input label="Email address" type="text" />
            <Input label="Authorizers ID" type="text" />
            <Input label="Password" type="password" />
            <div className="flex gap-5 mt-4 justify-end">
              <Button variant="primary">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
};
