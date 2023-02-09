export const Container = ({ children }) => {
  return (
    <div className="bg-white p-10 rounded-md shadow ring-1 ring-black ring-opacity-5">
      {children}
    </div>
  );
};
