import { Search } from "@/icons/info/Search";
import { Button } from "@/shared/button";
import InputForm from "@/shared/input";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import closeIcon from "@/image/icon/close.svg";
import Image from "next/image";
import useProductsStore from "@/store/useProductsStore";
import { Quicksand } from "next/font/google";
import { useRouter } from "next/router";
import Modal from "@/shared/modal";
const quicksand = Quicksand({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

interface Props {
  setIsOpenModal: (value: boolean) => void;
  isOpenModal: boolean;
}

export default function ModalSearch({ setIsOpenModal, isOpenModal }: Props) {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const saveSearchValue = useProductsStore((state) => state.saveSearchValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/shop");
    saveSearchValue(searchValue.trim());
    setSearchValue("");
    closeModal();
  };

  return (
    <Modal className="bg-blue-ct5 opacity-50" modalClass="w-full" isOpenModal={isOpenModal} onCancel={setIsOpenModal}>
      <Dialog.Panel className="w-full p-16 xs:px-3 relative transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h3" className={`text-lg html font-bold text-center leading-6 text-blue-ct7 xs:text-sm ${quicksand.className}`}>
          WHAT ARE YOU LOOKING FOR?
        </Dialog.Title>
        <form onSubmit={handleSubmit}>
          <div className="mt-2 max-w-3xl m-auto flex gap-1">
            <InputForm
              className={`border-2 font-sans border-gray py-3 w-full font-medium text-sm xs:py-2 ${quicksand.className}`}
              placeholder="Search Product..."
              value={searchValue}
              onChange={handleSearch}
            />
            <Button type="submit" className="rounded-lg px-3 py-3 bg-blue-ct5 xs:px-3 xs:py-2">
              <Search className="w-5 h-5 text-white" />
            </Button>
          </div>
        </form>
        <div className="mt-4 absolute top-0 right-5 xs:right-3">
          <Button
            type="button"
            className="inline-flex justify-center bg-red-600 xs:px-1 xs:py-1 rounded-full border border-transparent px-2 py-2 hover:bg-red-400 duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            onClick={closeModal}
          >
            <Image src={closeIcon} alt="" className="w-5 h-5 xs:w-4 xs:h-4" />
          </Button>
        </div>
      </Dialog.Panel>
      ;
    </Modal>
  );
}
