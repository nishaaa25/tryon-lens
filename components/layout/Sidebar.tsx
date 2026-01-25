import Image from "next/image";
import React from "react";

interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
}

export default function Sidebar() {
  const assetsItems: NavItem[] = [
    { icon: "/assets/folder.svg", label: "My Projects" },
    { icon: "/assets/archive.svg", label: "Archived" },
  ];

  const generalItems: NavItem[] = [
    { icon: "/assets/profile.svg", label: "My Account" },
    { icon: "/assets/support.svg", label: "Support" },
  ];

  return (
    <aside className="w-full h-full flex flex-col relative overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-2 max-h-[70px] h-[70px] relative w-full justify-center">
        <Image
          src="/assets/dummy-logo.svg"
          alt="Try On Lens Logo"
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="flex flex-col h-full relative w-full p-4 gap-6">
        {/* Active Navigation Item */}
        <div className="btn-gradient text-white rounded-lg p-3 flex items-center gap-2 relative">
          <div className="w-1 h-6 absolute left-0 bg-orange-600 rounded-tr-full rounded-br-full"></div>
          <Image
            src="/assets/tshirt.svg"
            alt="Try On Icon"
            width={18}
            height={18}
          />
          <span className="font-semibold text-sm leading-[120%] text-white">
            Virtual Try On
          </span>
        </div>

        {/* ASSETS Section */}
        <div className="relative flex flex-col gap-2 leading-[120%]">
          <h3 className="text-[13px] font-semibold text-[#525866] uppercase">
            ASSETS
          </h3>
          <nav className="flex flex-col gap-2">
            {assetsItems.map((item) => (
              <button
                key={item.label}
                className="w-full px-3 py-[11px] flex items-center gap-2 font-medium  text-sm leading-[120%] text-[#525866]"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* GENERAL Section */}
        <div className="relative">
          <h3 className="text-[13px] font-semibold text-[#525866] uppercase tracking-wide mb-2">
            GENERAL
          </h3>
          <nav className="space-y-1">
            {generalItems.map((item) => (
              <button
                key={item.label}
                className="w-full px-3 py-[11px] flex items-center gap-2 font-medium text-sm leading-[120%] text-[#525866]"
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Unlock Pro Callout */}
        <div className="mt-auto p-4 bg-[#f2f5f8] rounded-[14px] gap-2 flex flex-col relative">
          <h4 className="font-semibold leading-[120%] text-black-600">
            Unlock Pro! 👑
          </h4>
          <p className="text-[13px] text-[#525866] leading-[140%] font-normal mb-2">
            Upgrade your account to unlock all benefits.
          </p>
          <button className="w-full px-[14px] py-3 bg-orange-600 text-white rounded-md flex items-center justify-center gap-2 ">
            <Image src="/assets/premium.svg" alt="lock icon" width={16} height={16} />
            <span className="text-sm leading-[120%] font-medium">Unlock Pro</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
