import Image from 'next/image';
import React from 'react';

type HeaderProps = {
  onSignInClick?: () => void;
};

export default function Header({ onSignInClick }: HeaderProps) {
  return (
    <header className="w-full px-3 sm:px-4 bg-white relative py-3 sm:py-[14px] flex items-center justify-between lg:justify-end h-14 sm:h-[70px] min-h-[56px]">
      {/* Logo - visible on small screens when sidebar is hidden */}
      <div className="relative h-8 w-24 sm:h-9 sm:w-28 lg:hidden shrink-0">
        <Image
          src="/assets/dummy-logo.svg"
          alt="Try On Lens"
          fill
          className="object-contain object-left"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-[14px] text-sm leading-[120%] font-medium relative shrink-0">
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

