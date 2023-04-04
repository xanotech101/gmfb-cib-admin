export const Avatar = ({ src, name }) => {
  return (
    <div className="flex items-center md:mt-6 lg:mt-0 mt-6">
      <img src={src} alt="" className="rounded-full w-20 object-cover" />
      <p className=" capitalize text-xl ml-2 font-medium">{name}</p>
    </div>
  );
};
