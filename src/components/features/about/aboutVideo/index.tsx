import React, { useState } from "react";
import Image from "next/image";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import videoImage from "@/image/banner/video-bg-1.webp";
import play from "@/image/icon/play.svg";

const AboutVideo = () => {
  const statistics = [
    {
      statistic: "5465+",
      title: "Active Clients",
    },
    {
      statistic: "4968+",
      title: "Projects Done",
    },
    {
      statistic: "565+",
      title: "Team Advisors",
    },
    {
      statistic: "485+",
      title: "Users Online",
    },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="about-video py-16">
      <div className="content-heading text-center mt-16">
        <h4 className="text-green-ct5 font-medium">~ Good Performance ~</h4>
        <h3 className="text-3xl font-bold text-blue-ct7 mt-4 mb-4">Our Working Ability</h3>
        <p className="text-blue-ct7 text-sm font-medium mb-8">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
      </div>
      <div onClick={openModal} className="video overflow-hidden rounded-lg w-4/5 m-auto relative cursor-pointer group sm:w-11/12 sm:!h-[300px]">
        <Image src={videoImage} alt="" className="object-cover w-full h-full scale-100 duration-500 group-hover:scale-110" />
        <Image src={play} alt="" className="object-cover absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-16 h-16" />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-5xl" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black-ct50 z-5xl bg-blue-ct5 opacity-50" />
          </Transition.Child>

          <div className="fixed z-6xl inset-0 overflow-y-auto">
            <div className="min-h-full p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[700px] h-96 p-3 xs:px-3 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/04z02TNjio0" allowFullScreen></iframe>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="statistics mt-8 flex justify-center gap-10 flex-wrap px-16 xl:justify-start xl:pl-40 mdd:pl-20 sm:!pl-6 sm:px-0">
        {statistics.map((item, index) => (
          <div key={index} className="statistic">
            <h4 className="text-2xl text-green-ct5 font-bold md:text-xl">{item.statistic}</h4>
            <h4 className="text-xl text-blue-ct7 font-bold my-2 md:text-lg">{item.title}</h4>
            <p className=" text-sm text-blue-ct7 font-medium md:text-xs">
              Sed ut perspiciatis unde omnis <br />
              iste natus sit accusantium doloremque.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutVideo;
