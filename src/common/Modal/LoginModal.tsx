import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ModalBase } from "./ModalBase";
import { useForm } from "react-hook-form";
import { Input } from "../Input/Input";
import axios from "axios";
import { useRouter } from "next/router";
import Form1 from "@/components/Form/Form1";
import * as yup from "yup";
import GoogleIcon from "@/assets/GoogleIcon";
import { Repo } from "@/services/Repo";
import { toast } from "react-toastify";

export const LoginModal = ({
  isOpen,
  closeModal,
  modalState,
  loginState,
  setLoginState,
  setforgotPassState,
  setRegisterState,
}: any) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  console.log(errors,'formerror')
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

    {
      name: "password",
      label: "Password",
      type: "password",
      validation: yup.string().required("Password is required"),
    },
  ];

  const onSubmit = async (data: any) => {
    // console.log(data, "data");
    // console.log(errors, "error");
    let fdata = new FormData();
    fdata.append("email", data.email);
    fdata.append("password", data.password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        var a = response.data.data.token;
        var b = response.data.data.name;

        localStorage.setItem("token", a);

        // if (router.pathname == "/") {

        //   router.push("/account/dashboard?tab=0");
        // }
        // else{
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // }
        setLoginState({
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
      });
  };

  const forgotHandler = () => {
    setLoginState({
      isOpen: false,
      type: null,
    });
    setforgotPassState({
      isOpen: true,
      type: "forgot_pass",
    });
  };
  const registerHandler = () => {
    setLoginState({
      isOpen: false,
      type: null,
    });

    setRegisterState({
      isOpen: true,
      type: "register",
    });
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={setLoginState}
      modalState={loginState}
      title="Login to your account"
    >
      <div className="mt-2">
        <Form1
          className="flex flex-col items-center  my-10 md:mx-16"
          fields={fields}
          onSubmit={onSubmit}
          btn="Login"
        />
      </div>
      <div className="text-center ">
        <button className="underline text-xs mb-2" onClick={forgotHandler}>
          forgot password
        </button>
        <br />
        <button
          className="text-center underline text-xs"
          onClick={registerHandler}
        >
          New to xcool? Register Now
        </button>
      </div>
      <div className=" text-center my-2 opacity-50 text-xs">
        ----- or log in via -----
      </div>
      <div className=" flex justify-center mb-5 ">
        <GoogleIcon />
      </div>
    </ModalBase>
  );
};
