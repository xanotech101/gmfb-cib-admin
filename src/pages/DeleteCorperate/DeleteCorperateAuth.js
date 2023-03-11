import { Auth } from 'components/Layout';
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { DeleteCorperateAuthForm } from './DeleteCorperateAuthForm';
export const DeleteCorperateAuth = () => {
  return (
    <div>
      <Auth
        title={
          <p className="flex items-center gap-1">
            {' '}
            <ExclamationTriangleIcon width="40px" className="text-red-700 font-medium" />
            Delete corperate user
          </p>
        }>
        <DeleteCorperateAuthForm />
      </Auth>
    </div>
  );
};
