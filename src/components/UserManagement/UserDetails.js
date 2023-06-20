import { Badge } from 'components/Badge/Badge';

export const UserDetails = ({ user }) => {
  return (
    <div className="text-sm">
      <h1 className="font-medium text-xl border-b pb-4 capitalize">User details</h1>
      <div className="divide-y">
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">First Name</p>
          <p className="ml-2 capitalize">{user?.firstName}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Last Name</p>
          <p className="ml-2 capitalize">{user?.lastName}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Email</p>
          <p> {user?.email}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Role</p>
          <p className="capitalize">{user?.role}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Privileges</p>
          <div className="capitalize flex flex-wrap space-x-2">
            <Badge status="approved">{user?.privileges[0].name}</Badge>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Phone number</p>
          <p> {user?.phone}</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p className="text-gray-500">Gender</p>
          <p className="capitalize">{user?.gender}</p>
        </div>
        <div className="flex justify-between py-4 flex-col">
          <p className="text-gray-500 mb-1">Account</p>
          <p> {user?.organizationId?.accountName}</p>
        </div>
      </div>
    </div>
  );
};
