import { ModalBase } from "./ModalBase";

import { useRouter } from "next/router";
import Link from "next/link";

export const TextModal = ({ isOpen, closeModal, modalState }: any) => {
  const router = useRouter();


  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title=""
    >
      <div className=" text-center  my-5 ">
       <p className=" my-4 text-lg font-semibold">We are redirecting you to a <br/> partner website powered by xcool</p>
        <Link
          href={"https://yogateachers.tqcert.in/"}
          className=" text-center font-semibold cursor-pointer"
          target="_blank"
        >
          Click to Proceed
        </Link>
      </div>
    </ModalBase>
  );
};
