import authLocal from "@/utils/localStorage";
import { useEffect, useState } from "react";

const useToken = () => {
  const { getInfo } = authLocal;
  const [tokenInfo, setTokenInfo] = useState<TToken | null>(null);

  useEffect(() => {
    const token = getInfo("KEY_TOKEN") as TToken;
    setTokenInfo(token);
  }, []);
  return tokenInfo;
};

export default useToken;
