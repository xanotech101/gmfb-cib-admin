import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { UploadPicture } from 'components/Common/UploadPicture';
import { Button } from 'components/Button/Button';
export const EditProfileForm = ({ showModal }) => {
  return (
    <div>
      <form action="" className="mt-5">
        <form className="divide-y-blue-gray-200 mt-6 space-y-8 divide-y">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="sm:col-span-3">
              <Input label="First name" type="text" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Last name" type="text" />
            </div>

            <div className="sm:col-span-6">
              <Input label="Username" type="text" />
            </div>
            <div>
              <UploadPicture />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-6 pt-8 sm:grid-cols-6 sm:gap-x-6 ">
            <div className="sm:col-span-6">
              <h2 className="text-xl font-medium text-blue-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm text-blue-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="sm:col-span-3">
              <Input label="Email" type="text" />
            </div>

            <div className="sm:col-span-3">
              <Input label="Phone number" type="text" />
            </div>

            <div className="sm:col-span-6">
              <Input type="text" label="Language" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-8">
            <Button onClick={showModal}>cancel</Button>
            <Button onClick={showModal}>Save</Button>
          </div>
        </form>
      </form>
    </div>
  );
};
