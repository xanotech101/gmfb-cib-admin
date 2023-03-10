import { Button } from 'components/Button/Button'
import { Select } from 'components/Form/Select/Select'
import { useForm } from 'react-hook-form'
import React from 'react'
import { TextArea } from 'components/Form/TextArea/TextArea'

const AddRequestForm = () => {
    const {control}=useForm()
  return (
    <div>
        <form action='' className='space-y-7'>
        <Select
          label="Select Request"
          name="select request"
          control={control}
          options={[
            {
              value: 'Initiate',
              label: 'initiate'
            },
            {
                value: 'Authorise',
                label: 'authorise'
            },
            {
                value: 'verification',
                label: 'verification'
            }
          ]}
        />
        <TextArea placeholder="Enter request....."/>
            <Button isFullWidth>Submit</Button>
        </form>
    </div>
  )
}

export default AddRequestForm