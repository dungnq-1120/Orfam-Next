import Image from "next/image";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";

import { Button } from "@/shared/button";

import AroundLeft from "@/icons/feature/AroundLeft";
import notFound from "@/image/banner-remove-bg/404.svg";

const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen bg-green-ct7 p-4">
      <div className={`h-full w-full flex justify-center items-center ${quicksand.className}`}>
        <div>
          <Image className="w-3/4 m-auto" src={notFound} alt="notFound" />
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-4 xs:text-2xl">Page Not Found</h3>
            <h6 className="text-sm font-medium xs:text-xs">We are sorry, the page you requested could not be found </h6>
            <h6 className="text-sm mt-1 font-medium xs:text-xs">Please go back to the home page</h6>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                router.push("/");
              }}
              className="bg-white text-green-ct7 rounded-3xl py-3 px-7 flex items-center duration-500 gap-2 hover:shadow-shadow3"
            >
              <AroundLeft className="w-5 h-5 xs:w-4 xs:h-4" /> <span className="font-bold xs:text-xs">BACK TO HOME</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
