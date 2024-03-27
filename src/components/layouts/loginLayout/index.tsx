import React, { useEffect, useState } from "react";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";
import authLocal from "@/utils/localStorage";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { getInfo } = authLocal;
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN");

    if (token) {
      router.push("/");
    } else {
      setShouldRender(true);
    }
  }, [router]);

  if (!shouldRender) {
    return null;
  }

  return <div className={quicksand.className}>{children}</div>;
};

export default LoginLayout;
