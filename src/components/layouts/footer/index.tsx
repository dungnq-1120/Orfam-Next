import React from "react";

import { Button } from "@/shared/button";
import InputForm from "@/shared/input";

import { Curated } from "@/icons/feature/Curated";
import { Delivery } from "@/icons/feature/Delivery";
import { Discount } from "@/icons/feature/Discount";
import { Help } from "@/icons/feature/Help";
import { Payment } from "@/icons/feature/Payment";
import { Email } from "@/icons/socialMedia/Email";
import { Facebook } from "@/icons/socialMedia/Facebook";
import { Google } from "@/icons/socialMedia/Google";
import { Twitter } from "@/icons/socialMedia/Twitter";
import { Youtube } from "@/icons/socialMedia/Youtube";

const Footer = () => (
  <div className="footer bg-footer bg-no-repeat bg-cover w-full bg-slate-100">
    <div className="main-feature flex flex-wrap justify-between p-12 xs:px-2">
      <div className="main-feature-box text-center group mb-5">
        <Delivery className="text-white w-12 h-12 m-auto duration-500 scale-100 group-hover:scale-125 group-hover:text-green-ct5" />
        <h5 className="text-xs text-white font-semibold mb-2">FAST DELIVERY</h5>
        <p className="text-gray-400 text-xs font-semibold">Across West & East India</p>
      </div>

      <div className="main-feature-box text-center group mb-5">
        <Payment className="text-white w-12 h-12 m-auto duration-500 scale-100 group-hover:scale-125 group-hover:text-green-ct5" />
        <h5 className="text-xs text-white font-semibold mb-2">SAFE PAYMENT</h5>
        <p className="text-gray-400 text-xs font-semibold">100% Secure Payment</p>
      </div>
      <div className="main-feature-box text-center group mb-5">
        <Discount className="text-white w-12 h-12 m-auto duration-500 scale-100 group-hover:scale-125 group-hover:text-green-ct5" />
        <h5 className="text-xs text-white font-semibold mb-2">ONLINE DISCOUNT</h5>
        <p className="text-gray-400 text-xs font-semibold">Add Multi-buy Discounts</p>
      </div>
      <div className="main-feature-box text-center group mb-5">
        <Help className="text-white w-12 h-12 m-auto duration-500 scale-100 group-hover:scale-125 group-hover:text-green-ct5" />
        <h5 className="text-xs text-white font-semibold mb-2">HELP CENTER</h5>
        <p className="text-gray-400 text-xs font-semibold">Dedicated 24/7 Support</p>
      </div>
      <div className="main-feature-box text-center group mb-5">
        <Curated className="text-white w-12 h-12 m-auto duration-500 scale-100 group-hover:scale-125 group-hover:text-green-ct5" />
        <h5 className="text-xs text-white font-semibold mb-2">CURATED ITEMS</h5>
        <p className="text-gray-400 text-xs font-semibold">From Handpicked Sellers</p>
      </div>
    </div>
    <div className="footer-info border-t-1 border-b-1 border-gray-600 text-white p-12 flex xl:block xs:px-1">
      <div className="footer-left flex flex-wrap p-3 w-70p xl:w-full">
        <div className="footer-help flex-1 nm:flex-none csm:mr-3 csm:mt-6 ">
          <h4 className="font-semibold">LET US HELP YOU</h4>
          <p className="text-sm text-gray-300 mt-6 mb-6">
            If you have any question, please <br /> contact us at: <span className="text-green-ct5 font-semibold">support@example.com</span>
          </p>
          <div className="mt-8">
            <h5 className="text-gray-300 text-sm">Social Media:</h5>
            <ul className="social flex items-end gap-1 mt-2">
              <li>
                <Facebook className="w-5 h-5 hover:text-green-ct5 duration-500 cursor-pointer " />
              </li>
              <li>
                <Google className="w-5 h-5 hover:text-green-ct5 duration-500 cursor-pointer" />
              </li>
              <li>
                <Twitter className="w-5 h-5 hover:text-green-ct5 duration-500 cursor-pointer" />
              </li>
              <li>
                <Youtube className="w-5 h-5 hover:text-green-ct5 duration-500 cursor-pointer" />
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-left-center flex-1 ml-12 mr-12 nm:flex-none csm:ml-0 csm:mt-6">
          <div className="footer-help">
            <h4 className="font-semibold">LOOKING FOR ORFARM?</h4>
            <p className="text-sm text-gray-300 mt-6 mb-6">
              68 St. Vicent Place, Glasgow,
              <br /> Greater Newyork NH2012, UK.
            </p>
            <ul className="social text-sm">
              <li className="text-gray-300">
                Monday – Friday: <span className="text-white font-semibold"> 8:10 AM – 6:10 PM</span>
              </li>
              <li className="text-gray-300">
                Saturday: <span className="text-white font-semibold">10:10 AM – 06:10 PM</span>
              </li>
              <li className="text-gray-300">
                Sunday: <span className="text-white font-semibold">Close</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-content-right flex-1 nm:flex-none mdd:pt-6 mb-6">
          <h4 className="font-semibold">HOT CATEGORIES</h4>
          <ul className="mt-6">
            <li className="text-sm text-gray-300 mb-1.5 font-semibold cursor-pointer duration-500 hover:text-white hover:pl-3">
              Fruits & Vegetables
            </li>
            <li className="text-sm text-gray-300 mb-1.5 font-semibold cursor-pointer duration-500 hover:text-white hover:pl-3">Dairy Products</li>
            <li className="text-sm text-gray-300 mb-1.5 font-semibold cursor-pointer duration-500 hover:text-white hover:pl-3">Package Foods</li>
            <li className="text-sm text-gray-300 mb-1.5 font-semibold cursor-pointer duration-500 hover:text-white hover:pl-3">Beverage</li>
            <li className="text-sm text-gray-300 mb-1.5 font-semibold cursor-pointer duration-500 hover:text-white hover:pl-3">Health & Wellness</li>
          </ul>
        </div>
      </div>
      <div className="footer-right w-30p flex justify-end p-3 border-l-1 border-gray-600 xl:w-5/12 xl:block xl:border-none nm:w-9/12 sm:text-center sm:!w-full sm:m-auto">
        <div>
          <h4 className="font-semibold">OUR NEWSLETTER</h4>
          <p className="mt-4 mb-3 text-sm">
            Subscribe to the Orfarm mailing list to receive updates <br />
            on new arrivals & other information.
          </p>
          <div className="form-info relative">
            <InputForm
              fullWidth
              className="pl-12 border-none text-blue-ct7 py-4 font-semibold text-sm sm:w-full"
              placeholder="Your email address..."
            />
            <Email className="absolute -translate-y-2/4 top-2/4 left-2 w-10 h-10 text-blue-ct6" />
            <Button types="success" className="absolute right-2 -translate-y-2/4 top-2/4 py-3 xs:py-2 xs:px-2">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
