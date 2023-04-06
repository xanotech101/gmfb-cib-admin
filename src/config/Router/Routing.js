/* eslint-disable react/no-children-prop */
import { Route, Routes, Outlet } from 'react-router-dom';
import { Dashboard } from 'pages/Home/Dashboard';
import { Corporate } from 'pages/CorporateAccount/CorporateAccount';
import { Report } from 'pages/Reporting/Reports/Reports';
import { Settings } from 'pages/Settings/Settings';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { MandateRule } from 'pages/MandateRule/MandateRule';
import { CreateMandateRule } from 'pages/MandateRule/CreateMandateRule/CreateMandateRule';
import { UpdateMandateRule } from 'pages/MandateRule/UpdateMandateRule/UpdateMandateRule';
import { EditProfile } from 'pages/Profile/EditProfile';
import { CreateCorperateUser } from 'pages/Settings/User/CreateCorperateUser';
import { Profile } from 'pages/Profile/Profile';
import { ErrorPage } from 'pages/ErrorPage/ErrorPage';
import { Audit } from 'pages/AuditTrail/AuditTrail';
import { authRoutes } from 'config/Router/routes/Auth.routes';
import { Security } from 'pages/Settings/Security/Security';
import { CorporateUsers } from 'pages/Settings/User/CorporateUsers';
import { UserSettings } from 'pages/Settings/User/UserSettings';
import { SettingsWrapper } from 'pages/Settings/SettingsWrapper';
import RequestTicketing from 'pages/Requests/Request/RequestTicketing';
import AddRequest from 'pages/Requests/AddRequest/AddRequest';
import { BulkUpload } from 'pages/Settings/User/BulkUpload/BulkUpload';
import { OnboardCorporateAccount } from 'pages/CorporateAccount/OnboardCorporateAccount/OnboardCorporateAccount';
import { PrivateOutlet } from './PrivateOutLet';
import CorporateUsersUnderCorporateAccount from 'pages/CorporateAccount/CorporateUsers/CorporateUsers';
import { TransferRequest } from 'pages/CorporateAccount/TransferRequest/TransferRequest';
import { TransferRequestDetails } from 'pages/CorporateAccount/TransferRequest/TransferRequestDetails/TransferRequestDetails';
import Transfers from 'pages/TransactionRequest/Transfers/Transfers';
import AwaitingVerification from 'pages/TransactionRequest/AwaitingVerification/AwaitingVerification';
import { UserManagement } from 'pages/UserManagement/Usermanagement';
import CorporateDetails from 'pages/CorporateAccount/CorporateDetails/CorporateDetails';
export const Routing = () => {
  return (
    <>
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route element={<PrivateOutlet />}>
          <Route element={<AuthLayout children={<Outlet />} />}>
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="transfers">
              <Route index element={<Transfers />} />
              <Route path=":id" element={<TransferRequestDetails />} />
              <Route path="transfer-made" element={<Transfers />} />
              <Route path="awaiting" element={<AwaitingVerification />} />
            </Route>

            <Route
              element={
                <SettingsWrapper>
                  <Outlet />
                </SettingsWrapper>
              }>
              <Route path="settings">
                <Route index element={<Settings />} />
                <Route path="general" element={<Settings />} />
                <Route path="general/:id" element={<BulkUpload />} />
                <Route path="security" element={<Security />} />
                <Route path="usersetting" element={<UserSettings />} />
                <Route path="corporate-users">
                  <Route index element={<CorporateUsers />} />
                  <Route path="create-user" element={<CreateCorperateUser />} />
                </Route>
              </Route>
            </Route>
            <Route path="accounts">
              <Route index element={<Corporate />} />
              <Route path="onboard" element={<OnboardCorporateAccount />} />
              <Route path=":id/corporate-details" element={<CorporateDetails />} />
              <Route path=":id/users" element={<CorporateUsersUnderCorporateAccount />} />
              <Route path=":id/transfer-requests" element={<TransferRequest />} />
              <Route path=":id/transfer-requests/:id" element={<TransferRequestDetails />} />
            </Route>
            <Route path="onboard" element={<OnboardCorporateAccount />} />
            <Route path="audit" element={<Audit />} />
            <Route path="reports" element={<Report />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="requests">
              <Route index element={<RequestTicketing />} />
              <Route path="add-request" element={<AddRequest />} />
            </Route>

            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} />
            </Route>

            <Route path="mandate-rule">
              <Route index element={<MandateRule />} />
              <Route path="create" element={<CreateMandateRule />} />
              <Route path="update/:id" element={<UpdateMandateRule />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
