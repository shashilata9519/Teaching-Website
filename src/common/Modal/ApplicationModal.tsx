import React, { useState } from "react";
import { ModalBase } from "./ModalBase";
import Link from "next/link";
import { NewBatchModal } from "./NewBatchModal";
import { DemoBatchModal } from "./DemoBatchModal";

export const ApplicationModal = ({
  isOpen,
  closeModal,
  modalState,
  firstname,
  course_id,
  course,
  item,
  newHandler,
  demoHandler,
  setmodalState1,
  modalState1
  
}: any) => {
  // let [modalState1, setmodalState1] = useState<any>({
  //   isOpen: false,
  //   type: null,
  // });

  function modalHandler({ type }: any) {
    

    setmodalState1({
      isOpen: !modalState1.isOpen,
      type: type,
    });
  }

  return (
    <>
      <ModalBase
        isOpen={isOpen}
        closeModal={closeModal}
        modalState={modalState}
        title=""
      >
        <div className=" text-center  my-5 ">
          {/* <p className=' font-semibold text-orange-400'></p> */}
          <p className="mt-5 text-sm">
            {firstname} applying for{" "}
            <span className=" font-semibold">{course}</span>
          </p>
          <p className=" my-5 text-sm">
            {/* <span className=" font-semibold">Add to an existing batch or</span>{" "} */}
            <br />  create new batch
          </p>
          <div className="flex justify-center">
            <div
              className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
              onClick={() => modalHandler({ type: "New" })}
            >
              New Batch
            </div>
            <div
              className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
              onClick={() => modalHandler({ type: "Demo" })}
            >
              Demo Batch
            </div>
          </div>
        </div>
      </ModalBase>
      {/* {modalState1.type === "New" && (
        <NewBatchModal modalState={modalState1} closeModal={setmodalState1} firstname={firstname}courseid={course_id} item={item} course={course}/>
      )}
      {modalState1.type === "Demo" && (
        <DemoBatchModal modalState={modalState1} closeModal={setmodalState1} firstname={firstname} item={item}/>
      )} */}
    </>
  );
};
