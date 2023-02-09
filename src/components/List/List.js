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

const ListItem = ({ icon, title }) => {
  return (
    <div className="flex items-center">
      <p className="icon mr-2 text-gray">{icon}</p>
      <p className="icon">{title}</p>
    </div>
  );
};

List.Container = ListContainer;
List.Item = ListItem;

export { List };
