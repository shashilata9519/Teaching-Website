import React from "react";
import { ModalBase } from "./ModalBase";
import Link from "next/link";

export const SuccessModal = ({
  isOpen,
  closeModal,
  modalState,
  type,
  setLoginState,
}: any) => {
  const loginHandler = () => {
    closeModal({
      isOpen: false,
      type: "success",
    });
    setLoginState({
      isOpen: true,
      type: "login",
    });
  };
  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title={`${type === "teacherRegister" ||type === "register" ? "" : "All Done !"}`}
    >
      {type === "teacherRegister" ||type === "register" ? (
        <div className="text-center">
          <p className=" font-semibold text-orange-400 text-3xl my-5 px-5">
            Registration complete!{" "}
          </p>
          <button
            className=" rounded-3xl px-2 py-1 font-semibold"
            onClick={loginHandler}
          >
            Continue to Login
          </button>
        </div>
      ) : (
        <div className=" text-center  my-5 ">
          <p className=" font-semibold text-orange-400">
            Your application has been sent to the teacher
          </p>
          <p className="mt-5 text-sm">
            {" "}
            You shall receive an email/message on the
            <br /> at acceptance of your application
          </p>
          <p className=" my-5 text-sm">
            Track your application status in your profile
          </p>
          <Link
            href="/account/dashboards/application"
            className=" bg-black text-white rounded-3xl px-2 py-1"
          >
            Track Status
          </Link>
          <p className="mt-7 text-xs">
            Note: Teacher usually take 24-48 hours to respond, The acceptance is
            based on <br /> the teacher's best judgement and student's
            experience.
          </p>
        </div>
      )}
    </ModalBase>
  );
};
