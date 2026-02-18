import Image from 'next/image';
import React from 'react';

type HeaderProps = {
  onSignInClick?: () => void;
};

export default function Header({ onSignInClick }: HeaderProps) {
  return (
    <header className="w-full px-4 bg-white relative py-[14px] flex items-center justify-end h-[70px]">

      {/* Trial Message */}
      {/* <div className="flex items-center gap-2 text-base text-black-600 font-medium leading-[120%]">
        <span className=''>On a free trial? Sign in to get</span>
        <span className="text-orange-500 font-bold">8 free credits</span>
        <span>instantly.</span>
      </div> */}

      {/* Action Buttons */}
      <div className="flex items-center gap-[14px] text-sm leading-[120%] font-medium relative">
        {/* <button className="p-[14px] bg-black-600 text-white  rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
          <Image
            src="/assets/premium.svg"
            alt="Pro Icon"
            width={16}
            height={16}
          />
          <span>Unlock Pro</span>
        </button> */}
        <button
          onClick={onSignInClick}
          className="p-[14px] bg-orange-600 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

