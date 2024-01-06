import { Home } from "@/modules/Home/Home";
import axios from "axios";

import Head from "next/head";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default () => {
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/location`)
      .then((response) => {
        // console.log(response?.data?.data, "location");
        localStorage.setItem("location", JSON.stringify(response?.data?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Head>
        {" "}
        <title>Welcome</title>
      </Head>

      <Home />
      <ToastContainer />
    </>
  );
};
