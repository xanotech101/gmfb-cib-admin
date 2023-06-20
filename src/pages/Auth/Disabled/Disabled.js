import disable from '../../../Assets/shield2.png';
import no from '../../../Assets/no.png';
import React from 'react';

const Disabled = () => {
  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-200">
      <div className=" flex items-center min-h-[450px] justify-center flex-col gap-1 w-[650px] bg-white m-auto rounded-[8px] border border-[#dadce0]">
        <div className="relative">
          <div className="absolute left-[30px] top-[26px]">
            <img src={no} width={'40px'}></img>
          </div>
          <img src={disable} width={'100px'}></img>
        </div>
        <div className="flex gap-2">
          <span className="text-red-600 text-xl font-bold">Oops!</span>{' '}
          <span className="text-xl font-bold">your account has been disabled</span>
        </div>

        <p className="w-[300px] text-center mb-4">{` Sorry your  account has been disabled and access terminated.if you think this is a mistake please contact the administrator thank you`}</p>
      </div>
    </div>
  );
};

export default Disabled;
