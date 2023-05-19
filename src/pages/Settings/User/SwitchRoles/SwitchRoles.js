import { SubHeading } from 'components/Header/SubHeading';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';

import React from 'react';
import { Button } from 'components/Button/Button';
const SwitchRoles = ({ userName, avatar }) => {
  const { control } = useForm();
  return (
    <div>
      <SubHeading>
        Update privilege for {userName} {avatar}
      </SubHeading>

      <div className="mt-6 space-y-6">
        <Select
          label="Switch Roles"
          name="Switch Roles"
          control={control}
          options={[
            {
              value: 'admin',
              label: 'Admin'
            },
            {
              value: 'user',
              label: 'User'
            }
          ]}
        />
        <Button isFullWidth>Submit</Button>
      </div>
    </div>
  );
};

export default SwitchRoles;
