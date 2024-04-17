import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";

import { Header } from "../header";
import Footer from "../footer";
import authLocal from "@/utils/localStorage";
import { useRouter } from "next/router";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getInfo } = authLocal;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN");

    if (!token) {
      setShouldRender(false);
      router.push("/login");
    } else {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) {
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

export default PrivateLayout;
