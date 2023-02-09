import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { Button } from 'components/Button/Button';
import { Container } from 'components/Container/Container';
import { Heading } from 'components/Common/Header/Heading';
import { LinkButton } from 'components/Button/LinkRouteButton';
export const CreateCorperateUser = () => {
  return (
    <div className="Dash mt-8 ml-8">
      <LinkButton to="/settings">Back</LinkButton>
      <Container>
        <form action="" className="">
          <div>
            <Heading>Create corperate User</Heading>
            <p className="font-medium">Fill in corperate details below</p>
            <div className="mt-4">
              <hr></hr>
            </div>
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
          <div className="mt-4"></div>
          <div className="mt-4">
            <Button isFullWidth>Submit</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};
