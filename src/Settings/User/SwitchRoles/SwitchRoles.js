import { SubHeading } from 'components/Common/Header/SubHeading';
import { Select } from 'components/Form/Select/Select';
import { useForm } from 'react-hook-form';

import React from 'react';
// const data=[
//     {
//      privileges:{
//         name:"Super Admin",
//         _id:"567888_7"
//      }
//     },
//     {
//         privileges:{
//             name:"Super Admin",
//             _id:"567888_7"
//         }
//        },
//        {
//         privileges:{
//            name:"Super Admin",
//            _id:"567888_7"
//         }
//        },
// ]
const SwitchRoles = ({ userName, avatar}) => {
    const {
        control,
      } =useForm()
  return (
    <div>
      <SubHeading>Update priviledge for {userName} {avatar}</SubHeading>
      
     <div className='mt-6'>
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
     </div>
    </div>
  );
};

export default SwitchRoles;
