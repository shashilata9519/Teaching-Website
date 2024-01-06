import Logo from "@/assets/logo";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// import {BookDemo2} from "@/assets/BookDemo2";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import { Footer } from "@/components/Footer/Footer";
import { faqData } from "@/common/faqContent";
import { FaChevronDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TiTick } from "react-icons/ti";
import Shape3 from "@/assets/shape3";
import { Header } from "@/common/Text/Header";
import { SubHeading } from "@/common/Text/SubHeading";
import { CampaignBookingModal } from "@/common/Modal/CampaignBookingModal";
import { SuccessModal } from "@/common/Modal/SuccessModal";
import { GenericModal } from "@/common/Modal/GenericModal";
import { useRouter } from "next/router";
import { Repo } from "@/services/Repo";
import axios from "axios";
import Shape4 from "@/assets/shape4";
import { BsArrowRight } from "react-icons/bs";
import Flute from "@/assets/Flute";
import TablaVectorDark from "@/assets/tablaVectorDark";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SideBarBookNow from "@/components/SideBarBookNow";
import { useModal } from "@/context/ModalContext";
import Script from "next/script";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    ochre: true;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    ochre: {
      main: "#FFFFFF",
      light: "#FFFFFF",
      dark: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
  },
});

export default () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [Lead, SetLocation] = React.useState<any>([]);

  console.log(router?.query?.id, "router");

  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getLead/${
          router?.query?.id
        }`
      )
      .then((response) => {
        SetLocation(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router]);

  return (
    <>
      <Head>
        {" "}
        <title>Xcool: Booking Confirmation</title>
      </Head>
      <Script strategy="lazyOnload" id="google-tag-manager">
        {`
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-PZC36C5D")
        `}
      </Script>
      <Link
        href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
        target="__blank"
      >
        <div className=" mix-blend-difference fixed right-0 top-1/2 z-20 origin-bottom-right -rotate-90 bg-white text-xcool-green py-1 px-2 rounded-md border-xcool-green hover:border-xcool-yellow border hover:text-xcool-yellow ">
          <p>Chat with us!</p>
        </div>
      </Link>
      <div className="w-full bg-neutral-950 relative">
        <div className="w-full  min-h-screen flex flex-col ">
          <div className="w-full h-[50%] md:h-[90%] flex">
            <div className="w-3/4 md:w-5/12 bg-white relative order-2">
              <div className="w-full p-4 md:py-10 md:px-10">
                <div className="w-full text-black text-sm md:text-lg uppercase gap-4 flex justify-center items-center">
                  <Link
                    href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
                    target="__blank"
                    className="md:p-2 cursor-pointer"
                  >
                    Contact us
                  </Link>
                </div>
              </div>

              <Image
                width={500}
                height={500}
                alt="learn music"
                className="md:w-full w-screen my-10 md:my-2"
                src="/banner-2.png"
              />
              {/* <img className="absolute -left-1/4 w-full" src={`/bg_image.png`}/> */}
            </div>
            <div className="w-1/4 md:w-7/12 order-1 z-10 text-white">
              <div className="w-full h-full p-4 md:py-10 md:px-10 flex justify-center items-center text-white">
                <div className="w-1/3 md:w-1/2 md:my-10 md:px-10 absolute top-3 left-1 md:top-0 md:left-0">
                  <Link href={"/"}>
                    <Logo className="z-10" />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <p className="md:text-4xl lg:text-5xl z-10 text-gray-100 font-bold mix-blend-difference">
                    Thank you
                  </p>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Customer information</div>
                    <div className="flex gap-2 p-2">
                      <div>Email: {Lead?.email}</div>{" "}
                      <div>Phone: {Lead?.phone}</div>
                    </div>
                  </div>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Order Details</div>
                    <div className="flex  flex-col  gap-2 p-2 justify-around">
                      {Lead?.genre_name && <div>Genre: {Lead?.genre_name}</div>}
                      {Lead?.course_name && (
                        <div>Course: {Lead?.course_name}</div>
                      )}
                      {Lead?.teacher_name && (
                        <div>Teacher: {Lead?.teacher_name}</div>
                      )}
                      {Lead?.time_pref && (
                        <div>Time Preference: {Lead?.time_pref}</div>
                      )}
                    </div>
                  </div>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Payment Details</div>
                    <div className="flex flex-col  gap-2 p-2 justify-around">
                      {Lead?.currency && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Currency:</div> <div> {Lead?.currency}</div>
                        </div>
                      )}
                      {Lead?.fee_pc && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Fee Per Class:</div> <div> {Lead?.fee_pc}</div>
                        </div>
                      )}
                      {Lead?.no_classes && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Number of Classes:</div>{" "}
                          <div> {Lead?.no_classes}</div>
                        </div>
                      )}
                      {Lead?.fee_pc && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Total Fees:</div>{" "}
                          {/* <div className="line-through"> {Lead?.fee_pc * Lead?.no_classes}</div> */}
                          <div > {Number(Lead?.fee_pc * Lead?.no_classes).toFixed(2)}</div>
                        </div>
                      )}
                      {Lead?.discount && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Discount:</div>
                          <div > { Lead?.discount}</div>
                        </div>
                      )}
                      {Lead?.fee_total && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Fees Paid:</div>
                          <div > { Number(Lead?.fee_total).toFixed(2)}</div>
                        </div>
                      )}
                      {Lead?.invitation?.order?.payment_order_id && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Order ID:</div>
                          <div > { Lead?.invitation?.order?.payment_order_id}</div>
                        </div>
                      )}
                      {Lead?.invitation?.order?.payment_id && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Transaction ID:</div>
                          <div > { Lead?.invitation?.order?.payment_id}</div>
                        </div>
                      )}
                      
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden block p-2 h-screen">
            <div className="">
              <p className="text-3xl text-white z-10 font-bold"> </p>
              <p className="text-md text-white z-10">
              <p className="md:text-4xl lg:text-5xl z-10 text-gray-100 font-bold mix-blend-difference">
                    Thank you
                  </p>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Customer information</div>
                    <div className="flex gap-2 p-2">
                      <div>Email: {Lead?.email}</div>{" "}
                      <div>Phone: {Lead?.phone}</div>
                    </div>
                  </div>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Order Details</div>
                    <div className="flex  flex-col  gap-2 p-2 justify-around">
                      {Lead?.genre_name && <div>Genre: {Lead?.genre_name}</div>}
                      {Lead?.course_name && (
                        <div>Course: {Lead?.course_name}</div>
                      )}
                      {Lead?.teacher_name && (
                        <div>Teacher: {Lead?.teacher_name}</div>
                      )}
                      {Lead?.time_pref && (
                        <div>Time Preference: {Lead?.time_pref}</div>
                      )}
                    </div>
                  </div>
                  <div className="border-2 border-white m-2 flex flex-col gap-5 p-2">
                    <div className="md:text-lg">Payment Details</div>
                    <div className="flex flex-col  gap-2 p-2 justify-around">
                      {Lead?.currency && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Currency:</div> <div> {Lead?.currency}</div>
                        </div>
                      )}
                      {Lead?.fee_pc && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Fee Per Class:</div> <div> {Lead?.fee_pc}</div>
                        </div>
                      )}
                      {Lead?.no_classes && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Number of Classes:</div>{" "}
                          <div> {Lead?.no_classes}</div>
                        </div>
                      )}
                      {Lead?.fee_pc && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Total Fees:</div>{" "}
                          {/* <div className="line-through"> {Lead?.fee_pc * Lead?.no_classes}</div> */}
                          <div > {Number(Lead?.fee_pc * Lead?.no_classes).toFixed(2)}</div>
                        </div>
                      )}
                      {Lead?.discount && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Discount:</div>
                          <div > { Lead?.discount}</div>
                        </div>
                      )}
                      {Lead?.fee_total && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Fees Paid:</div>
                          <div > { Number(Lead?.fee_total).toFixed(2)}</div>
                        </div>
                      )}
                      {Lead?.invitation?.order?.payment_order_id && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Order ID:</div>
                          <div > { Lead?.invitation?.order?.payment_order_id}</div>
                        </div>
                      )}
                      {Lead?.invitation?.order?.payment_id && (
                        <div className="flex justify-between">
                          {" "}
                          <div>Transaction ID:</div>
                          <div > { Lead?.invitation?.order?.payment_id}</div>
                        </div>
                      )}
                      
                     
                    </div>
                  </div>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );

 
};
