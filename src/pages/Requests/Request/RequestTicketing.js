import { Heading } from 'components/Common/Header/Heading'
import { Container } from 'components/Container/Container'
import React from 'react'
import { RequestData } from '../RequestTable/RequestData'
import { RequestTable } from '../RequestTable/RequestTable'

const RequestTicketing = () => {
  return (
    <div className='p-5'>
        <Container>
            <Heading>All Request</Heading>
            <p>List of request made in the system.</p>
            <RequestTable trails={RequestData}/>
        </Container>
    </div>
  )
}

export default RequestTicketing