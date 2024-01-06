import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ModalBase } from "./ModalBase";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import Form1 from "@/components/Form/Form1";
import axios from "axios";
import { useRouter } from "next/router";

import * as yup from "yup";
import GoogleIcon from "@/assets/GoogleIcon";
import { ToastContainer, toast } from "react-toastify";

export const RegisterModal = ({
  isOpen,
  closeModal,
  modalState,
  setSuccessState,
  setLoginState,
}: any) => {
  const router = useRouter();

  const fields = [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      validation: yup.string().required("First Name is required"),
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      validation: yup.string().required("Last Name is required"),
    },

    {
      name: "email",
      label: "Email",
      type: "text",
      validation: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "number",

      validation: yup.string().matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      }),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      validation: yup.string().required("Password is required"),
    },
    {
      name: "password_confirmation",
      label: "Re-enter Password",
      type: "password",
      validation: yup
        .string().required("Confirmation pass is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    },
    // {   
    //   name:"register_as",
    //   label:"Register as a",
    //   type:"select",
    //   validation: yup.string().required("Type is required"),

    // }
  ];

  const onSubmit = (data: any) => {
    let fdata = new FormData();
    fdata.append("firstname", data.firstname);
    fdata.append("lastname", data.lastname);
    fdata.append("phone", data.phone);
    fdata.append("email", data.email);
    fdata.append("password", data.password);
    fdata.append("password_confirmation", data.password_confirmation);
    fdata.append("register_as", "student");

    // console.log(data,'ddd')
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: fdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        closeModal({
          isOpen: false,
          type: "register",
        });
        setSuccessState({
          isOpen: true,
          type: "success",
        });

      
      })
      .catch((error) => {
        console.log(error);

        toast.error(error?.response?.data?.data ||"Something went wrong! Try again", {
          autoClose: 2000,
          position: "bottom-right",
        });

      });
  };

  const loginHandler=()=>{
    closeModal({
      isOpen: false,
      type: null,
    });
    setLoginState({
      isOpen: true,
      type: "login",
    })
  }

  return (
    <>
    
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title="Student Registration"
    >
      <div className="mt-2">
        <Form1
          // className="flex flex-wrap justify-center items-center gap-2  my-10"
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 my-3"
          fields={fields}
          onSubmit={onSubmit}
          btn="Register"
        />
      </div>
      <div className="text-center  my-3">
        <button className=" underline  text-xs" onClick={loginHandler}>
          Have an existing account? Login
        </button>
      </div>
      <div className=" text-center my-2 opacity-50 text-xs">
        ----- or log in via -----
      </div>
      <div className=" flex justify-center mb-5 ">
        <GoogleIcon/>
      </div>
    </ModalBase>
    <ToastContainer />
    </>
    
  );
};
