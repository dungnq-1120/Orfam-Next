import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/tabs";
import productDes from "@/image/banner/product-video1.webp";
import Image from "next/image";

interface Props {
  label: string;
  value: string;
}

const Description = () => {
  const tabData: Props[] = [
    { label: "PRODUCT DESCRIPTION", value: "PRODUCT-DESCRIPTION" },
    { label: "ADDITIONAL INFORMATION", value: "ADDITIONAL-INFORMATION" },
  ];
  
  return (
    <div className="bg-white my-8 shadow-2xl py-8 px-5 rounded-lg">
      <div className="tabs">
        <Tabs defaultValue="PRODUCT-DESCRIPTION" className="w-full m-auto">
          <div className="flex justify-center items-center mb-6 ">
            <TabsList className="w-full gap-5 relative border-b-1 rounded-none py-6 xl:w-3/5 nm:w-4/5 sm:bg-transparent md:!w-full md:bg md:mb-10">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  className="after:absolute inline-block px-0 after:left-0 py-3 after:-bottom-1 after:w-full after:h-1 data-[state=active]:after:bg-green-ct5 -translate-y-2/4 md:rounded-none sm:-translate-y-0 font-semibold text-blue-ct7
                   data-[state=active]:bg-white
                   data-[state=active]:text-green-ct5 data-[state=active]:shadow-none"
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
      
            <TabsContent key="PRODUCT-DESCRIPTION" value="PRODUCT-DESCRIPTION">
              <div className="content-des">
                <h4 className="text-sm font-bold text-blue-ct7">PRODUCT DETAILS</h4>
                <p className="my-4 text-blue-ct7 text-sm font-medium">
                  Apricots Form is an armless modern chair with a minimalistic expression. With a simple and contemporary design Form Chair has a soft
                  and welcoming ilhouette and a distinctly residential look. The legs appear almost as if they are growing out of the shell. This
                  gives the design flexibility and makes it possible to vary the frame. Unika is a mouth blown series of small, glass pendant lamps,
                  originally designed for the Restaurant Gronbech. Est eum itaque maiores qui blanditiis architecto. Eligendi saepe rem ut. Cumque
                  quia earum eligendi.
                </p>
                <Image className="w-full rounded-xl mt-4" src={productDes} alt="" />
              </div>
            </TabsContent>
             <TabsContent key="ADDITIONAL-INFORMATION" value="ADDITIONAL-INFORMATION">
             <div className="content-des">
             <p className="my-4 text-blue-ct7 text-sm font-medium">
               Designed by Puik in 1949 as one of the first models created especially for Carl Hansen & Son, and produced since 1950. The last of a series of chairs wegner designed based on inspiration from antique chinese armchairs. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia eserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, aque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
               </p>
               <h4 className="text-sm font-bold text-blue-ct7">PRODUCT DETAILS</h4>
              <ul className="text-blue-ct7 text-sm mt-4">
                <li>Material: Plastic, Wood</li>
                <li>Legs: Lacquered oak and black painted oak</li>
                <li>Length: 48cm</li>
                <li>Depth: 52cm</li>
                <li>Weight: 1lb</li>
                <li>Color: White</li>
              </ul>
             </div>
           </TabsContent>
 
        </Tabs>
      </div>
    </div>
  );
};

export default Description;
