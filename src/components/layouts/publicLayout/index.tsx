import React from "react";
import { Quicksand } from "next/font/google";

import { Header } from "../header";
import Footer from "../footer";
import { useProfile } from "@/hooks/useProfile";
import { TMyProfile } from "@/components/features/checkout/type";
import authLocal from "@/utils/localStorage";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useProfile<TMyProfile>();
  const { setInfo } = authLocal;

  if (profile) {
    setInfo({ role: profile.data.role }, "ROLE");
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

export default PublicLayout;
