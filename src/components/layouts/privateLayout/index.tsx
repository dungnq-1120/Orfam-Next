import React from "react";
import { Quicksand } from "next/font/google";
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={quicksand.className}>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
