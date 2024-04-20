import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import useSWRMutation from "swr/mutation";

import { useProfile } from "@/hooks/useProfile";

import PublicLayout from "@/components/layouts/publicLayout";

import { Button } from "@/shared/button";

import { TMyProfile } from "@/components/features/checkout/type";

import { fetcherPost } from "@/services/callApiService";

import showToast from "@/utils/showToast";

import map from "@/image/banner/map.png";
import contact_1 from "@/image/banner/contact-big-bg1.webp";
import contact_2 from "@/image/banner/contact-big-bg2.webp";
import contact_3 from "@/image/banner/contact-big-bg3.webp";
import contact_4 from "@/image/banner/contact-big-bg4.webp";

const Contact = () => {
  const addresses = [
    {
      image: contact_1,
      location: "Heaven Stress, Beverly Melbourne",
    },
    {
      image: contact_2,
      location: "Prospect - New York",
    },
    {
      image: contact_3,
      location: "Budapest - Hungary",
    },
    {
      image: contact_4,
      location: "Kastrup - Denmark",
    },
  ];
  const [messageValue, setMessageValue] = useState<string>("");
  const [errorValue, setErrorValue] = useState("");
  const { profile } = useProfile<TMyProfile>(false);
  const { trigger: addMessage } = useSWRMutation("/message", fetcherPost);

  const handleSendMessage = () => {
    if (profile) {
      if (messageValue.length > 0) {
        const message = {
          name: profile.data.name,
          email: profile.data.email,
          userId: profile.data.id,
          message: messageValue,
        };
        addMessage(message);
        showToast({
          message: "Message sent successfully",
          type: "success",
        });
        setMessageValue("");
        setErrorValue("");
      } else {
        setErrorValue("Please enter your message before sending.");
      }
    } else {
      showToast({
        message: "Please log in before sending a message",
        type: "error",
      });
    }
  };
  return (
    <div className="contact mt-20 pt-10">
      <ToastContainer />
      <div className="contact-heading text-center">
        <h4 className="text-xs bg-green-ct5 inline-block p-1 px-2 text-white rounded-2xl font-semibold">CONTACT US</h4>
        <h3 className="text-blue-ct7 font-bold text-3xl my-4">Looking For Orfarm?</h3>
        <p className="text-sm font-medium text-blue-ct7">The liber tempor cum soluta nobis eleifend option congue doming quod mazim.</p>
      </div>
      <div className="address-list mt-10 flex flex-wrap justify-center gap-5 px-14 sm:px-3">
        {addresses.map((address, index) => (
          <div key={index} className="address">
            <Image src={address.image} alt="" className="rounded-xl" />
            <h3 className="text-blue-ct7 font-semibold text-lg mb-2">{address.location}</h3>
            <ul>
              <li className="text-sm font-medium text-blue-ct7">Add: Heaven Stress, Beverly Melbourne</li>
              <li className="text-sm font-medium text-blue-ct7 my-1">Phone: (+100) 123 456 7890</li>
              <li className="text-sm font-medium text-blue-ct7">Email: Orfarm@google.com</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="map mt-8 flex items-center px-10 py-2 nm:block xs:px-5">
        <div className="flex-1 overflow-hidden h-full">
          <Image src={map} alt="" className="w-full h-full object-fill" />
        </div>
        <div className="flex-1 px-12 py-1 h-full nm:bg-slate-200 nm:py-4 xs:px-5">
          <h3 className="font-semibold text-2xl text-blue-ct7">LEAVE A REPLY</h3>
          <p className="my-3 text-sm text-blue-ct7 font-medium">We will respond via email after receiving your message *</p>
          <form>
            <textarea
              value={messageValue}
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
              className="w-full pt-3 pl-3 h-56 mt-5 rounded-lg bg-slate-00 outline-none bg-slate-100 focus:outline-green-ct5"
              placeholder="Message"
            ></textarea>
            {errorValue && <span className="text-red-600 text-sm font-medium">{errorValue}</span>}
            <div className="flex justify-end mt-5">
              <Button onClick={handleSendMessage} type="button" types="success" className="px-10 py-3">
                SEND
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Contact;
