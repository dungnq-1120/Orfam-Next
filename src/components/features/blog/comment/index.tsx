import React from "react";
import avatar from "@/image/logo/blog-details-author.webp";
import avatarClient_1 from "@/image/logo/comment-1.webp";
import avatarClient_3 from "@/image/logo/comment-3.webp";
import Image from "next/image";
import { Button } from "@/shared/button";

const BlogComment = () => {
  return (
    <div className="comment border-t-2 mt-10 ">
      <div className="author bg-gray-300 mt-10 p-5 flex items-center gap-2">
        <Image src={avatar} alt="" />
        <div className="comment-content">
          <h4 className="text-blue-ct7 text-sm font-semibold">MICHAEL ANTHONY</h4>
          <p className="text-sm mt-1 text-blue-ct7 font-medium">
            The tiles are highly resistant to water and dirt and can be cleaned, so they are compatible with <br /> the cultivation of plants and
            cooking and the functions.
          </p>
        </div>
      </div>
      <div className="leave-comment">
        <h3 className="my-6 text-blue-ct7 font-bold text-lg">LEAVE A COMMENTS</h3>
        <div className="list-comment">
          <div className="comment-client border-t-1 pt-4 flex gap-2">
            <Image src={avatarClient_1} alt="" className="rounded-full w-14 h-14" />
            <div className="content">
              <h4 className="text-sm font-semibold text-blue-ct7">KRISTIN WATSON</h4>
              <p className="text-sm text-blue-ct7 font-medium mt-1">
                The tiles are highly resistant to water and dirt and can be cleaned, so they are compatible with the cultivation <br /> of plants and
                cooking and the functions. There are few plugins and apps available for this purpose, many of <br /> them required a monthly
                subscription.
              </p>
            </div>
          </div>
          <div className="comment-client border-t-1 pt-4 flex gap-2 mt-6">
            <Image src={avatarClient_3} alt="" className="rounded-full w-14 h-14" />
            <div className="content">
              <h4 className="text-sm font-semibold text-blue-ct7">BROOKLYN SIMMONS</h4>
              <p className="text-sm text-blue-ct7 font-medium mt-1">
                The tiles are highly resistant to water and dirt and can be cleaned, so they are compatible with the cultivation <br /> of plants and
                cooking and the functions. There are few plugins and apps available for this purpose, many of <br /> them required a monthly
                subscription.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="reply">
        <div className="comment-me border-t-1 pt-4 flex items-center gap-2 mt-6 sm:items-start">
          <Image src={avatarClient_3} alt="" className="rounded-full w-14 h-14" />
          <div className="content w-full flex gap-1 sm:flex-wrap">
            <textarea className="w-full h-full border-0 bg-gray-100 outline-0 text-sm pl-3 pt-4 rounded-lg" placeholder="Message"></textarea>
            <div className="flex sm:justify-end w-full">
              <Button className=" hover:opacity-100 hover:bg-green-ct5 duration-500 sm:py-4 xs:text-xs xs:py-3">POST COMMENT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
