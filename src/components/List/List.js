const List = ({ children }) => {
  return <div className="mt-4 shadow border rounded">{children}</div>;
};

const ListContainer = ({ children }) => {
  return (
    <div className="w-full justify-between mt-4 flex p-4 text-lg font-medium border-b">
      {children}
    </div>
  );
};

const ListItem = ({ icon, title,  variant ='text-gray-500', children}) => {
  return (
    <div>
    <div className={`flex items-center relative ${variant}`}>
      <p className="icon mr-2">{icon}</p>
      <p className="icon">{title}</p>
    </div>
    <div className="text-sm mt-3 text-gray-500 font-normal">{children}</div>
  </div>
  );
};

List.Container = ListContainer;
List.Item = ListItem;

export { List };
