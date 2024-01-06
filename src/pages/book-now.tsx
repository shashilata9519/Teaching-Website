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
import { AiFillStar } from "react-icons/ai";
import student1 from "../assets/Ellipse 19.png";

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
  const [Location, SetLocation] = React.useState<any>([]);

  const {
    setModalOpen,

    setModalData,
    modalData,
    setFilter,
    bookNowModal,

    setSelectedOptions,
  }: any = useModal();
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/location`)
      .then((response) => {
        // console.log(response?.data?.data, "location");
        localStorage.setItem("location", JSON.stringify(response?.data?.data));
        SetLocation(JSON.parse(response?.data?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let [SuccessState, setSuccessState] = useState<any>({
    isOpen: false,
    type: null,
  });

  const successHandler = async () => {
    //call Api
    setmodalState({
      isOpen: false,
      type: null,
    });
    setSuccessState({
      isOpen: false,
      type: null,
    });

    router.push("/");
  };
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const schema: any = yup.object().shape({
    fullName: yup.string().required("full Name is required"),
    PhoneNumber: yup
      .string()
      .required("Phone is required")
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      }),
    email: yup.string().email("Invalid email").required("Email is required"),
    subcategory: yup.string().required("Course is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });
  const fullNameMsg: any = errors?.fullName && errors?.fullName?.message;
  const courseMsg: any = errors?.subcategory && errors?.subcategory?.message;
  const PhoneNumberMsg: any =
    errors?.PhoneNumber && errors?.PhoneNumber?.message;
  const emailMsg: any = errors?.email && errors?.email?.message;
  const onSubmit = (data: any) => {
    let fdata = new FormData();
    fdata.append("name", data.fullName);
    fdata.append("phone", data.PhoneNumber);
    fdata.append("email", data.email);
    fdata.append("url", `/book-now-d-${data?.subcategory}`);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquery`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: fdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSuccessState({
          isOpen: true,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const initialTime = 2 * 60 * 60; // 2 hours in seconds
  const [timeLeft, setTimeLeft] = useState<any>(initialTime);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  // console.log(formatTime(timeLeft), "time ");

  function modalHandler({ type }: any) {
    console.log(type, "type");
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }
  const [allGenre, setGenre] = useState([]);
  React.useEffect(() => {
    (async () => {
      const data = await Repo?.getGenre();
      data?.length > 0 && setGenre(data);
    })();
  }, []);

  // console.log(allGenre, "allGenre");
  const [openModal, setOpenModal] = React.useState(false);
  const applyHandler = () => {
    // setFilter({ subcategory: genre });
    setModalData({
      ...modalData,
      Genre: "",
      Courses: "",
      Fees: "",
      Teachers: "",
      Timeslot: "",
    });

    setOpenModal(true);
  };

  return (
    <>
      <Head>
        {" "}
        <title>Xcool: Book Classes</title>
      </Head>
      <Link
        href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
        target="__blank"
      >
        <div className=" mix-blend-difference fixed right-0 top-1/2 z-20 origin-bottom-right -rotate-90 bg-white text-xcool-new-blue py-1 px-2 rounded-md border-xcool-green hover:border-xcool-yellow border hover:text-xcool-yellow ">
          <p>Chat with us!</p>
        </div>
      </Link>
      <div className="w-full bg-neutral-950 relative">
        <div className="w-full  h-screen flex flex-col ">
          <div className="w-full h-[50%] md:h-[90%] flex">
            <div className="w-3/4 md:w-5/12 bg-white relative order-2 rounded-md">
              <div className="w-full p-4 md:py-10 md:px-10">
                <div className="w-full text-black text-sm md:text-lg uppercase gap-4 flex justify-center items-center">
                  <Link
                    href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
                    target="__blank"
                    className="md:p-2 cursor-pointer"
                  >
                    Contact us
                  </Link>
                  <button
                    onClick={applyHandler}
                    className="bg-black rounded-md text-white uppercase md:px-5 p-1 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
              {/* <Image
                width={500}
                height={500}
                alt="learn music"
                className="absolute -left-1/4 md:w-full w-screen my-10 md:my-2"
                src="/banner-2.png"
              /> */}
              <Image
                width={500}
                height={500}
                // fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="learn music"
                className="relative"
                src="/bannerpic.png"
              />
              {/* <img className="absolute -left-1/4 w-full" src={`/bg_image.png`}/> */}
            </div>
            <div className="w-1/4 md:w-7/12 order-1 z-10">
              <div className="w-full h-full p-4 md:py-10 md:px-10 flex justify-center items-center">
                <div className="w-1/3 md:w-1/2 md:my-10 md:px-10 absolute top-3 left-1 md:top-0 md:left-0">
                  <Logo className="z-10" />
                </div>
                <div className="hidden md:block">
                  <p className="md:text-4xl lg:text-5xl z-10 text-gray-100 font-bold mix-blend-difference">
                    India’s only online platform that offers all forms of vocal
                    and musical training!
                    <br />{" "}
                  </p>
                  <p className="md:text-lg lg:text-xl z-10 text-white w-3/4 md:w-3/4 my-4">
                    These action-packed ONLINE classes will teach you with a
                    diverse range of musical courses that turns you into an
                    expert even if you are beginner.
                  </p>
                  <button
                    onClick={applyHandler}
                    className=" h-10 bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-lg md:text-2xl text-white px-5 my-2"
                  >
                    Reserve Your Spot
                  </button>
                  <div className=" text-white mt-10 flex">
                    <div className="offered-by-panel px-2 text-sm flex items-center text-xcool-new-blue">
                      <div className="flex flex-wrap px-2 items-center relative ">
                        {/* <img
                          // key={item?.id}
                          // src={require('../assets/Ellipse 19.png')}
                          src="../assets/Ellipse.png"
                          className=" rounded-full w-10 h-20 w-20 border border-xcool-yellow "
                          style={{ marginLeft: "-8px" }}
                        /> */}
                        <Image
                          width={20}
                          height={20}
                          alt="learn music"
                          className="rounded-full h-16 w-16 border border-xcool-yellow "
                          src="/student-2.png"
                        />
                        <Image
                          width={20}
                          height={20}
                          alt="learn music"
                          className="rounded-full h-16 w-16 border border-xcool-yellow "
                          src="/student-3.png"
                        />
                        <Image
                          width={20}
                          height={20}
                          alt="learn music"
                          className="rounded-full h-16 w-16 border border-xcool-yellow "
                          src="/student-4.png"
                        />

                        {/* <img
                          // key={item?.id}
                          src={
                            "https://xcool.s3.ap-south-1.amazonaws.com/docs/M2.png"
                          }
                          className=" rounded-full w-10 h-20 w-20 border border-xcool-yellow"
                          style={{ marginLeft: "-8px" }}
                        />
                        <img
                          // key={item?.id}
                          src={
                            "https://xcool.s3.ap-south-1.amazonaws.com/docs/M1.png"
                          }
                          className=" rounded-full w-10 h-20 w-20 border border-xcool-yellow"
                          style={{ marginLeft: "-8px" }}
                        /> */}
                        {/* <div className="ml-2">{count > 3 ? count : ""}</div> */}
                      </div>
                    </div>
                    <div>
                      <div className=" flex">
                        <p className=" text-yellow-400">
                          <AiFillStar />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar />
                        </p>{" "}
                        <p className=" text-yellow-400">
                          <AiFillStar />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar />
                        </p>
                      </div>
                      <p className=" text-white">(5/5 from 200+ users)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden block h-[40%] p-2">
            <div className="">
              <p className="text-3xl text-white z-10 font-bold">
                India’s only online platform that offers all forms of vocal and
                musical training!
              </p>
              <p className="text-md text-white z-10">
                These action-packed ONLINE classes will teach you with a diverse
                range of musical courses that turns you into an expert even if
                you are beginner.
              </p>
              <button
                onClick={applyHandler}
                className=" h-10 text-[22px] bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-8 mt-4"
              >
                Reserve Your Spot
              </button>
              <div className=" text-white mt-10 mb-11 flex">
                <div className="offered-by-panel px-2 text-sm flex items-center text-xcool-new-blue">
                  <div className="flex flex-wrap px-2 items-center relative ">
                    <img
                      // key={item?.id}
                      src={
                        "https://xcool.s3.ap-south-1.amazonaws.com/docs/M1.png"
                      }
                      className=" rounded-full w-10 h-10 border border-xcool-yellow "
                      style={{ marginLeft: "-8px" }}
                    />
                    <img
                      // key={item?.id}
                      src={
                        "https://xcool.s3.ap-south-1.amazonaws.com/docs/M2.png"
                      }
                      className=" rounded-full w-10 h-10 border border-xcool-yellow"
                      style={{ marginLeft: "-8px" }}
                    />
                    <img
                      // key={item?.id}
                      src={
                        "https://xcool.s3.ap-south-1.amazonaws.com/docs/M1.png"
                      }
                      className=" rounded-full w-10 h-10 border border-xcool-yellow"
                      style={{ marginLeft: "-8px" }}
                    />
                    {/* <div className="ml-2">{count > 3 ? count : ""}</div> */}
                  </div>
                </div>
                <div>
                  <div className=" flex">
                    <p className=" text-yellow-400">
                      <AiFillStar />
                    </p>
                    <p className=" text-yellow-400">
                      <AiFillStar />
                    </p>
                    <p className=" text-yellow-400">
                      <AiFillStar />
                    </p>{" "}
                    <p className=" text-yellow-400">
                      <AiFillStar />
                    </p>
                    <p className=" text-yellow-400">
                      <AiFillStar />
                    </p>
                  </div>
                  <p className=" text-white text-xs">(5/5 from 200+ users)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed w-full bottom-0 bg-black font-bold z-10 h-[10%] flex justify-around items-center text-sm md:text-2xl lg:px-20 mt-16 md:mt-0">
          <div className="flex flex-col text-white justify-center">
            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="md:text-2xl text-lg bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-2 md:px-5 my-2 py-1"
            >
              {/* Grab your spot Now ! */}
              <div className="text-white tracking-widest font-bold">
                {formatTime(timeLeft)}
              </div>
            </button>
            <span className="text-sm">Limited Time Offer !</span>
          </div>
          <div className=" text-white md:block hidden">
            🎉 Now book 2 classes for just Rs.98! Limited time offer!
          </div>

          <button
            onClick={applyHandler}
            className="bg-gradient-to-r text-lg md:text-2xl from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-2 md:px-5 my-2 py-1"
          >
            Book Now !
          </button>
        </div>
        <div className="bg-neutral-950 md:my-10 mx-5 md:mx-10 mt-28">
          <div className="container mx-auto">
            <span className="text-slate-500 text-[25px] font-bold">
              Explore
            </span>
            <span className="text-black text-[25px] font-bold"> </span>
            <span className="text-white text-[25px] font-bold">
              By Category
            </span>
          </div>
          <div className="w-full md:w-fit grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1 grid-flow-row auto-rows-auto gap-5 mx-auto p-10 bg-[url('/music_waves.png')]">
            <div className=" m-2 rounded-md p-4 md:max-w-md w-full bg-sky-200">
              <div className="text-black text-xl font-bold">Vocal</div>
              <div className="text-black text-lg font-normal">
                Bollywood Vocal, <br />
                Indian Light Music Vocal, <br />
                Hindustani Semi Classical Vocal, <br />
                Western Vocal & <br />
                More...
              </div>
            </div>
            <div className=" m-2 rounded-md p-4 md:max-w-md w-full bg-orange-200">
              <div className="text-black text-xl font-bold">
                Hindustani Classical
              </div>
              <div className=" text-black text-lg font-normal">
                Hindustani Classical Vocal, <br />
                Tabla, <br />
                Flute & <br />
                More...
              </div>
            </div>
            <div className=" m-2 rounded-md p-4 md:max-w-md w-full bg-teal-300">
              <div className=" text-black text-xl font-bold">Instrumental</div>
              <div className="text-black text-lg font-normal">
                Guitar,
                <br />
                Piano & Keyboard,
                <br />
                Violin & <br />
                More...
              </div>
            </div>
            <div className=" m-2 rounded-md p-4 md:max-w-md w-full bg-red-300">
              <div className=" text-black text-xl font-bold">
                Carnatic Classical
              </div>
              <div className="text-black text-lg font-normal">
                Carnatic Violin, <br />
                Carnatic Vocal, <br />
                Veena & <br />
                More...
              </div>
            </div>

            <div className=" m-2 rounded-md p-4 md:max-w-md w-full bg-rose-100">
              <div className="text-black text-xl font-bold">
                Classical Dance
              </div>
              <div className="text-black text-lg font-normal">
                Kuchipudi, <br />
                Bharatanatyam & <br />
                More...
              </div>
            </div>
          </div>
        </div>

        <div className="w-fit hidden md:block mx-auto my-10 md:my-20">
          <TablaVectorDark />
        </div>
        <div className="w-fit md:hidden mx-auto my-5">
          <Shape4 />
        </div>

        <div className="flex container mx-auto flex-col md:flex-row md:mt-5">
          <div className="w-full md:w-1/2 grid grid-cols-6 auto-rows-auto gap-3 order-2 md:order-1 px-4  md:mx-10 h-fit">
            <div className="col-span-2  bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill  w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M1.png"}
                alt=""
              />
              {/* <p className=" absolute bottom-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Swaroop kumar
              </p> */}
            </div>
            <div className="col-span-2 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M2.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 right-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Shailendra Mishra
              </p> */}
            </div>
            <div className="col-span-2  bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M3.png"}
                alt=""
              />
              {/* <p className=" absolute bottom-2 right-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Asavari Puranik
              </p> */}
            </div>
            <div className="col-span-3 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M4.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p> */}
            </div>
            <div className="col-span-3 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M5.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p> */}
            </div>
            <div className="col-span-2 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M6.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p> */}
            </div>
            <div className="col-span-2 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M7.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p> */}
            </div>
            <div className="col-span-2 bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"https://xcool.s3.ap-south-1.amazonaws.com/docs/M8.png"}
                alt=""
              />
              {/* <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p> */}
            </div>
          </div>
          <div className="w-full md:w-1/2  order-1 md:order-2 flex flex-col justify-center px-4 mx-2  md:mx-10">
            <div className="my-5 text-red-400 md:text-3xl text-2xl lg:text-4xl font-bold">
              Teachers
            </div>
            <div className="text-white text-xl font-normal">
              Our meticulously curated teachers are a culmination of artistry
              and experience, tailored to match your unique learning needs.
              Having not only learned from the experts of the fields, they have
              also collaborated with acclaimed maestros and rockstars. These
              internationally celebrated TRUE GURUS bring you unparalleled
              excellence, making your learning journey truly exceptional.
            </div>
            <div className="relative">
              <button
                onClick={() => router.push("/teacher")}
                className="bg-gradient-to-r from-red-500 via-red-500 to-red-500 rounded-[10px] flex items-center text-white  text-lg font-bold w-fit px-5 p-2 my-5"
              >
                <span>Learn More</span>{" "}
                <span className=" ms-3">
                  {" "}
                  <BsArrowRight />{" "}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex container mx-auto flex-col md:flex-row md:my-3 ">
          <div className="w-full md:w-1/2 h-1/2 order-2 hidden md:grid grid-cols-2 auto-rows-auto gap-5 p-4 md:mx-10 text-xl align-middle	justify-center content-center justify-items-center	">
            <div className="px-4 py-8 border bg-white text-black font-bold rounded-lg mt-8 ml-8">
              "Wow, learning at Xcool was totally awesome! The teachers were
              super nice and helped me get better at music really fast!"
            </div>
            <div className="p-4 border bg-white text-black font-bold rounded-lg align-middle	flex justify-center items-center">
              <span className="inline-block align-middle">
                "I had so much fun learning with Xcool! They planned the lessons
                really well, so I'm getting really good at the basics"
              </span>
            </div>
            <div className="p-4 border bg-white text-black font-bold rounded-lg flex justify-center items-center">
              <span className="inline-block align-middle">
                "Attending online classes at Xcool has been a game-changer for
                me! The teachers know everything about music and they're like
                our friends, always cheering for us!"
              </span>
            </div>
            <div className="p-4 border bg-white text-black font-bold rounded-lg mb-8 mr-8">
              "Signing up for Xcool was like the best idea ever! Plus, with the
              flexibility of online learning, I could learn music and still have
              time for other stuff."
            </div>
          </div>
          <div className="w-full grid-cols-2 grid order-2 md:hidden p-2 gap-1 auto-rows-auto text-[10px]">
            <div className="  border bg-white text-black font-bold rounded-lg p-2 ">
              "Wow, learning at Xcool was totally awesome! The teachers were
              super nice and helped me get better at music really fast!"
            </div>
            <div className="  border bg-white text-black font-bold rounded-lg  p-2 ">
              "I had so much fun learning with Xcool! They planned the lessons
              really well, so I'm getting really good at the basics"
            </div>
            <div className="border bg-white text-black font-bold rounded-lg  p-2">
              "Attending online classes at Xcool has been a game-changer for me!
              The teachers know everything about music and they're like our
              friends, always cheering for us!"
            </div>
            <div className="  border bg-white text-black font-bold rounded-lg p-2">
              "Signing up for Xcool was like the best idea ever! Plus, with the
              flexibility of online learning, I could learn music and still have
              time for other stuff."
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 flex flex-col justify-center px-4 mx-2 md:px-20 md:mx-10">
            <div className="my-5 text-orange-300 text-2xl md:text-3xl lg:text-4xl  font-bold">
              Students
            </div>
            <div className="text-white text-xl font-normal">
              Our vibrant community comprises students spanning all ages, from
              eager kids to seasoned working professionals, hailing from diverse
              corners of the world. With skill levels ranging from budding
              beginners to advanced practitioners, exploring genres as varied as
              Western to Classical traditions, our flexible scheduling and cost
              options ensure that every student's unique journey finds its
              perfect fit.
            </div>
            <div className="relative">
              <button
                onClick={() => router.push("/learn/Music")}
                className="bg-gradient-to-r from-orange-300 via-orange-300 flex items-center justify-between to-orange-300 rounded-[10px] text-white text-lg font-bold w-fit px-5 p-2 my-5"
              >
                <span> View All Courses </span>
                <span className=" ms-3">
                  {" "}
                  <BsArrowRight />{" "}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full text-white text-center">
          <div className="text-center  text-2xl md:text-4xl font-bold mt-10">
            Start your creative journey today with these easy steps-
          </div>
          <div className="grid container mx-auto grid-cols-11 mb-20 mt-10">
            <div className="md:col-span-2"></div>
            <div className="md:col-span-3 col-span-11 md:mx-8 mx-2 flex">
              <div className=" md:hidden flex items-center">
                <Flute />
              </div>
              <div className="flex flex-col justify-around">
                <div className=" text-base md:text-3xl font-bold">
                  1. Select the Course
                </div>
                <div className="text-justify  text-sm md:text-lg font-bold">
                  Use the free form search bar or filters to find a course in
                  any art form you wish to learn. You can also browse top course
                  suggestions and top teacher profiles. Click on individual
                  course tabs to review details.
                </div>
                <div className=" text-base md:text-3xl font-bold mt-12 md:hidden block">
                  2. Select the Teacher
                </div>
                <div className="text-justify  text-sm md:text-lg font-bold md:hidden block">
                  Once you've found your desired course, find a teacher
                  available to teach it. Use filters to refine your search.
                  Click on the teacher's profile to see certifications,
                  experience, time slots, reviews, and other courses offered.
                </div>

                <div className=" text-base md:text-3xl font-bold mt-12">
                  3. Send Application
                </div>
                <div className="text-justify  text-sm md:text-lg font-bold">
                  Fill out the application form to enrol in the course. Indicate
                  your preferred time slots or request a specific timing. Share
                  additional information about yourself. Track the status of
                  your application in the 'My Classes' tab.
                </div>
                <div className=" text-base md:text-3xl font-bold mt-12 md:hidden block">
                  4. Make Payments
                </div>
                <div className="text-justify  text-sm md:text-lg font-bold md:hidden block">
                  After your application is reviewed by the teacher, you may be
                  asked for additional information. Upon acceptance, you'll
                  receive a class schedule and payment link. Once payment is
                  made, your classes are confirmed and will be in your calendar.
                </div>

                <div className=" text-base md:text-3xl font-bold mt-12">
                  5. Join the Class
                </div>
                <div className="text-justify  text-sm md:text-lg font-bold">
                  Login into your account, go to calendar and select the class
                  which you wish to join
                </div>
              </div>
            </div>
            <div className=" md:block hidden">
              <Flute />
            </div>

            <div className="md:col-span-3 col-span-10 mx-8 md:flex hidden  flex-col justify-around my-20">
              <div className=" text-xl md:text-3xl font-bold mt-12">
                2. Select the Teacher
              </div>
              <div className="text-justify  text-base md:text-lg font-bold">
                Once you've found your desired course, find a teacher available
                to teach it. Use filters to refine your search. Click on the
                teacher's profile to see certifications, experience, time slots,
                reviews, and other courses offered.
              </div>
              <div className=" text-xl md:text-3xl font-bold mt-12">
                4. Make Payments
              </div>
              <div className="text-justify  text-base md:text-lg font-bold">
                After your application is reviewed by the teacher, you may be
                asked for additional information. Upon acceptance, you'll
                receive a class schedule and payment link. Once payment is made,
                your classes are confirmed and will be in your calendar.
              </div>
            </div>
            <div className="md:col-span-2"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5  mx-auto justify-center font-semibold w-full md:w-3/4  text-xl">
            <button
              onClick={applyHandler}
              className="px-5 md:px-16 py-2 text-center text-lg md:text-2xl bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px]"
            >
              Book Now
            </button>
            {/* <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="hidden px-5 md:px-16 py-2 bg-gradient-to-l from-orange-300 text-center text-lg md:text-2xl via-orange-200 to-orange-100 rounded-[10px]"
            >
              Contact Us
            </button>
            <button
              onClick={() => router.push("/learn/Music")}
              className=" hidden px-5 md:px-16 py-2 bg-gradient-to-l from-red-300 via-red-400 text-lg md:text-2xl text-center to-red-500 rounded-[10px]"
            >
              Explore More
            </button> */}
          </div>
        </div>

        <div className="bg-natural-950 hidden md:flex md:flex-row my-10 md:my-20 px-5 md:px-20 py-8 justify-center items-center text-center">
          <div className="text-white font-bold text-3xl w-1/3">
            Get Your Hands On <br />
            The Best Courses <br />
            Offered Right Now.
          </div>
          <div className="shadow-zinc-800 ">
            <div className="text-zinc-100 text-[41px]  bg-black rounded-2xl w-fit px-10 py-5 shadow-xl shadow-white ">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="flex flex-col w-1/3 justify-center items-center gap-2 text-white text-3xl">
            {/* <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="text-white font-bold bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500  w-fit text-lg md:text-2xl px-5 py-2 rounded-[10px] hover:bg-xcool-new-blue-hover transition-all duration-200"
            >
              Apply Now !
            </button> */}
            <div className="text-white text-3xl font-bold">
              Before It’s Too Late !
            </div>
            <div className="text-center leading-3">
              <span className="text-white text-base font-normal">Note</span>
              <span className="text-white text-base font-light leading-3">
                - Limited Seats Available.
                <br />
                Enroll before seats fill out*
              </span>
            </div>
          </div>
        </div>
        <div className="flex container mx-auto flex-col md:flex-row my-10">
          <div className="hidden w-full md:w-1/2 md:mx-10 text-white">
            <div className="text-2xl mx-2 md:text-3xl font-bold ">
              Secure Your Last Spot
            </div>
            <ThemeProvider theme={theme}>
              {/* <form
                className=" flex flex-col gap-4 mx-3 text-white"
                onSubmit={handleSubmit(onSubmit)}
              >
                <>
                  <TextField
                    InputLabelProps={{
                      className: "text-white ",
                    }}
                    id="standard-basic"
                    label="Full name"
                    variant="standard"
                    className=" mt-4 text-white bg-[ochre.light] border-white"
                    {...register("fullName")}
                    InputProps={{
                      className: "text-white ",
                    }}
                    // sx={{ color: "ochre.light" }}
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
                    className=" mt-4 text-white bg-[ochre.light] border-white"
                    InputLabelProps={{
                      className: "text-white ",
                    }}
                    InputProps={{
                      className: "text-white ",
                    }}
                    {...register("PhoneNumber")}
                    // sx={{ color: "ochre.light", bgcolor: "ochre.light" }}
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
                    className=" mt-4 text-white bg-[ochre.light] border-white"
                    InputLabelProps={{
                      className: "text-white ",
                    }}
                    InputProps={{
                      className: "text-white ",
                    }}
                    {...register("email")}
                    // sx={{ color: "ochre.light", bgcolor: "ochre.light" }}
                  />
                  {emailMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {emailMsg}
                    </p>
                  )}
                  <div>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      label="Interested Course"
                      className="mt-4 w-full text-white bg-[ochre.light] border-white py-3"
                      defaultValue={"Interested Course"}
                      {...register("subcategory")}
                      MenuProps={{
                        style: { maxHeight: 200 },
                      }}
                      // InputLabelProps={{
                      //   className:'text-white ',
                      // }}
                    >
                      <MenuItem value={"Interested Course"}>
                        Interested Course
                      </MenuItem>

                      {[...allGenre]?.map(
                        (subc: any, index: React.Key | null | undefined) => {
                          // console.log(subc)
                          return (
                            <MenuItem
                              key={index}
                              className=" text-sm"
                              value={subc.slug}
                            >
                              {subc.subcategory}
                            </MenuItem>
                          );
                        }
                      )}
                    </Select>
                  </div>

                  {courseMsg && (
                    <p className=" text-red-600 text-center text-xs">
                      {courseMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="text-white my-4 py-2 px-5 text-lg md:text-2xl  rounded-xl mx-auto hover:text-black bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 "
                  >
                    Submit
                  </button>
                  <div className="text-sm text-center text-white mb-4">
                    Note: Limited Seats Available. <br /> Selection on First
                    Come First Serve Basis. <br />
                    Hurry Up !
                  </div>
                </>
              </form> */}
            </ThemeProvider>
          </div>
          <div className="w-full md:w-full bg-white text-black flex flex-col gap-3 justify-center items-center md:ml-auto rounded-lg">
            <div className="text-sm md:text-3xl font-bold text-center p-5">
              5 Days Remaining. <br />
              Applications Closes on “
              {new Date(
                new Date().getTime() + 5 * 24 * 60 * 60 * 1000
              ).toDateString()}
              ” <br />
              Grab The Seats Now !!
            </div>
            <div className="bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500  text-white text-xl md:text-4xl font-bold rounded-md p-1 md:py-2 md:px-5 ">
              Limited Time Offer !
            </div>
            <div className="grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 my-10 gap-4 mx-auto px-4">
              <div className="flex items-center">
                {" "}
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0007 2.25C7.58398 2.25 2.33398 7.3125 2.33398 13.5C2.33398 19.6875 7.58398 24.75 14.0007 24.75C20.4173 24.75 25.6673 19.6875 25.6673 13.5C25.6673 7.3125 20.4173 2.25 14.0007 2.25ZM11.6673 19.125L5.83398 13.5L7.47898 11.9137L11.6673 15.9412L20.5223 7.4025L22.1673 9L11.6673 19.125Z"
                    fill="#0D0D0D"
                  />
                </svg>
                <span className="text-lg md:text-xl lg:text-2xl">
                  1:1 Personalized Training
                </span>
              </div>
              <div className="flex items-center">
                {" "}
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0007 2.25C7.58398 2.25 2.33398 7.3125 2.33398 13.5C2.33398 19.6875 7.58398 24.75 14.0007 24.75C20.4173 24.75 25.6673 19.6875 25.6673 13.5C25.6673 7.3125 20.4173 2.25 14.0007 2.25ZM11.6673 19.125L5.83398 13.5L7.47898 11.9137L11.6673 15.9412L20.5223 7.4025L22.1673 9L11.6673 19.125Z"
                    fill="#0D0D0D"
                  />
                </svg>
                <span className="text-lg md:text-xl lg:text-2xl">
                  Indian Renowned Instructors
                </span>
              </div>
              <div className="flex items-center">
                {" "}
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0007 2.25C7.58398 2.25 2.33398 7.3125 2.33398 13.5C2.33398 19.6875 7.58398 24.75 14.0007 24.75C20.4173 24.75 25.6673 19.6875 25.6673 13.5C25.6673 7.3125 20.4173 2.25 14.0007 2.25ZM11.6673 19.125L5.83398 13.5L7.47898 11.9137L11.6673 15.9412L20.5223 7.4025L22.1673 9L11.6673 19.125Z"
                    fill="#0D0D0D"
                  />
                </svg>
                <span className="text-lg md:text-xl lg:text-2xl">
                  Best For Beginners
                </span>
              </div>
              <div className="flex items-center">
                {" "}
                <svg
                  width="28"
                  height="27"
                  viewBox="0 0 28 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0007 2.25C7.58398 2.25 2.33398 7.3125 2.33398 13.5C2.33398 19.6875 7.58398 24.75 14.0007 24.75C20.4173 24.75 25.6673 19.6875 25.6673 13.5C25.6673 7.3125 20.4173 2.25 14.0007 2.25ZM11.6673 19.125L5.83398 13.5L7.47898 11.9137L11.6673 15.9412L20.5223 7.4025L22.1673 9L11.6673 19.125Z"
                    fill="#0D0D0D"
                  />
                </svg>
                <span className="text-lg md:text-xl lg:text-2xl">
                  Comprehensive Curriculum
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" md:flex md:flex-row my-10 md:my-20 px-5 md:px-20 py-8 justify-center items-center text-center font-bold">
          <div className="flex flex-col w-full justify-center flex-wrap items-center gap-2 text-white text-3xl">
            <div className="text-white text-3xl">Our Exclusive Offers -</div>
            <div className="text-sky-800 text-3xl animate-pulse bg-white border-sky-800 border-2 px-24 rounded-md py-2 font-bold md:block hidden w-2/3">
              Book Now & Get 20% Off
              {/* + Get a Learning E-Book Free ! */}
            </div>
            <div className="text-sky-800 text-3xl animate-pulse bg-white border-sky-800 border-2 px-8 rounded-md py-2 font-bold md:hidden block">
              Book Now & Get 20% Off
              {/* <br /> + <br />
              Get a Learning E-Book Free ! */}
            </div>

            <div className="flex justify-around  flex-wrap font-bold md:w-2/3">
              <div className="text-white text-3xl font-normal">
                Offer Valid for Next 2 Hours Only !!{" "}
              </div>
              <div className="text-white text-3xl tracking-widest font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`text-2xl md:text-3xl font-semibold text-center my-3 text-sky-200`}
        >
          Frequently Asked Questions
        </div>
        <div className="py-10 container mx-auto  md:px-28">
          <ThemeProvider theme={theme}>
            {faqData?.map((i: any, index: any) => {
              return (
                <Accordion
                  expanded={expanded === `panel${i?.id}`}
                  onChange={handleChange(`panel${i?.id}`)}
                  key={index}
                  className=" rounded-lg my-2"
                >
                  <AccordionSummary
                    expandIcon={<FaChevronDown className=" text-white" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="text-white  bg-cyan-950 rounded-lg"
                  >
                    <Typography className=" font-bold  text-lg md:text-xl">
                      {i?.que}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className=" bg-xcool-new-blue text-white rounded-lg">
                    <Typography className="text-lg  md:text-xl">
                      {i?.ans}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </ThemeProvider>
        </div>
      </div>

      <Footer />

      {openModal && <SideBarBookNow setOpenModal={setOpenModal} />}

      {SuccessState.type === "success" && (
        <GenericModal
          modalState={SuccessState}
          title={"Booking Successful"}
          content1={
            "Your application has been sent, we will contact you shortly."
          }
          successText={"Ok"}
          rejectionText={"Close"}
          setmodalState={successHandler}
          successCb={successHandler}
        />
      )}
    </>
  );
};
