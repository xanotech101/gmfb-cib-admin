export const AuditTrailsTable = ({ data, initialSerialNumber }) => {
  return (
    <div role="list" className="divide-y divide-gray-200">
      <div className="user-list">
        <div className="relative  lg:overflow-hidden overflow-x-scroll mt-6">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gray-100 uppercase border text-black">
              <tr>
                <th scope="col" className="p-3">
                  S/N
                </th>
                <th scope="col" className="p-3">
                  Action
                </th>
                <th scope="col" className="p-3">
                  User
                </th>
                <th scope="col" className="p-3">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((trail, i) => (
                <tr className="border hover:bg-gray-50" key={trail._id}>
                  <td className="p-3 border capitalize">{initialSerialNumber + i}</td>
                  <td className="p-3 border capitalize">{trail?.type}</td>
                  <td className="p-3 border">{`${trail.user?.firstName} ${trail.user?.lastName}`}</td>
                  <td className="p-3 border">
                    <p className="mt-4 gap-2 flex items-center text-sm text-gray-500">
                      {trail.message}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
