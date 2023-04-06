import { Button } from 'components/Button/Button'
import { Container } from 'components/Container/Container'
import { Input } from 'components/Form/Input/Input'
import React from 'react'

const Addroles = () => {
  return (
    <div className='w-full lg:w-[60%] mt-2'>
       <Container>
        <p className='text-md font-medium'>Create new user role below.</p>
        <div className='space-y-5 mt-4'>
        <Input label="Add new role" placeholder="New role"/>
        <Button>Add Role</Button>
        </div>
       </Container>
    </div>
  )
}

export default Addroles