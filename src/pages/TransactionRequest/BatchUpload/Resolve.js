import { Spinner } from 'components/Spinner/Spinner';
import { SubHeading } from 'components/Common/Header/SubHeading';
export const Resolve = () => {
  return (
    <div>
      <div className="fixed top-0 text-black flex  text-center items-center justify-center  -z-1 left-0 right-0 bottom-0 w-full  h-screen  overflow-hidden white">
        <div className="ml-12 gap-7 flex-col z-50 bg-white p-12 rounded relative">
          <Spinner />
          <SubHeading className="text-center  text-xl font-semibold">
            Resolving Accounts......
          </SubHeading>
          <p className="mt-5">This may take a few seconds, please {"don't"} close this page.</p>
        </div>
      </div>
    </div>
  );
};
