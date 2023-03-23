import { LinkButton } from 'components/Button/LinkRouteButton'
import { Heading } from 'components/Common/Header/Heading'
import { Container } from 'components/Container/Container'
import React from 'react'
import AddRequestForm from './AddRequestForm'

const AddRequest = () => {
  return (
    <div className='p-5 lg:w-[60%] w-full'>
        <LinkButton to="/requests">Request</LinkButton>
        <Container>
            <Heading>Create New Request</Heading>
            <p className='mb-3'>Fill in your request below</p>
            <hr className='mb-3'/>
            <AddRequestForm/>
        </Container>
    </div>
  )
}

export default AddRequest