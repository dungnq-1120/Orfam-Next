import React, { useState } from "react";
import Image from "next/image";
import useSWRMutation from "swr/mutation";

import { useProfile } from "@/hooks/useProfile";
import { useComments } from "@/hooks/useComments";

import { Button } from "@/shared/button";

import { fetcherPost } from "@/services/callApiService";

import type { TComments } from "@/services/type";
import type { TMyProfile } from "../../checkout/type";

import isDefined from "@/utils/isDefine";

import avatar from "@/image/logo/favico.png";

const BlogComment = () => {
  const [commentValue, setCommentValue] = useState<string>("");
  const { comments, refreshComments } = useComments<TComments[]>();
  const { profile } = useProfile<TMyProfile>(false);
  const { trigger: addComment } = useSWRMutation("/comments", fetcherPost);

  const handleAddComment = () => {
    if (comments) {
      const newComment = { comment: commentValue, userId: profile?.data.id, name: profile?.data.name };
      addComment(newComment);
      refreshComments();
      setCommentValue("");
    }
  };

  return (
    <div className="comment border-t-2 mt-10 ">
      <div className="author bg-gray-300 mt-10 p-5 flex items-center gap-2">
        <Image className="w-14 h-14" src={avatar} alt="" />
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
          {isDefined(comments) &&
            comments.map((comment) => (
              <div key={comment.id} className="comment-client border-t-1 py-4 flex gap-2">
                <Image src={avatar} alt="" className="rounded-full w-14 h-14" />
                <div className="content">
                  <h4 className="text-sm font-semibold text-blue-ct7">{comment.name.toLocaleUpperCase()}</h4>
                  <p className="text-sm text-blue-ct7 font-medium mt-1">{comment.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="reply">
        <div className="comment-me w-full border-t-1 pt-4 flex items-center gap-2 mt-6 sm:items-start">
          <div className="content w-full">
            <div className="flex gap-2">
              <Image src={avatar} alt="" className="rounded-full w-14 h-14" />
              <textarea
                value={commentValue}
                onChange={(e) => {
                  setCommentValue(e.target.value);
                }}
                className="w-full h-full border-0 bg-gray-100 outline-0 text-sm pl-3 pt-4 rounded-lg"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="flex justify-end w-full mt-3">
              <Button onClick={handleAddComment} className="hover:opacity-100 hover:bg-green-ct5 py-3 duration-500 sm:py-4 xs:text-xs xs:py-3">
                POST COMMENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogComment;
