import { Heading } from 'components/Header/Heading';
import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';

export const Wrapper = ({ children }) => {
  return (
    <>
      <div className="p-5">
        <Container>
          <div className="mx-3 my-2">
            <Heading>API Console</Heading>
            <p>List of all Name Enquiry API and BVN Usage.</p>
          </div>
          <div className="flex gap-4 font-medium capitalize my-4 border py-3 fit rounded shadow bg-gray-100">
            <NavLink
              to="/api-console/api-usage"
              className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
              Name Enquiry
            </NavLink>
            <NavLink
              to="/api-console/bvn-usage"
              className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
              BVN Usage
            </NavLink>
            <NavLink
              to="/api-console/transfer-request"
              className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
              Transfer Request
            </NavLink>
            <NavLink
              to="/api-console/api-key"
              className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
              API Key
            </NavLink>
          </div>
          <div>{children}</div>
        </Container>
      </div>
    </>
  );
};
