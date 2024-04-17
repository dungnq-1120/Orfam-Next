import React from "react";
import useSWRMutation from "swr/mutation";

import { useMessage } from "@/hooks/useMessage";

import AdminLayout from "@/components/layouts/AdminLayout";

import Admin from "..";

import { Button } from "@/shared/button";

import { fetcherDelete } from "@/services/callApiService";
import type { TMessage } from "@/services/type";

import isDefined from "@/utils/isDefine";
import showToast from "@/utils/showToast";

const Message = () => {
  const { messages, refreshMessage } = useMessage<TMessage[]>();
  const { trigger: deleteMessage } = useSWRMutation("/message", fetcherDelete);
  const handleDeleteMessage = (message: TMessage) => {
    deleteMessage(message);
    refreshMessage();
    showToast({
      message: "Deleted successfully",
      type: "warning",
    });
  };
  return (
    <div className="shadow-shadow2 p-3">
      <h3 className="font-semibold text-blue-ct7 text-lg">MANAGE MESSAGES</h3>
      <div className="mt-5 overflow-auto">
        <table className="border-collapse border w-[110%] csm:w-[200%] csm:text-xs xs:!w-[300%] ">
          <thead>
            <tr>
              <th className="p-4 text-blue-ct5 border border-slate-600">Name</th>
              <th className="p-4 text-blue-ct5 border border-slate-600">Email</th>
              <th className="p-4 text-blue-ct5 border border-slate-600">Message</th>
              <th className="p-4 text-blue-ct5 border border-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {isDefined(messages) &&
              messages.reverse().map((message) => (
                <tr key={message.id} className="text-center">
                  <td className="border border-slate-600 py-3 px-3 text-blue-ct7 font-medium">{message.name}</td>
                  <td className="border border-slate-600 py-3 px-3 text-blue-ct7 font-medium">{message.email}</td>
                  <td className="border border-slate-600 py-3 px-3 text-blue-ct7 font-medium text-start">{message.message}</td>
                  <td className="border border-slate-600 py-3 px-3 text-blue-ct7 font-medium text-start">
                    <Button
                      onClick={() => {
                        handleDeleteMessage(message);
                      }}
                      className="bg-red-500 w-full font-semibold py-2"
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Message.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AdminLayout>
      <Admin>{page}</Admin>
    </AdminLayout>
  );
};

export default Message;
