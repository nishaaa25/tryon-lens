"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Header from "@/components/layout/Header";
import LoginModal from "@/components/LoginModal";

export default function HeaderWithLogin() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <>
      <Header onSignInClick={openLogin} />
      {isLoginOpen && <LoginModal onClose={closeLogin} />}
    </>
  );
}
