/* eslint-disable react/no-children-prop */
import { Route, Routes, Outlet } from 'react-router-dom';
import { Dashboard } from 'pages/Client/Dashboard/AdminDashboard';
import { TransactionRequest } from 'pages/TransactionRequest/TransactionRequest';
import { TransactionDetails } from 'pages/TransactionRequest/TransactionDetails/TransactionDetails';
import { Corperate } from 'pages/Client/corperate';
import { Report } from 'pages/Reporting/Reports/Reports';
import { Settings } from 'pages/Settings/Settings';
import { InitiateRequest } from 'pages/TransactionRequest/Initiate/InitiateRequest';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { BatchUpload } from 'pages/TransactionRequest/BatchUpload/BatchUpload';
import { MandateRule } from 'pages/MandateRule/MandateRule';
import { CreateMandateRule } from 'pages/MandateRule/CreateMandateRule/CreateMandateRule';
import { UpdateMandateRule } from 'pages/MandateRule/UpdateMandateRule/UpdateMandateRule';
import { EditProfile } from 'pages/Profile/EditProfile';
import { CreateCorperateUser } from 'pages/Settings/User/CreateCorperateUser';
import { Profile } from 'pages/Profile/Profile';
import { EditUser } from 'pages/Settings/User/EditUser';
import { ErrorPage } from 'pages/Auth/ErrorPage/ErrorPage';
import { Audit } from 'pages/AuditTrail/AuditTrail';
import { authRoutes } from 'config/Router/routes/Auth.routes';
import { EmptyState } from 'components/EmptyState/EmptyState';
import { Security } from 'pages/Settings/Security';
import { CorporateUsers } from 'pages/Settings/User/CorporateUsers';
import { UserSettings } from 'pages/Settings/User/UserSettings';
import { SettingsWrapper } from 'pages/Settings/SettingsWrapper';
//import { PrivateOutlet } from './PrivateOutLet';

export const Routing = () => {
  return (
    <>
      <Routes>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/*<Route element={<PrivateOutlet />}>}*/}
        <Route element={<AuthLayout children={<Outlet />} />}>
          <Route
            element={
              <SettingsWrapper>
                <Outlet />
              </SettingsWrapper>
            }>
            <Route path="settings">
              <Route index element={<Settings />} />
              <Route path="general" element={<Settings />} />
              <Route path="security" element={<Security />} />
              <Route path="usersetting" element={<UserSettings />} />
              <Route path="corporate-users">
                <Route index element={<CorporateUsers />} />
                <Route path="edit-user" element={<EditUser />} />
                <Route path="create-user" element={<CreateCorperateUser />} />
              </Route>
            </Route>
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="corperate">
            <Route index element={<Corperate />} />
            <Route path="create" element={<CreateCorperateUser />} />
          </Route>
          <Route path="transaction-requests">
            <Route index element={<TransactionRequest />} />
            <Route path=":id" element={<TransactionDetails />} />
            <Route path="initiate" element={<InitiateRequest />} />
          </Route>
          <Route path="audit" element={<Audit />} />
          <Route path="emptystate" element={<EmptyState />} />
          <Route path="reports" element={<Report />} />
          <Route path="batchupload" element={<BatchUpload />} />
          <Route path="/profile">
            <Route index element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="/createmandate" element={<CreateMandateRule />} />
          <Route path="mandate-rule">
            <Route index element={<MandateRule />} />
            <Route path="create" element={<CreateMandateRule />} />
            <Route path="update/:id" element={<UpdateMandateRule />} />
          </Route>
        </Route>
        {/*</Route>*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
