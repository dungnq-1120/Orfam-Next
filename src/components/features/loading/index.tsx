import Image from "next/image";
import React from "react";
import loading from "@/image/banner/loading_3.gif";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className={isLoading ? "loading fixed top-0 w-screen h-screen bg-white flex items-center justify-center z-40" : "hidden"}>
      <Image src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
