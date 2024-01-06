import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ModalBase } from "./ModalBase";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import axios from "axios";
import { useRouter } from "next/router";
import Form1 from "@/components/Form/Form1";
import * as yup from "yup";
import { toast } from "react-toastify";
export const ForgotPasswordModal = ({
  isOpen,
  setforgotPassState,
  forgotPassState,

  setLoginState,
}: any) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const fields = [
    {
      name: "email",
      label: "Email",
      type: "text",
      validation: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    },
  ];
  const fields2 = [
    {
      name: "otp",
      label: "OTP",
      type: "text",
      validation: yup.string().required("Otp is required"),
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
        .string()
        .required("Confirmation pass is required")
        .oneOf([yup.ref("password")], "Passwords must match"),
    },
  ];

  const [activePass, setActivePass] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data, "pass");
    let fdata = new FormData();
    fdata.append("email", data.email);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/resetpass`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Password Reset email sent!", {
          autoClose: 2000,
          position: "bottom-right",
        });
        setforgotPassState({
          isOpen: false,
          type: null,
        });
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
        setforgotPassState({
          isOpen: false,
          type: null,
        });
      });
    // setActivePass(true);
  };
  const onSubmitPass = async (data: any) => {
    console.log(data, "pass");
  };

  const loginHandler = () => {
    setforgotPassState({
      isOpen: false,
      type: null,
    });
    setLoginState({
      isOpen: true,
      type: "login",
    });
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={setforgotPassState}
      modalState={forgotPassState}
      title="Forgot account password"
    >
      <div className="mt-2">
        {activePass ? (
          <>
            <Form1
              className="flex flex-col items-center  my-10 md:mx-16"
              fields={fields2}
              onSubmit={onSubmitPass}
              btn="Submit"
            />
          </>
        ) : (
          <Form1
            className="flex flex-col items-center  my-10 md:mx-16"
            fields={fields}
            onSubmit={onSubmit}
            btn="Reset"
          />
        )}
      </div>
      <div className="text-center  my-3">
        <button className=" underline  text-xs" onClick={loginHandler}>
          Login here
        </button>
      </div>
    </ModalBase>
  );
};
