"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import LoginModal from "@/components/LoginModal";
import Sidebar from "@/components/layout/Sidebar";

export default function HeaderWithLogin() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarSlideIn, setSidebarSlideIn] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      const id = requestAnimationFrame(() => setSidebarSlideIn(true));
      return () => cancelAnimationFrame(id);
    }
    const t = setTimeout(() => setSidebarSlideIn(false), 0);
    return () => clearTimeout(t);
  }, [sidebarOpen]);

  const isLoginOpen = searchParams.get("action") === "login";

  const openLogin = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("action", "login");
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const closeLogin = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("action");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }, [pathname, router, searchParams]);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      <Header onSignInClick={openLogin} onMenuClick={openSidebar} />
      {isLoginOpen && <LoginModal onClose={closeLogin} />}

      {/* Mobile sidebar overlay - slides in from left */}
      {sidebarOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 lg:hidden"
            onClick={closeSidebar}
          />
          <div
            className={`fixed inset-y-0 left-0 z-50 w-8/12 max-w-[85vw] bg-surface shadow-xl lg:hidden flex flex-col transition-transform duration-200 ease-out ${
              sidebarSlideIn ? "translate-x-0" : "-translate-x-full"
            }`}
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="flex-1 overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </>
      )}
    </>
  );
}
