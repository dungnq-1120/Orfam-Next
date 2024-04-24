import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";

export const useLeavePageConfirm = <T,>({ isConfirm, message }: { isConfirm: T; message: string }) => {
  useBeforeUnload(Boolean(isConfirm), message);

  useEffect(() => {
    const handler = (url: string) => {
      if (isConfirm && url !== "/bill" && !window.confirm(message)) {
        throw "Route Canceled";
      }
    };

    Router.events.on("beforeHistoryChange", handler);

    return () => {
      Router.events.off("beforeHistoryChange", handler);
    };
  }, [isConfirm, message]);
};
