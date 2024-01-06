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

export default () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
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
    fdata.append("url", `/book-now${data?.subcategory}`);

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
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }
  const [allGenre, setGenre] = useState([]);
  React.useEffect(() => {
    (async () => {
      const data = await Repo?.getGenre();
      setGenre(data);
    })();
  }, []);

  return (
    <>
      <Link
        href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
        target="__blank"
      >
        <div className="fixed right-0 top-1/2 z-20 origin-bottom-right -rotate-90 bg-white py-1 px-2 rounded-md">
          <p>Chat with us!</p>
        </div>
      </Link>
      <div className="w-full bg-white relative">
        <div className="w-full  h-screen flex flex-col ">
          <div className="w-full h-[50%] md:h-[90%] flex">
            <div className="w-3/4 md:w-5/12 bg-[#0A1A26] relative order-2">
              <div className="w-full p-4 md:py-10 md:px-10">
                <div className="w-full text-white text-sm md:text-2xl uppercase gap-4 flex justify-center items-center">
                  <Link
                    href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
                    target="__blank"
                    className="md:p-2 cursor-pointer"
                  >
                    Contact us
                  </Link>
                  <button
                    onClick={() => modalHandler({ type: "booknow" })}
                    className="bg-white rounded-md text-black  md:p-2 p-1 cursor-pointer"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
              <Image
                width={500}
                height={500}
                alt="learn music"
                className="absolute -left-1/4 md:w-full w-screen my-10 md:my-2"
                src="/bg_image.png"
              />
              {/* <img className="absolute -left-1/4 w-full" src={`/bg_image.png`}/> */}
            </div>
            <div className="w-1/4 md:w-7/12 order-1">
              <div className="w-full h-full p-4 md:py-10 md:px-10 flex justify-center items-center">
                <div className="w-1/3 md:w-1/2 md:my-10 md:px-10 absolute top-3 left-1 md:top-0 md:left-0">
                  <Logo className="z-10" />
                </div>
                <div className="hidden md:block font-bold">
                  <p className="md:text-4xl lg:text-5xl mix-blend-multiply z-10 text-cyan-950 ">
                    Discover the Rhythms of India!
                  </p>
                  <p className="md:text-lg lg:text-xl mix-blend-multiply z-10 text-sky-800 w-3/4 md:w-3/4 my-4">
                    Explore your artistic potential with our diverse range of
                    courses, from Hindustani Classical to Carnatic music,
                    Bollywood vocals to Classical dances, guitar to piano, and
                    even Western vocal training – Master your passion as you
                    learn from the TRUE GURUS themselves!
                  </p>
                  <button
                    onClick={() => modalHandler({ type: "booknow" })}
                    className=" h-10 bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-lg md:text-2xl text-white px-5 my-2"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:hidden block h-[40%] p-2">
            <div className="font-bold">
              <p className="text-[20px] mix-blend-multiply z-10 text-cyan-950">
                {" "}
                Discover the Rhythms of India!
              </p>
              <p className="text-xl mix-blend-multiply z-10 text-sky-800">
                Explore your artistic potential with our diverse range of
                courses, from Hindustani to Carnatic music, Bollywood vocals to
                classical dances, guitar to piano, and soul soothing yoga – all
                taught by expert instructors!
              </p>
              <button className=" h-10 text-[22px] bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-8 mt-4">
                Get Started
              </button>
            </div>
          </div>
          <div className="bg-[#0A1A26] h-[10%] flex justify-around items-center text-sm md:text-2xl lg:px-20 mt-20 md:mt-0">
            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="bg-gradient-to-r md:text-2xl text-lg from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-2 md:px-5 my-2 py-1"
            >
              Grab your spot Now !
            </button>

            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="bg-gradient-to-r text-lg md:text-2xl from-cyan-800 via-cyan-800 to-teal-500 rounded-[10px] text-white px-2 md:px-5 my-2 py-1"
            >
              Enroll Now !
            </button>
          </div>
        </div>
        <div className="bg-white md:my-10">
          <div className="w-full md:w-fit grid md:grid-cols-5 grid-cols-1 gap-5 mx-auto p-10 bg-[url('/music_waves.png')]">
            <div className="aspect-square m-2 rounded-md p-4 md:max-w-md w-full bg-orange-200">
              <div className="text-black text-xl font-bold">
                Hindustani Classical
              </div>
              <div className=" text-black text-lg font-normal">
                Hindustani Classical Vocal, <br />
                Tabla, <br />
                Flute & More...
              </div>
            </div>
            <div className="aspect-square m-2 rounded-md p-4 md:max-w-md w-full bg-red-300">
              <div className=" text-black text-xl font-bold">Pop</div>
              <div className="text-black text-lg font-normal">
                Carnatic Violin, <br />
                Carnatic Vocal, <br />
                Veena & More...
              </div>
            </div>
            <div className="aspect-square m-2 rounded-md p-4 md:max-w-md w-full bg-teal-300">
              <div className=" text-black text-xl font-bold">Instrumental</div>
              <div className="text-black text-lg font-normal">
                Guitar,
                <br />
                Piano & Keyboard,
                <br />
                Violin & More...
              </div>
            </div>
            <div className="aspect-square m-2 rounded-md p-4 md:max-w-md w-full bg-sky-200">
              <div className="text-black text-xl font-bold">Vocal</div>
              <div className="text-black text-lg font-normal">
                Bollywood Vocal, <br />
                Indian Light Music Vocal, <br />
                Hindustani Semi Classical Vocal, <br />
                Western Vocal & More...
              </div>
            </div>
            <div className="aspect-square m-2 rounded-md p-4 md:max-w-md w-full bg-rose-100">
              <div className="text-black text-xl font-bold">
                Classical Dance
              </div>
              <div className="text-black text-lg font-normal">
                Kuchipudi, <br />
                Bharatanatyam & More...
              </div>
            </div>
          </div>
        </div>

        <div className="w-fit hidden md:block mx-auto my-10 md:my-20">
          <Shape3 />
        </div>
        <div className="w-fit md:hidden mx-auto my-5">
          <Shape4 />
        </div>

        <div className="flex container mx-auto flex-col md:flex-row md:mt-5">
          <div className="w-full md:w-1/2  h-1/2 grid grid-cols-9 grid-rows-2 gap-5 order-2 md:order-1 px-4  md:mx-10">
            <div className="col-span-5   border bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill  w-full h-fit"
                src={"/images/swaroop.jpeg"}
                alt=""
              />
              <p className=" absolute bottom-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Swaroop kumar
              </p>
            </div>
            <div className="col-span-4  border bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"/images/shailendra.png"}
                alt=""
              />
              <p className=" absolute top-2 right-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Shailendra Mishra
              </p>
            </div>
            <div className="col-span-4   border bg-black rounded-lg relative h-fit">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"/images/asavari.png"}
                alt=""
              />
              <p className=" absolute bottom-2 right-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Asavari Puranik
              </p>
            </div>
            <div className="col-span-5  border bg-black rounded-lg relative h-fit mt-2">
              <img
                className="rounded-lg object-fill w-full h-fit"
                src={"/images/sai.png"}
                alt=""
              />
              <p className=" absolute top-2 left-2 text-black md:bold md:text-2xl text-xs font-semibold mix-blend-multiply">
                Sai Manasa Mukurala
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2  order-1 md:order-2 flex flex-col justify-center px-4 mx-2  md:mx-10">
            <div className="my-5 text-red-500 md:text-3xl text-2xl lg:text-4xl font-bold">
              Teachers
            </div>
            <div className="text-cyan-800 text-xl font-normal">
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
                className="bg-gradient-to-r from-red-500 via-red-500 to-red-500 rounded-[10px] flex items-center text-white  text-lg md:text-2xl font-bold w-fit px-5 p-2 my-5"
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

        <div className="flex container mx-auto flex-col md:flex-row md:my-3 text-white">
          <div className="w-full md:w-1/2 h-1/2 order-2 hidden md:grid grid-cols-10 grid-rows-6 gap-5 p-4 md:mx-10">
            <div className="p-4 col-span-6  row-span-3  border bg-black rounded-lg ">
              I had an incredible experience at xcool. The instructors provided
              personalized feedback and guidance, helping me improve my skills
              faster than I thought possible.
            </div>
            <div className="p-4 col-span-4  row-span-4 border bg-black rounded-lg ">
              I’m so grateful for the top-notch classes I received from xcool.
              The curriculum is thoughtfully designed, and the lessons are
              structured in a way that builds a strong foundation.
            </div>
            <div className="p-4 col-span-5 row-start-4 row-span-4 border bg-black rounded-lg ">
              Attending online classes at xcool has been a game-changer for my
              musical abilities. The instructors are not only experts in their
              fields but also caring mentors who genuinely want to see their
              students succeed.
            </div>
            <div className="p-4 col-span-5 row-span-4 border bg-black rounded-lg ">
              Enrolling on xcool was the best decision I’ve made for my musical
              journey. The flexibility of online learning allowed me to fit
              lessons into my busy schedule. I highly recommend this platform to
              anyone passionate about music!
            </div>
          </div>
          <div className="w-full grid-cols-5 grid order-2 md:hidden p-2 gap-1 grid-rows-5 text-[10px]">
            <div className=" col-span-3 border bg-black rounded-lg row-span-2 p-2 ">
              I had an incredible experience at xcool. The instructors provided
              personalized feedback and guidance, helping me improve my skills
              faster than I thought possible.
            </div>
            <div className="  border bg-black rounded-lg col-span-2 row-span-3 p-2 ">
              I’m so grateful for the top-notch classes I received from xcool.
              The curriculum is thoughtfully designed, and the lessons are
              structured in a way that builds a strong foundation.
            </div>
            <div className="border bg-black rounded-lg col-span-2 row-span-3 p-2">
              Attending online classes at xcool has been a game-changer for my
              musical abilities. The instructors are not only experts in their
              fields but also caring mentors who genuinely want to see their
              students succeed.
            </div>
            <div className=" col-span-3 border bg-black rounded-lg row-span-2 p-2">
              Enrolling on xcool was the best decision I’ve made for my musical
              journey. The flexibility of online learning allowed me to fit
              lessons into my busy schedule. I highly recommend this platform to
              anyone passionate about music!
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 flex flex-col justify-center px-4 mx-2 md:px-20 md:mx-10">
            <div className="my-5 text-orange-300 text-2xl md:text-3xl lg:text-4xl  font-bold">
              Students
            </div>
            <div className="text-cyan-800 text-xl font-normal">
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
                className="bg-gradient-to-r from-orange-300 via-orange-300 flex items-center justify-between to-orange-300 rounded-[10px] text-white text-lg md:text-2xl font-bold w-fit px-5 p-2 my-5"
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

        <div className="w-full ">
          <div className="text-center text-cyan-950 text-2xl md:text-4xl font-bold mt-10">
            Start your creative journey today with these easy steps-
          </div>
          <div className="grid container mx-auto grid-cols-11 mb-20 mt-10">
            <div className="md:col-span-2"></div>
            <div className="md:col-span-3 col-span-11 md:mx-8 mx-2 flex">
              <div className=" md:hidden flex items-center">
                <Flute />
              </div>
              <div>
                <div className="text-cyan-950 text-base md:text-3xl font-bold">
                  1. Select the Course
                </div>
                <div className="text-justify text-cyan-950 text-sm md:text-lg font-bold">
                  Use the free form search bar or filters to find a course in
                  any art form you wish to learn. You can also browse top course
                  suggestions and top teacher profiles. Click on individual
                  course tabs to review details.
                </div>
                <div className="text-cyan-950 text-base md:text-3xl font-bold mt-12 md:hidden block">
                  2. Select the Teacher
                </div>
                <div className="text-justify text-cyan-950 text-sm md:text-lg font-bold md:hidden block">
                  Once you've found your desired course, find a teacher
                  available to teach it. Use filters to refine your search.
                  Click on the teacher's profile to see certifications,
                  experience, time slots, reviews, and other courses offered.
                </div>

                <div className="text-cyan-950 text-base md:text-3xl font-bold mt-12">
                  3. Send Application
                </div>
                <div className="text-justify text-cyan-950 text-sm md:text-lg font-bold">
                  Fill out the application form to enrol in the course. Indicate
                  your preferred time slots or request a specific timing. Share
                  additional information about yourself. Track the status of
                  your application in the 'My Classes' tab.
                </div>
                <div className="text-cyan-950 text-base md:text-3xl font-bold mt-12 md:hidden block">
                  4. Make Payments
                </div>
                <div className="text-justify text-cyan-950 text-sm md:text-lg font-bold md:hidden block">
                  After your application is reviewed by the teacher, you may be
                  asked for additional information. Upon acceptance, you'll
                  receive a class schedule and payment link. Once payment is
                  made, your classes are confirmed and will be in your calendar.
                </div>

                <div className="text-cyan-950 text-base md:text-3xl font-bold mt-12">
                  5. Join the Class
                </div>
                <div className="text-justify text-cyan-950 text-sm md:text-lg font-bold">
                  Login into your account, go to calendar and select the class
                  which you wish to join
                </div>
              </div>
            </div>
            <div className=" md:block hidden">
              <Flute />
            </div>

            <div className="md:col-span-3 col-span-10 mx-8 md:block hidden">
              <div className="text-cyan-950 text-xl md:text-3xl font-bold mt-12">
                2. Select the Teacher
              </div>
              <div className="text-justify text-cyan-950 text-base md:text-lg font-bold">
                Once you've found your desired course, find a teacher available
                to teach it. Use filters to refine your search. Click on the
                teacher's profile to see certifications, experience, time slots,
                reviews, and other courses offered.
              </div>
              <div className="text-cyan-950 text-xl md:text-3xl font-bold mt-12">
                4. Make Payments
              </div>
              <div className="text-justify text-cyan-950 text-base md:text-lg font-bold">
                After your application is reviewed by the teacher, you may be
                asked for additional information. Upon acceptance, you'll
                receive a class schedule and payment link. Once payment is made,
                your classes are confirmed and will be in your calendar.
              </div>
            </div>
            <div className="md:col-span-2"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-5  mx-auto justify-between font-semibold w-full md:w-3/4  text-xl">
            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="px-5 md:px-16 py-2 bg-gradient-to-l text-center text-lg md:text-2xl from-cyan-600 via-cyan-300 to-sky-400 rounded-[10px]"
            >
              Book Now
            </button>
            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="px-5 md:px-16 py-2 bg-gradient-to-l from-orange-300 text-center text-lg md:text-2xl via-orange-200 to-orange-100 rounded-[10px]"
            >
              Contact Us
            </button>
            <button
              onClick={() => router.push("/learn/Music")}
              className="px-5 md:px-16 py-2 bg-gradient-to-l from-red-300 via-red-400 text-lg md:text-2xl text-center to-red-500 rounded-[10px]"
            >
              Explore More
            </button>
          </div>
        </div>

        <div className="bg-slate-900 hidden md:flex md:flex-row my-10 md:my-20 px-5 md:px-20 py-8 justify-center items-center text-center">
          <div className="text-white text-3xl w-1/3">
            Get Your Hands On The Best Courses Offered Right Now.
          </div>
          <div className="shadow-zinc-800 ">
            <div className="text-zinc-100 text-[41px]  bg-black rounded-2xl w-fit px-10 py-5 shadow-xl shadow-white ">
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="flex flex-col w-1/3 justify-center items-center gap-2 text-white text-3xl">
            <button
              onClick={() => modalHandler({ type: "booknow" })}
              className="text-white text-[20px] font-bold bg-xcool-new-blue w-fit text-lg md:text-2xl px-5 py-2 rounded-[10px] hover:bg-xcool-new-blue-hover transition-all duration-200"
            >
              Apply Now !
            </button>
            <div className="text-white text-3xl font-bold">
              Before It’s Too Late !
            </div>
            <div className="text-center">
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
          <div className=" w-full md:w-1/3 md:mx-10">
            <div className="text-cyan-950 text-2xl mx-2 md:text-3xl font-bold ">
              Secure Your Last Spot
            </div>
            <form
              className=" flex flex-col gap-4 mx-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <>
                <TextField
                  id="standard-basic"
                  label="Full name"
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
                <div>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    variant="standard"
                    label="Interested Course"
                    className="mt-4 w-full"
                    defaultValue={"Interested Course"}
                    {...register("subcategory")}
                    MenuProps={{
                      style: { maxHeight: 200 },
                    }}
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
                  className="text-white my-4 py-2 px-5 text-lg md:text-2xl font-bold rounded-xl mx-auto hover:text-black"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #205d98 0%, #24bac3 100%)",
                  }}
                >
                  Submit
                </button>
                <div className="text-sm text-center text-cyan-950 mb-4">
                  Note: Limited Seats Available. <br /> Selection on First Come
                  First Serve Basis. <br />
                  Hurry Up !
                </div>
              </>
            </form>
          </div>
          <div className="w-full md:w-1/2 bg-slate-900 text-white flex flex-col gap-3 justify-center items-center md:ml-auto">
            <div className=" text-sm md:text-2xl font-bold text-center p-5">
              5 Days Remaining. Applications Closes on “30th July” Grab The
              Seats Now !!
            </div>
            <div className="bg-white text-sky-900 text-xl md:text-4xl font-bold rounded-md p-1 md:p-2 border-2 border-sky-900">
              Limited Time Offer !
            </div>
            <div className="grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 my-10 gap-4">
              <div className="flex items-center">
                {" "}
                <TiTick className=" md:text-2xl" />{" "}
                <span>1:1 Personalized Training</span>
              </div>
              <div className="flex items-center">
                {" "}
                <TiTick className=" md:text-2xl" />{" "}
                <span>Indian Renowned Instructors</span>
              </div>
              <div className="flex items-center">
                {" "}
                <TiTick className=" md:text-2xl" />{" "}
                <span>Best For Beginners</span>
              </div>
              <div className="flex items-center">
                {" "}
                <TiTick className=" md:text-2xl" />{" "}
                <span>Comprehensive Curriculum</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 hidden md:flex md:flex-row my-10 md:my-20 px-5 md:px-20 py-8 justify-center items-center text-center">
          <div className="flex flex-col w-full justify-center items-center gap-2 text-white text-3xl">
            <div className="text-white text-3xl">Our Exclusive Offers -</div>
            <div className="text-sky-800 text-3xl bg-white border-sky-800 border-2 px-8 rounded-md py-2 font-bold">
              Enroll Now & Get 20% Off + Get a Learning E-Book Free !
            </div>

            <div className="flex justify-around text-[25px] font-bold w-2/3">
              <div className="text-white font-normal">
                Offer Valid for Next 2 Hours Only !!
              </div>
              <div className="text-white font-light">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <SubHeading title="Frequently Asked Questions" align="center" />

        <div className=" my-10 container mx-auto  md:px-28">
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
                  className="text-white  bg-xcool-new-blue-dark rounded-lg"
                >
                  <Typography className=" font-bold  text-lg md:text-2xl">
                    {i?.que}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className=" bg-xcool-new-blue text-white rounded-lg">
                  <Typography className="text-lg  md:text-2xl">
                    {i?.ans}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
      <Footer />
      {modalState.type === "booknow" && (
        <CampaignBookingModal
          modalState={modalState}
          closeModal={setmodalState}
          setSuccessState={setSuccessState}
        />
      )}
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
