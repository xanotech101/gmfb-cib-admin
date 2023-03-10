import { Heading } from 'components/Common/Header/Heading';
import { Container } from 'components/Container/Container';
import { CorperateData } from './CorporateData';
import { CorperateTable } from './CorporateTable';
import { Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
export const Corperate = () => {
 

  return (
    <div className="flex flex-col mt-7 p-5">
      <Container>
        <div className="flex justify-between items-center">
          <div className="mb-3">
            <Heading>Corporate Users</Heading>
            <p>List of all corporate users.</p>
          </div>
          <div>
            <Link
              to="/corporate/create"
              className="grooming-color flex text-white p-2 rounded font-medium">
              Create corperate user <UserPlusIcon width="20px" />
            </Link>
          </div>
        </div>
        <CorperateTable CorperateData={CorperateData}/>
      </Container>

    </div>
  );
};