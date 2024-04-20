import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";

import { ROLES } from "@/services/type";

import authLocal from "@/utils/localStorage";
import Header from "./header";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getInfo } = authLocal;
  const [shouldRender, setShouldRender] = useState(false);
  const [checkRole, setCheckRole] = useState(false);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN") as TToken;

    if (!token) {
      setShouldRender(false);
      router.push("/login");
    } else {
      setShouldRender(true);
    }

    if (token.role === ROLES.ADMIN) {
      setCheckRole(true);
    } else {
      setCheckRole(false);
      router.push("/");
    }
  }, []);

  if (!shouldRender || !checkRole) {
    return null;
  }

  return (
    <div className={`${quicksand.className} bg-gray-100`}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
