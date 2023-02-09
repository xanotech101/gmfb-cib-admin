import React from 'react';
import { Input } from 'components/Form/Input/Input';
import { EditButton } from 'components/Button/Button';
import { useState } from 'react';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const ProfileInputs = ({ type, onChange, title, children, placeholder }) => {
  const [toggle, setToggle] = useState(false);
  function handleToggle() {
    setToggle((toggle) => !toggle);
  }
  let addClass = toggle ? 'block' : '';
  return (
    <div>
      <div className="mt-5">
        <div className="flex justify-between block text-md font-medium text-gray-700  py-5">
          <span>{title}</span>
          <EditButton onClick={handleToggle}>Edit</EditButton>
        </div>
        <div className={`hidden${addClass}`}>
          <Input type={type} onChange={onChange} placeholder={placeholder} />
          <div className="mt-2">{children}</div>
        </div>
      </div>
      <div className="mt-3">
        <hr></hr>
      </div>
    </div>
  );
};
export const ProfileImage = ({ src, width }) => {
  return (
    <>
      <div className="flex items-center">
        <div>
          {' '}
          <img src={src} alt="" width={width} />
        </div>
        <p className="font-medium cursor-pointer ml-2">
          Edit profile picture <FontAwesomeIcon icon={faEdit} />
        </p>
      </div>
    </>
  );
};
