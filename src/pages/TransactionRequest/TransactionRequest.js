import { Container } from 'components/Container/Container';
import { NavLink } from 'react-router-dom';
import { Heading } from 'components/Common/Header/Heading';
export const TransactionRequest = ({ children }) => {
  return (
    <div className="p-5">
      <Container>
        <Heading>Transfers</Heading>
        <p className="text-sm text-gray-500 mt-2">List of transfers in your account.</p>
        <div className="flex gap-4 font-medium capitalize my-4 border py-3 fit rounded shadow bg-gray-100">
          <NavLink
            to="transfers/transfer-made"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Transfers
          </NavLink>
          <NavLink
            to="transfers/awaiting"
            className={({ isActive }) => (isActive ? 'after relative px-2' : 'px-2')}>
            Awaiting verification
          </NavLink>
        </div>
        <div>{children}</div>
      </Container>
    </div>
  );
};
