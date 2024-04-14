import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";

import { Header } from "../header";
import Footer from "../footer";
import authLocal from "@/utils/localStorage";
import { useRouter } from "next/router";
import { ROLES } from "@/services/type";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getInfo, setInfo } = authLocal;
  const [shouldRender, setShouldRender] = useState(false);
  const [checkRole, setCheckRole] = useState(false);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN");
    const { role } = getInfo("ROLE");

    if (!token) {
      setShouldRender(false);
      router.push("/login");
    } else {
      setShouldRender(true);
    }

    if (role && role === ROLES.ADMIN) {
      setCheckRole(true);
      router.push("/admin/createProduct");
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
