/* eslint-disable react/no-children-prop */
import { Route, Routes, Outlet } from 'react-router-dom';
import { Dashboard } from 'pages/Client/Dashboard/ClientDashboard';
import { TransactionRequest } from 'pages/TransactionRequest/TransactionRequest';
import { TransactionDetails } from 'pages/TransactionRequest/TransactionDetails/TransactionDetails';
import { Audit } from 'pages/Client/Audit';
import { Corperate } from 'pages/Client/corperate';
import { Report } from 'pages/Client/Reports';
import { Settings } from 'pages/Settings/Settings';
import { AdminDashboard } from 'pages/Admin/AdminDashboard';
import { InitiateRequest } from 'pages/TransactionRequest/Initiate/InitiateRequest';
import { CreateUser } from 'pages/Admin/UserCreate';
import { AuthLayout } from '../../components/Layout/AuthLayout';
import { AdminReport } from 'pages/Admin/AdminReport';
import { AdminSettings } from 'pages/Admin/AdminSettings';
import { AdminCorperate } from 'pages/Admin/AdminCorperate';
import { BatchUpload } from 'pages/TransactionRequest/BatchUpload/BatchUpload';
import { MandateRule } from 'pages/MandateRule/MandateRule';
import { CreateMandateRule } from 'pages/MandateRule/CreateMandateRule/CreateMandateRule';
import { UpdateMandateRule } from 'pages/MandateRule/UpdateMandateRule/UpdateMandateRule';
import { EditProfile } from 'pages/Profile/EditProfile';
import { CreateCorperateUser } from 'pages/Settings/User/CreateCorperateUser';
import { Profile } from 'pages/Profile/Profile';
import { EditUser } from 'pages/Settings/User/EditUser';
import { ErrorPage } from 'pages/Auth/ErrorPage/ErrorPage';

import { authRoutes } from 'config/Router/routes/Auth.routes';
import { EmptyState } from 'components/EmptyState/EmptyState';
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transaction-requests">
            <Route index element={<TransactionRequest />} />
            <Route path=":id" element={<TransactionDetails />} />
            <Route path="initiate" element={<InitiateRequest />} />
          </Route>
          <Route path="audit" element={<Audit />} />
          <Route path="emptystate" element={<EmptyState/>} />
          <Route path="edituser" element={<EditUser />} />
          <Route path="corperate" element={<Corperate />} />
          <Route path="reports" element={<Report />} />
          <Route path="settings" element={<Settings />} />
          <Route path="batchupload" element={<BatchUpload />} />
          <Route path="profile" element={<Profile />} />
          <Route path="createcorperateuser" element={<CreateCorperateUser />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="adminreports" element={<AdminReport />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="adminreports" element={<AdminReport />} />
          <Route path="adminsettings" element={<AdminSettings />} />
          <Route path="admincorperate" element={<AdminCorperate />} />
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
