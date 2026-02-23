import Image from 'next/image';
import React from 'react';

type HeaderProps = {
  onSignInClick?: () => void;
  onMenuClick?: () => void;
};

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export default function Header({ onSignInClick, onMenuClick }: HeaderProps) {
  return (
    <header className="w-full px-3 sm:px-4 bg-surface relative py-3 sm:py-[14px] flex flex-col lg:flex-row lg:items-center justify-between lg:justify-end gap-2 lg:gap-0 h-14 sm:h-[70px] min-h-[56px]">
      {/* Logo + Hamburger - visible on small screens when sidebar is hidden */}
      <div className="flex justify-between items-center gap-2 lg:hidden">
        <div className="relative h-8 w-24 sm:h-9 sm:w-28 shrink-0">
          <Image
            src="/assets/dummy-logo.svg"
            alt="Try On Lens"
            fill
            className="object-contain object-left"
          />
        </div>
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="flex items-center justify-center p-2 rounded-lg bg-surface hover:bg-surface-muted "
            aria-label="Open menu"
          >
            <HamburgerIcon className="w-4 h-4 text-black-600" />
          </button>
        )}
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
        {/* <button
          onClick={onSignInClick}
          className="p-[14px] bg-orange-600 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Sign In
        </button> */}
      </div>
    </header>
  );
}

