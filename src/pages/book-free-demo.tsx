import {
  BookDemo1,
  BookDemo2,
  BookDemo3,
  BookDemo4,
  BookDemo5,
} from "@/assets/BookDemo1";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, TextField } from "@mui/material";
// import {BookDemo2} from "@/assets/BookDemo2";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default () => {
  const schema: any = yup.object().shape({
    fullName: yup.string().required("full Name is required"),
    PhoneNumber: yup.string()
      .required("Phone is required")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      })
      ,
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const fullNameMsg: any = errors?.fullName && errors?.fullName?.message;
  const PhoneNumberMsg: any = errors?.PhoneNumber && errors?.PhoneNumber?.message;
  const emailMsg: any = errors?.email && errors?.email?.message;
  const onSubmit = (e: any) => {
  
    console.log(e, "data");
    console.log(errors, "error");
  };
  return (
    <>
      <div className="lg:p-11">
        <div className=" grid lg:grid-cols-2 grid-cols-1">
          <div className="flex gap-2 flex-wrap justify-center items-baseline lg:order-1 order-2">
            <div className=" w-52">
              <div className="w-full p-3 m-2">
                <BookDemo1 />
              </div>
            </div>
            <div className=" w-52">
              <div className="w-full p-3 m-2">
                <BookDemo2 />
              </div>
            </div>
            <div className=" w-52">
              <div className="w-full p-3 m-2">
                <BookDemo3 />
              </div>
            </div>
            <div className=" w-52">
              <div className="w-full p-3 m-2">
                <BookDemo4 />
              </div>
            </div>
            <div className=" w-52">
              <div className="w-full p-3 m-2">
                <BookDemo5 />
              </div>
            </div>
          </div>
          <div className=" lg:order-2 order-1 p-4 lg:mx-10">
            <div className=" bg-white md:px-10 px-5 my-10 rounded-xl shadow-black">
              <div className=" md:text-5xl text-2xl text-center font-semibold pt-10">
                Online Music classes for All Age Groups
              </div>
              <div className=" mx-6">
                <form
                  className=" flex flex-col gap-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextField
                    id="standard-basic"
                    label="Full Name"
                    variant="standard"
                    className=" mt-4"
                    {...register("fullName")}
                  />
                     {fullNameMsg && <p className=" text-red-600 text-center text-xs">{fullNameMsg}</p>}

                  <TextField
                    id="standard-basic"
                    label="Phone Number"
                    variant="standard"
                    className=" mt-4"
                    {...register("PhoneNumber")}
                  />
                  {PhoneNumberMsg && <p className=" text-red-600 text-center text-xs">{PhoneNumberMsg}</p>}
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    className=" mt-4"
                    {...register("email")}
                  />
                  {emailMsg && <p className=" text-red-600 text-center text-xs">{emailMsg}</p>}

                  <button
                    type="submit"
                    className="text-white my-4 py-2 px-5 text-sm font-bold rounded-xl mx-auto hover:text-black"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #205d98 0%, #24bac3 100%)",
                    }}
                  >
                    Book your free demo class
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
