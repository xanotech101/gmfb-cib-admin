/* eslint-disable react/no-children-prop */
// TODO: Explore lazy loading and break into smaller files for easy access
import { Route, Routes, Outlet } from 'react-router-dom';
import { BatchUpload } from 'pages/CorporateAccount/BatchOnboard/BatchOnboard';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { Corporate } from 'pages/CorporateAccount/CorporateAccount';
import { Report } from 'pages/Reporting/Reports';
import { Settings } from 'pages/Settings/Settings';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Audit } from 'pages/AuditTrail/AuditTrail';
import { authRoutes } from 'config/Router/routes/Auth.routes';
import { Security } from 'pages/Settings/Security/Security';
import { SettingsWrapper } from 'pages/Settings/SettingsWrapper';
import { RequestTicketing } from 'pages/Requests/RequestTicketing';
import { OnboardCorporateAccount } from 'pages/CorporateAccount/OnboardCorporateAccount/OnboardCorporateAccount';
import { PrivateOutlet } from './PrivateOutLet';
import CorporateUsersUnderCorporateAccount from 'pages/CorporateAccount/CorporateUsers/CorporateUsers';
import { TransferRequest } from 'pages/CorporateAccount/TransferRequest/TransferRequest';
import { TransferRequestDetails } from 'pages/CorporateAccount/TransferRequest/TransferRequestDetails/TransferRequestDetails';
import { AllTransferRequests } from 'pages/TransferRequest/AllTransferRequests/AllTransferRequests';
import CorporateDetails from 'pages/CorporateAccount/CorporateDetails/CorporateDetails';
import UpdateSecurityQuestion from 'pages/Settings/Security/UpdateSecurityQuestion';
import { RequestTicketingDetails } from 'pages/Requests/RequestDetails/RequestDetails';
import { BvnTable } from 'pages/ApiConsole/ApiBvnUsage';
import { ApiTable } from 'pages/ApiConsole/ApiUsage';
import { Wrapper } from 'pages/ApiConsole/Wrapper';
import { UserManagement } from 'pages/UserManagement/UserManagement';

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
          <Route
            element={
              <SettingsWrapper>
                <Outlet />
              </SettingsWrapper>
            }>
            <Route path="settings">
              <Route index element={<Settings />} />
              <Route path="/settings/general" element={<Settings />} />
              <Route path="general">
                <Route index element={<Settings />} />
                <Route path="update-security-question" element={<UpdateSecurityQuestion />} />
              </Route>
              <Route path="/settings/security" element={<Security />} />
            </Route>
          </Route>

          <Route path="accounts">
            <Route index element={<Corporate />} />
            <Route path="onboard" element={<OnboardCorporateAccount />} />
            <Route path="onboard/batch" element={<BatchUpload />} />
            <Route path=":id/corporate-details" element={<CorporateDetails />} />
            <Route path=":id/users" element={<CorporateUsersUnderCorporateAccount />} />
            <Route path=":id/transfer-requests" element={<TransferRequest />} />
            <Route path=":id/transfer-requests/:id" element={<TransferRequestDetails />} />
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
