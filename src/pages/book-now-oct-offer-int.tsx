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
import { FaChevronDown, FaMusic } from "react-icons/fa";
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
import CircleShape from "@/assets/circleShape";
import { stepData } from "@/common/StepsContent";
import { CourseStep } from "@/components/Card/CourseStep";
import SideBarBookNowInt from "@/components/SideBarBookNowInt";

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

  const [feeValue, setfeeValue] = useState("$8");
  

  return (
    <>
      <Head>
        {" "}
        <title>Xcool: Book Classes</title>
      </Head>
      <div className="bg-black w-full px-3">
        <Link
          href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
          target="__blank"
        >
          <div className=" mix-blend-difference fixed right-0 top-1/2 z-20 origin-bottom-right -rotate-90 bg-white text-xcool-new-blue py-1 px-2 rounded-md border-xcool-green hover:border-xcool-yellow border hover:text-xcool-yellow ">
            <p>Chat with us!</p>
          </div>
        </Link>
        <div className="flex gap-1 px-0 md:px-10 bg-black py-6 justify-between items-center">
          <div className=" ">
            <Logo className="z-10" />
          </div>

          <div className=" flex text-white  text-sm md:text-lg gap-4">
            <Link
              href="/about"
              target="__blank"
              className="md:p-2 cursor-pointer"
            >
              About us
            </Link>
            <Link
              href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
              target="__blank"
              className="md:p-2 cursor-pointer"
            >
              Contact us
            </Link>
            {/* <button
            onClick={applyHandler}
            className="bg-black rounded-md text-white uppercase md:p-2 cursor-pointer"
          >
            Book Now
          </button> */}
          </div>
          {/* <Image
                width={500}
                height={500}
                alt="learn music"
                className="absolute -left-1/4 md:w-full w-screen my-10 md:my-2"
                src="/banner-2.png"
              /> */}
        </div>
        <div className="w-full bg-black relative">
          <div className="w-full flex flex-col container mx-auto">
            <div className=" flex justify-between">
              <div className=" z-10">
                <div className=" p-4 md:py-10 px-1 md:px-10 flex justify-center items-center">
                  <div className=" block">
                    <p className=" text-xl md:text-4xl z-10 text-gray-100 font-medium  mix-blend-difference text-center my-3">
                      India’s only online platform that offers all forms of{" "}
                      <br />{" "}
                    </p>
                    <p className=" text-xcool-new-blue text-center text-2xl md:text-5xl font-bold">
                      Vocal and Instrumental training!
                    </p>
                    <br />
                    <p className="md:text-lg lg:text-xl text-lg z-10 text-white md:mx-44  text-center font-normal leading-loose my-16">
                      Explore our action-packed ONLINE classes, designed for all
                      ages and skill levels. Whether you aim to become an expert
                      or simply enjoy music, our diverse range of courses caters
                      to everyone!
                    </p>
                    <div className=" flex justify-center items-center flex-wrap my-8">
                      <button
                        onClick={applyHandler}
                        className="px-11 py-4 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex text-center text-white text-lg font-bold"
                      >
                        Reserve Your Spot
                      </button>
                      <div className=" text-white flex flex-wrap md:mt-0 mt-4">
                        <div className="offered-by-panel px-2 text-sm flex items-center text-xcool-new-blue">
                          <div className="flex flex-wrap px-2 items-center relative ">
                            <Image
                              width={20}
                              height={20}
                              alt="learn music"
                              className="rounded-full h-16 w-16 border border-white "
                              src="/student-2.png"
                            />
                            <Image
                              width={20}
                              height={20}
                              alt="learn music"
                              className="rounded-full h-16 w-16 border border-white "
                              src="/student-3.png"
                            />
                            <Image
                              width={20}
                              height={20}
                              alt="learn music"
                              className="rounded-full h-16 w-16 border border-white "
                              src="/student-4.png"
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" flex">
                        <p className=" text-yellow-400 text-lg">
                          <AiFillStar size={30} />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar size={30} />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar size={30} />
                        </p>{" "}
                        <p className=" text-yellow-400">
                          <AiFillStar size={30} />
                        </p>
                        <p className=" text-yellow-400">
                          <AiFillStar size={30} />
                        </p>
                      </div>
                      <p className=" text-white text-xs">
                        (4.8/5 from 200+ users)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/4 mx-auto h-full p-5 md:p-1 md:h-96 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow md:flex my-16">
              <div className=" w-auto md:w-1/4 h-full flex flex-col md:ml-8 my-auto justify-around py-8">
                <div className="uppercase text-white text-2xl font-medium tracking-wide">
                  NOW BOOK <br />
                  <span className="font-bold">2 CLASSES FOR</span>
                </div>
                <div className=" md:hidden flex justify-between mt-6">
                  <div className="w-2/3 relative rounded-lg h-fit text-center shadow border-2 border-white border-dotted">
                    <Image
                      width={50}
                      height={50}
                      // fill={true}

                      alt="learn music"
                      className="absolute -left-8 -top-8"
                      src="/mdi_thunder.svg"
                    />
                    <div className="text-center my-auto flex flex-col p-3 justify-center items-center">
                      <span className="text-white text-3xl font-bold font-['Poppins']">
                        
                        {feeValue} only
                      </span>
                      <span className="text-white text-xl font-medium font-['Poppins']">
                        
                      </span>
                    </div>
                  </div>
                  <div className="w-1/3 md:hidden block relative">
                    <Image
                      width={200}
                      height={200}
                      // fill={true}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="learn music"
                      className="relative bottom-6"
                      src="/bannerpic-new.png"
                    />
                    <Image
                      width={100}
                      height={100}
                      // fill={true}

                      alt="learn music"
                      className="absolute -bottom-4 -right-8"
                      src="/mdi_music.svg"
                    />
                  </div>
                </div>
                <div className="text-white py-4 text-2xl my-3 md:my-auto font-medium flex-wrap bg-white bg-opacity-25 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex">
                  <span className="font-semibold text-4xl tracking-wide">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="font-bold text-sm">Limited Time Offer</span>
                </div>

                <div className="my-5 md:my-auto">
                  <button
                    onClick={applyHandler}
                    className="px-11 py-4 bg-white rounded-3xl shadow justify-center items-center gap-2.5 inline-flex text-center text-cyan-600 text-lg font-medium"
                  >
                    Book Now !
                  </button>
                </div>
              </div>
              <div className="md:w-2/4 w-auto hidden  h-full md:flex flex-col flex-wrap md:ml-8 my-auto justify-center items-center">
                <div className="md:w-96 w-auto h-52 px-6 py-2.5 rounded-lg shadow border-2 border-white border-dashed justify-center items-center gap-2.5 inline-flex relative">
                  <Image
                    width={100}
                    height={100}
                    // fill={true}

                    alt="learn music"
                    className="absolute -left-8 -top-8"
                    src="/mdi_thunder.svg"
                  />
                  <div className="text-center my-auto flex p-3 justify-center items-end">
                    <span className="text-white text-7xl font-bold font-['Poppins']">
                      

                      {feeValue} only
                    </span>
                    <span className="text-white text-6xl font-medium font-['Poppins']">
                    
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/4 w-auto hidden my-auto md:block relative">
                <Image
                  width={500}
                  height={500}
                  // fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="learn music"
                  className="relative bottom-14"
                  src="/bannerpic-new.png"
                />
                <Image
                  width={100}
                  height={100}
                  // fill={true}

                  alt="learn music"
                  className="absolute bottom-8 -right-4"
                  src="/mdi_music.svg"
                />
              </div>
            </div>
          </div>

          <div className="bg-stone-900 w-full py-10 px-2 rounded-md">
            <div className=" flex container mx-auto flex-col md:flex-row md:p-5 text-white items-center justify-center">
              <div className="w-full md:w-1/2 mx-auto flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <p className=" font-bold flex gap-2 items-center mb-2">
                    <span className=" text-xcool-new-blue">
                      <FaMusic />
                    </span>
                    <span className=" text-xl">Vocal</span>
                  </p>
                  <p className="text-base font-normal">
                    Bollywood Vocal, Indian Light Music Vocal, Hindustani Semi
                    Classical Vocal, Western Vocal & More...
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className=" font-bold flex gap-2 items-center mb-2">
                    <span className=" text-xcool-new-blue">
                      <FaMusic />
                    </span>
                    <span className=" text-xl">Hindustani Classical</span>
                  </p>
                  <p className="text-base font-normal">
                    Hindustani Classical Vocal, Tabla, Flute & More...
                  </p>
                </div>
                <div className="flex flex-col gap-3 ">
                  <p className=" font-bold flex gap-2 items-center mb-2">
                    <span className=" text-xcool-new-blue">
                      <FaMusic />
                    </span>
                    <span className=" text-xl">Instrumental</span>
                  </p>
                  <p className="text-base font-normal">
                    Guitar, Piano & Keyboard, Violin & More...
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className=" font-bold flex gap-2 items-center mb-2">
                    <span className=" text-xcool-new-blue">
                      <FaMusic />
                    </span>
                    <span className=" text-xl">Carnatic Classical</span>
                  </p>
                  <p className="text-base font-normal">
                    Carnatic Violin, Carnatic Vocal, Veena & More...
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className=" font-bold flex gap-2 items-center mb-2">
                    <span className=" text-xcool-new-blue">
                      <FaMusic />
                    </span>
                    <span className=" text-xl">Classical Dance</span>
                  </p>
                  <p className="text-base font-normal">
                    Kuchipudi, Bharatanatyam & More...
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 mx-auto my-4">
                <CircleShape />
              </div>
            </div>
          </div>
          <div className="w-full bg-black">
            <div className="flex container mx-auto flex-col md:flex-row md:my-16 bg-black">
              <div className="w-full md:w-1/2 order-1 md:order-2 px-4  md:mx-10 h-fit flex justify-end">
                <Image
                  width={500}
                  height={500}
                  // fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 45vw"
                  alt="learn music"
                  className="relative"
                  src="/teacher-banner-new.png"
                />
              </div>
              <div className="w-full md:w-1/2  order-2 md:order-1 flex flex-col justify-center ">
                <div className="my-5 text-xcool-new-blue md:text-4xl text-3xl lg:text-5xl font-bold">
                  Teachers
                </div>
                <div className="text-white  text-lg md:text-xl md:leading-loose font-base leading-9 ">
                  Our meticulously curated teachers are a culmination of
                  artistry and experience, tailored to match your unique
                  learning needs. Having not only learned from the experts of
                  the fields, they have also collaborated with acclaimed
                  maestros and rockstars. These internationally celebrated TRUE
                  GURUS bring you unparalleled excellence, making your learning
                  journey truly exceptional.
                </div>
                <div className="relative my-5">
                  <button
                    onClick={() => router.push("/teacher")}
                    className="px-11 py-4 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex"
                  >
                    <span className="text-center text-white text-lg font-bold ">
                      Learn More
                    </span>{" "}
                    {/* <span className=" ms-3">
                  {" "}
                  <BsArrowRight />{" "}
                </span> */}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="my-16 container mx-auto">
            <div className=" text-center  text-xcool-new-blue text-3xl md:text-4xl lg:text-5xl  font-bold">
              Students
            </div>
            <p className=" mt-10 text-left md:text-center p-1 text-white md:px-20 text-lg leading-9 md:leading-loose">
              Our vibrant community comprises students spanning all ages, from
              eager kids to seasoned working professionals, hailing from diverse
              corners of the world. With skill levels ranging from budding
              beginners to advanced practitioners, exploring genres as varied as
              Western to Classical traditions, our flexible scheduling and cost
              options ensure that every student's unique journey finds its
              perfect fit.
            </p>
            <div className=" grid md:grid-cols-4 gap-1 md:gap-7 grid-cols-1 mx-2 md:mx-20 mt-10">
              <div className="px-4 py-8 leading-8 border  bg-white text-zinc-800 font-normal rounded-lg">
                "Wow, learning at Xcool was totally awesome! The teachers were
                super nice and helped me get better at music really fast!"
              </div>
              <div className="px-4 py-8 leading-8 border  bg-white text-zinc-800 font-normal rounded-lg">
                "I had so much fun learning with Xcool! They planned the lessons
                really well, so I'm getting really good at the basics"{" "}
              </div>
              <div className="px-4 py-8 leading-8 border bg-white text-zinc-800 font-normal rounded-lg">
                "Attending online classes at Xcool has been a game-changer for
                me! The teachers know everything about music and they're like
                our friends, always cheering for us!"
              </div>
              <div className="px-4 py-8 leading-8 border bg-white text-zinc-800 font-normal rounded-lg">
                "Signing up for Xcool was like the best idea ever! Plus, with
                the flexibility of online learning, I could learn music and
                still have time for other stuff."
              </div>
            </div>
            <div className=" text-center my-10">
              <button
                onClick={() => router.push("/")}
                className="px-11 py-4 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow justify-center items-center gap-2.5 inline-flex"
              >
                <span className="text-center text-white text-lg font-bold ">
                  Learn More
                </span>{" "}
              </button>
            </div>
          </div>
          <div className="bg-stone-900 w-full px-2 rounded-md">
            <div className="container mx-auto text-white my-16">
              {/* <Header title="Start your creative journey today with these easy steps" /> */}
              <div className=" py-5 text-center  text-xcool-new-blue text-2xl md:text-3xl lg:text-4xl  font-bold">
                Start your creative journey today with these easy steps
              </div>

              <div className=" gap-2 text-white flex justify-center flex-wrap pb-5">
                {stepData?.map((item: any, index: any) => {
                  return (
                    <CourseStep
                      key={index}
                      step={item.step}
                      title={item.title}
                      intro={item.intro}
                      classstyle={" text-base mb-4 font-bold"}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="container mx-auto w-auto md:w-2/3 h-96 bg-gradient-to-br from-cyan-600 to-cyan-900 rounded-3xl shadow flex my-16">
            <div className="w-auto md:w-1/2 h-full flex flex-col p-5 md:ml-8 my-auto justify-around">
              <div className="uppercase text-white text-2xl font-medium ">
                Get Your Hands On <br />
                <span className="font-bold">
                  The Best Courses Offered Right Now.
                </span>
              </div>
              <div className="text-white py-4 text-2xl my-3 md:my-auto font-medium flex-wrap bg-white bg-opacity-25 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex">
                <span className="font-semibold text-4xl tracking-wide">
                  {formatTime(timeLeft)}
                </span>
                <span className="font-bold text-sm">Limited Time Offer</span>
              </div>
              <div className="flex gap-1  justify-center flex-wrap md:justify-start  items-center">
                <button
                  onClick={applyHandler}
                  className="md:px-11 px-2  md:py-4 bg-white rounded-3xl shadow    gap-2.5 inline-flex text-center text-cyan-600 text-lg font-medium"
                >
                  Book Now !
                </button>
                <p className="text-white md:mx-4">Before It's Too Late!</p>
              </div>
            </div>

            <div className="w-1/2 relative hidden md:block">
              <Image
                width={500}
                height={500}
                // fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="learn music"
                className="relative bottom-12"
                src="/bannerpic2-new.png"
              />
            </div>
          </div>

          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2  my-10">
            <div className=" w-full order-2 md:p-7 md:mx-10 bg-white rounded-md">
              <div className="text-2xl text-center mx-2  md:text-3xl font-bold ">
                Secure Your Last Spot
              </div>

              <form
                className=" flex flex-col gap-4 mx-3 "
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  InputLabelProps={{
                    className: " ",
                  }}
                  id="standard-basic"
                  label="Full name"
                  variant="standard"
                  className=" mt-4  bg-[ochre.light] "
                  {...register("fullName")}
                  InputProps={{
                    className: " ",
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
                  className=" mt-4  bg-[ochre.light] "
                  InputLabelProps={{
                    className: " ",
                  }}
                  InputProps={{
                    className: " ",
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
                  className=" mt-4  bg-[ochre.light] "
                  InputLabelProps={{
                    className: " ",
                  }}
                  InputProps={{
                    className: " ",
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
                    className="mt-4 w-full  bg-[ochre.light]  py-3"
                    defaultValue={"Interested Course"}
                    {...register("subcategory")}
                    MenuProps={{
                      style: { maxHeight: 200 },
                    }}
                    // InputLabelProps={{
                    //   className:' ',
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
                  className=" my-4 py-2 px-5 text-lg md:text-2xl text-white  rounded-full mx-auto bg-xcool-new-blue  "
                >
                  Submit
                </button>
                <div className="text-xs text-center  mb-4">
                  Note: Limited Seats Available. <br /> Selection on First Come
                  First Serve Basis. Hurry Up !
                </div>
              </form>
            </div>
            <div className="w-full order-1  text-white  ">
              <div className="text-sm md:text-3xl font-bold  text-center md:text-left">
                <p> 5 Days Remaining.</p>
                Bookings Close On <br />{" "}
                {/* “
              {new Date(
                new Date().getTime() + 5 * 24 * 60 * 60 * 1000
              ).toDateString()}
              ” */}
                <p className=" my-4 w-fit mx-auto md:mx-1 py-2 px-5 text-lg md:text-4xl text-white  rounded-md bg-xcool-new-blue  ">
                  {new Date(
                    new Date().getTime() + 5 * 24 * 60 * 60 * 1000
                  ).toDateString()}
                </p>
                <p>Grab Your Seat Now !!</p>
              </div>
              <div className="mt-10 w-auto mr-0 md:mr-16 text-center bg-[#2A87BB40] text-white text-xl md:text-4xl font-bold p-1 md:py-2 md:px-5 ">
                Limited Time Offer !
              </div>
              <div className=" my-10 gap-4 mx-auto px-4">
                <div className="flex items-center mb-5">
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_450_1629)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.1376V17.136Z"
                        fill="#2A87BB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_450_1629">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="ms-2 text-base md:text-lg">
                    Personalized training
                  </span>
                </div>
                <div className="flex items-center mb-5">
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_450_1629)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.1376V17.136Z"
                        fill="#2A87BB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_450_1629">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="ms-2 text-base md:text-lg">
                    Renowned Instructors
                  </span>
                </div>
                <div className="flex items-center mb-5">
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_450_1629)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.1376V17.136Z"
                        fill="#2A87BB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_450_1629">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="ms-2 text-base md:text-lg">
                    Best For Beginners
                  </span>
                </div>
                <div className="flex items-center mb-5">
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_450_1629)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM11.3152 17.136L18.224 8.4992L16.976 7.5008L11.0848 14.8624L6.912 11.3856L5.888 12.6144L11.3152 17.1376V17.136Z"
                        fill="#2A87BB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_450_1629">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="ms-2 text-base md:text-lg">
                    Comprehensive Curriculum
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto md:flex md:flex-row my-10 md:my-20 px-2 md:px-20 py-8 justify-center items-center text-center">
            <div className="flex flex-col bg-xcool-new-blue w-full p-1 rounded-md  md:py-8 justify-center flex-wrap items-center gap-2 text-white text-3xl">
              <div className="text-white text-3xl">Our Exclusive Offers -</div>
              <div className="text-sky-800 text-3xl bg-white border-sky-800 border-2 px-24 rounded-md py-2 font-bold md:block hidden w-2/3">
                Book Now & Get 90% Off
                {/* + Get a Learning E-Book Free ! */}
              </div>
              <div className="text-sky-800 text-3xl bg-white border-sky-800 border-2 px-8 rounded-md py-2 font-bold md:hidden block">
                Book Now & Get 90% Off
                {/* <br /> + <br />
              Get a Learning E-Book Free ! */}
              </div>

              <div className=" text-[41px]   bg-[#FFFFFF42] rounded-2xl w-fit px-10 py-4 text-white my-5 ">
                <p className="font-semibold text-4xl tracking-wide">
                  {" "}
                  {formatTime(timeLeft)}
                </p>

                <p className=" text-base mt-5">Limited time offer</p>
              </div>
              <button
                onClick={applyHandler}
                className="px-11 py-4 bg-white rounded-3xl shadow justify-center items-center gap-2.5 inline-flex text-center text-cyan-600 text-lg font-medium"
              >
                Book Now !
              </button>

              <div className="flex justify-around  flex-wrap font-bold md:w-2/3">
                <div className="text-white text-lg md:text-3xl font-normal">
                  Offer Valid for Next 2 Hours Only !!{" "}
                </div>
                {/* <div className="text-white text-3xl tracking-wide font-bold">
                {formatTime(timeLeft)}
              </div> */}
              </div>
            </div>
          </div>

          <div
            className={`text-2xl md:text-3xl font-semibold text-center my-3 text-xcool-new-blue`}
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
                      className="text-white border border-xcool-new-blue rounded-lg"
                    >
                      <Typography className=" font-bold  text-lg md:text-xl">
                        {i?.que}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className="  text-white rounded-lg">
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
      </div>
      {openModal && <SideBarBookNowInt setOpenModal={setOpenModal} />}

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
