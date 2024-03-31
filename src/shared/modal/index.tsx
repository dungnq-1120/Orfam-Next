import { Dialog, Transition } from "@headlessui/react";
import { Fragment, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  modalClass?: string;
  isOpenModal: boolean;
  onCancel: (value: boolean) => void;
}

const Modal = forwardRef<HTMLDivElement, Props>(({ children, isOpenModal, onCancel, modalClass, className, ...rest }, ref) => {
  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
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
            <div {...rest} ref={ref} className={cn("fixed inset-0 bg-blue-ct5 z-5xl", className)} />
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
                <Dialog.Panel className={cn(modalClass)}>{children}</Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
});

Modal.displayName = "Modal";

export default Modal;
