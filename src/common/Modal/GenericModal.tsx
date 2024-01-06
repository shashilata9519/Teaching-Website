import { ModalBase } from "./ModalBase";

import { useRouter } from "next/router";
import Link from "next/link";
import { TextField } from "@mui/material";
import { Children, useState } from "react";
import { Repo } from "@/services/Repo";

export const GenericModal = ({
  isOpen,
  closeModal,
  modalState,
  title,
  content1,
  content2,
  content3,
  successText,
  rejectionText,
  successCb,
  rejectionCb,
  dataId,
  setmodalState,
  children,
}: any) => {
  const router = useRouter();

  const closeHandler = () => {
    setmodalState({
      isOpen: false,
      type: null,
    });
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeHandler}
      modalState={modalState}
      title={title}
    >
      <div className=" my-5 ">
        {(modalState.type !== "Reschedule" && modalState.type !== "file") ? (
          <>
            {content1 && <p className=" my-4">{content1}</p>}
            {content2 && <p className=" my-4">{content2}</p>}
            {content3 && <p className=" my-4">{content3}</p>}
          </>
        ) : (
          <div className=" mx-5">{children}</div>
        )}

        <div className=" flex justify-end my-3">
          <button
            className=" mx-3 text-white bg-gray-400 px-2 py-1 rounded-lg "
            onClick={closeHandler}
          >
            {rejectionText == "" ? "No" : rejectionText}
          </button>

          <button
            type="submit"
            className={`mx-3 text-white bg-xcool-new-blue px-2 py-1 rounded-lg ${
              modalState.type === "file" ? "hidden" : "block"
            }`}
            onClick={() => successCb()}
          >
            {successText == "" ? "Yes" : successText}
          </button>
        </div>
      </div>
    </ModalBase>
  );
};
