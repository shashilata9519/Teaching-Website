import {
  BookDemo1,
  BookDemo2,
  BookDemo3,
  BookDemo4,
  BookDemo5,
} from "@/assets/BookDemo1";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextField } from "@mui/material";
import axios from "axios";
// import {BookDemo2} from "@/assets/BookDemo2";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

export default () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const schema: any = yup.object().shape({
    password: yup.string().required("Password is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  console.log("token",searchParams?.get("token"),typeof searchParams?.get("token"))
  useEffect(() => {
    var token = searchParams?.get("token");
    if (token== "" && token != null) {
      router.push("/");
    }
  }, [searchParams]);

  const fullNameMsg: any = errors?.fullName && errors?.fullName?.message;
  const PhoneNumberMsg: any =
    errors?.PhoneNumber && errors?.PhoneNumber?.message;
  const emailMsg: any = errors?.email && errors?.email?.message;
  const onSubmit = (data: any) => {
    var token = searchParams?.get("token") ?? "";
    console.log(data, "data");
    console.log(errors, "error");

    console.log(data, "pass");
    let fdata = new FormData();
    fdata.append("email", data.email);
    fdata.append("token", token);
    fdata.append("password", data.password);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updatePassword`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: fdata,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        toast.success("Password Reset Successfully, Proceed to Login", {
          autoClose: 2000,
          position: "bottom-right",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error?.response?.data?.message);
        toast.error(error?.response?.data?.message, {
          autoClose: 2000,
          position: "bottom-right",
        });
      });
  };
  return (
    <>
      <div className="lg:p-11">
        <div className=" container w-full md:w-1/2 mx-auto">
          <div className=" lg:order-2 order-1 p-4 lg:mx-10">
            <div className=" bg-white md:px-10 px-5 my-10 rounded-xl shadow-black">
              <div className=" md:text-5xl text-2xl text-center font-semibold pt-10">
                Reset Password
              </div>
              <div className=" mx-6">
                <form
                  className=" flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    className=" mt-4"
                    {...register("email")}
                  />
                  {fullNameMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {fullNameMsg}
                    </p>
                  )}

                  <TextField
                    id="standard-basic"
                    label="New Password"
                    variant="standard"
                    type="password"
                    className=" mt-4"
                    {...register("password")}
                  />
                  {PhoneNumberMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {PhoneNumberMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="text-white my-4 py-2 px-5 text-sm font-bold rounded-xl mx-auto hover:text-black"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #205d98 0%, #24bac3 100%)",
                    }}
                  >
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
