import React from 'react'
import { Select } from 'components/Form/Select/Select'
import { useForm } from 'react-hook-form'
import { Button } from 'components/Button/Button'
const BulkUploadForm = () => {
    const {control}=useForm()
  return (
    <div className='space-y-5 mt-6'>
         <Select
          label="Limit Bulk Upload"
          name="Limit Bulk Upload"
          control={control}
          options={[
            {
              value: '70',
              label: '70'
            },
            {
              value: '50',
              label: '50'
            }
          ]}
        />
        <Button isFullWidth>Submit</Button>
    </div>
  )
}

export default BulkUploadForm