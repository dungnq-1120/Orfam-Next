import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";

import { Header } from "../header";
import Footer from "../footer";

import { ROLES } from "@/services/type";

import authLocal from "@/utils/localStorage";


const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getInfo } = authLocal;
  const [shouldRender, setShouldRender] = useState(false);
  const [checkRole, setCheckRole] = useState(false);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN");
    const roleInfo = getInfo("ROLE");
    const role = roleInfo ? roleInfo.role : null;

    if (!token) {
      setShouldRender(false);
      router.push("/login");
    } else {
      setShouldRender(true);
    }

    if (role && role === ROLES.ADMIN) {
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
    <div className={`${quicksand.className}`}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdminLayout;
