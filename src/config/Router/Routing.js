/* eslint-disable react/no-children-prop */
// TODO: Explore lazy loading and break into smaller files for easy access
import { Route, Routes, Outlet } from 'react-router-dom';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { Report } from 'pages/Reporting/Reports';
import { Settings } from 'pages/Settings/Settings';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Audit } from 'pages/AuditTrail/AuditTrail';
import { authRoutes } from 'config/Router/routes/Auth.routes';
import { Security } from 'pages/Settings/Security/Security';

import { RequestTicketing } from 'pages/Requests/RequestTicketing';
// import { OnboardCorporateAccount } from 'pages/CorporateAccount/OnboardCorporateAccount/OnboardCorporateAccount';
import { PrivateOutlet } from './PrivateOutLet';
// import CorporateUsersUnderCorporateAccount from 'pages/CorporateAccount/CorporateUsers/CorporateUsers';
import { TransferRequestDetails } from 'pages/TransferRequest/TransferRequestDetails/TransferRequestDetails';
import { AllTransferRequests } from 'pages/TransferRequest/AllTransferRequests/AllTransferRequests';

import { RequestTicketingDetails } from 'pages/Requests/RequestDetails/RequestDetails';
import { BvnTable } from 'pages/ApiConsole/ApiBvnUsage';
import { ApiTable } from 'pages/ApiConsole/ApiUsage';
import { Wrapper } from 'pages/ApiConsole/Wrapper';
import { UserManagement } from 'pages/UserManagement/UserManagement';

import { CorporateAccounts } from 'pages/CorporateAccounts/CorporateAccounts';
import { OnboardCorporateAccount } from 'pages/CorporateAccounts/OnboardCorporateAccount/OnboardCorporateAccount';
import { BatchUpload } from 'pages/CorporateAccounts/BatchOnboard/BatchOnboard';
import { CorporateAccount } from 'pages/CorporateAccounts/CorporateAccount/CorporateAccount';
import { Overview } from 'pages/CorporateAccounts/CorporateAccount/Overview/Overview';
import { CorporateUsers } from 'pages/CorporateAccounts/CorporateAccount/CorporateUsers/CorporateUsers';
import { TransferRequest } from 'pages/CorporateAccounts/CorporateAccount/TransferRequest/TransferRequest';
import { MandateRule } from 'pages/CorporateAccounts/CorporateAccount/MandateRule/MandateRule';

export const Routing = () => {
  return (
    <Routes>
      {authRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route element={<PrivateOutlet />}>
        <Route element={<AuthLayout children={<Outlet />} />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Report />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="transfer-requests">
            <Route index element={<AllTransferRequests />} />
            <Route path=":id" element={<TransferRequestDetails />} />
          </Route>
          <Route
            element={
              <Wrapper>
                <Outlet />
              </Wrapper>
            }>
            <Route path="api-console">
              <Route index element={<ApiTable />} />
              <Route path="bvn-usage" element={<BvnTable />} />
              <Route path="api-usage" element={<ApiTable />} />
            </Route>
          </Route>

          <Route path="settings">
            <Route index element={<Settings />} />

            <Route path="/settings/security" element={<Security />} />
          </Route>

          <Route path="accounts">
            <Route index element={<CorporateAccounts />} />
            <Route path="onboard" element={<OnboardCorporateAccount />} />
            <Route path="onboard/batch" element={<BatchUpload />} />
            <Route path=":id" element={<CorporateAccount />}>
              <Route path="overview" element={<Overview />} />
              <Route path="users" element={<CorporateUsers />} />
              <Route path="transfer-requests" element={<TransferRequest />} />
              <Route path="transfer-requests/:id" element={<TransferRequestDetails />} />
              <Route path="mandate-rule" element={<MandateRule />} />
            </Route>
          </Route>

          <Route path="audit" element={<Audit />} />
          <Route path="requests">
            <Route index element={<RequestTicketing />} />
            <Route path=":id" element={<RequestTicketingDetails />} />
          </Route>

          <Route path="profile">
            <Route index element={<Profile />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
