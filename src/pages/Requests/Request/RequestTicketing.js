import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import React from 'react';
import { RequestData } from '../RequestTable/RequestData';
import { RequestTable } from '../RequestTable/RequestTable';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button/Button';

const RequestTicketing = () => {
  return (
    <div className="p-5">
      <Container>
        <Heading>All Request</Heading>
        <div className="flex justify-between  my-2  align-start lg:align-center flex-col lg:flex-row ">
          <p>List of request made in the system.</p>
          <Link to="/requests/add-request">
            <Button>Add Request</Button>
          </Link>
        </div>

        <RequestTable trails={RequestData} />
      </Container>
    </div>
  );
};

export default RequestTicketing;
