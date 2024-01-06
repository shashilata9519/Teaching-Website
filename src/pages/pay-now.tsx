import {
  BookDemo1,
  BookDemo2,
  BookDemo3,
  BookDemo4,
  BookDemo5,
} from "@/assets/BookDemo1";
import { Repo } from "@/services/Repo";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import {BookDemo2} from "@/assets/BookDemo2";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

export default () => {
  const router = useRouter();
  const [fee, setfee] = useState(1000);

  const schema: any = yup.object().shape({
    fullName: yup.string().required(" Name is required"),
    PhoneNumber: yup
      .string()
      .required("Phone no is required")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      }),
    email: yup.string().email("Invalid email").required("Email is required"),
    fees: yup
      .number()
      .required("Fees is required")
      .min(1, "Enter an amount greater than 0")
      .typeError("Enter an amount greater than 0"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
    // defaultValues: { fees: fee },
    // values: { fees: fee },
  });
  const fullNameMsg: any = errors?.fullName && errors?.fullName?.message;
  const PhoneNumberMsg: any =
    errors?.PhoneNumber && errors?.PhoneNumber?.message;
  const emailMsg: any = errors?.email && errors?.email?.message;
  const feeMsg: any = errors?.fees && errors?.fees?.message;
  const [currency, setCurrency] = useState("INR"); // Initial currency selection
  console.log(currency, "currency");
  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
    // You can perform any other actions when the currency is changed here.
  };
  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const onSubmit = async (e: any) => {
    console.log(e, "data");
    console.log(errors, "error");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await Repo.createAnonOrder({
      amount: e?.fees || e?.fees_usd,
      currency: currency || "INR",
    });

    // console.log(result, "result");
    const options = {
      // key: "rzp_test_bELNQVu6cqbl9r", // Development
      key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
      amount: Math.trunc(e.fees * 100 || e.fees_usd * 100),
      currency: currency || "INR",
      name: "xcool",
      description: "Payment by student",
      image: "",
      order_id: result?.payment_order_id,

      handler: async function (response: any) {
        const data: any = {
          order_id: result?.order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          // user_id: item?.registered_stud,
        };
        console.log(data, "data");
        const res = await Repo.savePayment(data);
        // setRefresh(true);
        // console.log(res, "payment");
        if (res?.success) {
          toast.success("Transation Successfull !", { autoClose: 2000 });
        } else {
          toast.error("failed try again !", {
            autoClose: 2000,
            position: "bottom-right",
          });
        }
      },
      prefill: {
        name: e?.fullName,
        email: e?.email,
        contact: e?.PhoneNumber,
      },
      notes: {
        order_id: result?.order_id,
        // user_id: userData?.user_id,
      },
      theme: {
        color: "#528FF0",
      },
    };
    console.log(options);
    const paymentObject: any = new window.Razorpay(options);

    paymentObject.open();
  };

  useEffect(() => {
    console.log(router?.query?.fee, "register");
    if (router?.query?.fee) {
      setfee(Number(router?.query?.fee) ?? 500);
    }
  }, [router]);
  console.log(fee, "fee");
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
                Book your class now
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
                  {fullNameMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {fullNameMsg}
                    </p>
                  )}

                  <TextField
                    id="standard-basic"
                    label="Phone Number"
                    variant="standard"
                    className=" mt-4"
                    {...register("PhoneNumber")}
                  />
                  {PhoneNumberMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {PhoneNumberMsg}
                    </p>
                  )}
                  <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    className=" mt-4"
                    {...register("email")}
                  />
                  {emailMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {emailMsg}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center">
                    <div className="mt-3 w-1/3">
                    <InputLabel id="demo-simple-select-standard-label">Currency</InputLabel>
                    <Select
                      value={currency}
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      onChange={handleCurrencyChange}
                      label="Currency"
                      variant="standard"
                      className=" w-full"
                    >
                      <MenuItem value="INR">INR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                    </Select>
                    </div>
                    <div className=" w-2/3 mt-1 ps-1">
                      <TextField
                        id="standard-basic"
                        label="Fees"
                        variant="standard"
                        className=" mt-4 w-full"
                        {...register("fees")}
                      />
                      {feeMsg && (
                        <p className=" text-red-600 text-center text-xs">
                          {feeMsg}
                        </p>
                      )}
                    </div>
                  </div>

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
      <ToastContainer />
    </>
  );
};
