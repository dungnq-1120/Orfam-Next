import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "../button";
interface Props {
  isOpen: boolean;
  message: string;
  title: string;
  textOk?: string;
  textCancel?: string;
  okOK: () => void;
  onCancel: () => void;
}

export default function Modal({ isOpen, message, title, textOk, textCancel,okOK ,onCancel }: Props) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-5xl" onClose={onCancel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-ct5 z-5xl" />
          </Transition.Child>

          <div className="fixed z-6xl inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {message}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{title}</p>
                  </div>

                  <div className="mt-4">
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={okOK}
                    >
                      {textOk || "OK"}
                    </Button>
                    <Button
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onCancel}
                    >
                      {textCancel || "Cancel"}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
