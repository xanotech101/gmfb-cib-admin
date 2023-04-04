import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '../Label/Label';
import ReactSelect from 'react-select';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export const Select = ({ control, options, isMulti, name, error, label }) => {
  return (
    <div>
      <Label label={label} />
      <div className="mt-1">
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => <ReactSelect {...field} options={options} isMulti={isMulti} />}
        />
      </div>
      {error && <ErrorMessage msg={error} />}
    </div>
  );
};
