import React from "react";
import { Quicksand } from "next/font/google";

import { Header } from "../header";
import Footer from "../footer";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
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
