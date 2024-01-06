import Multishape from "@/assets/multiShape";
import Multishape2 from "@/assets/multiShape2";
import Shape from "@/assets/shape";
import Shape2 from "@/assets/shape2";
import Carousel from "@/common/Carousel/Carousel";
import ScrollCard from "@/common/Carousel/Scroll";
import { stepData } from "@/common/StepsContent";

import { Header } from "@/common/Text/Header";
import { Heading } from "@/common/Text/Heading";
import { SubHeading } from "@/common/Text/SubHeading";
import WelcomeBanner from "@/components/Banner/WelcomeBanner2";
import { CourseCard } from "@/components/Card/CourseCard";
import { CourseStep } from "@/components/Card/CourseStep";
import { TeacherCard } from "@/components/Card/TeacherCard";
import { useModal } from "@/context/ModalContext";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Home = () => {
  // topCourses
  const { isModalOpen, setModalOpen, setModalData, modalData, setFilter }: any =
    useModal();
  const [topCourses, setTopCourses] = useState<any>([]);
  // console.log("topCourses", topCourses);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topCourses`)
      .then((response) => {
        setTopCourses(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setModalData({
      Courses: "",
      Fees: "",
      Genre: "Hindustani-Classical-Vocals",
      Teachers: "",
      Timeslot: "",
    });
  }, []);

  return (
    <>
      <WelcomeBanner />
      <div className=" pt-3">
        {/* TOP Courses Title */}
        {/* <Header title="Top Courses" /> */}
        {/* TOP Courses Mobile */}
        {/* <div className="block md:hidden ">
        <Carousel align="items-center">
          {topCourses.map((course: any, index: number) => (
            <div
              className="p-5 bg-white rounded-3xl gap-2"
              style={{ minWidth: "300px" }}
              key={index}
            >
              <CourseCard
                title={course?.course_name}
                slug={course?.slug}
                link={`/course/${course?.slug}`}
                level={course?.level}
                type="music"
                image={course?.img}
                teacher={course?.allcourse}
                active={false}
                designBy={undefined}
                myCourses={undefined}
              />
            </div>
          ))}
        </Carousel>
      </div> */}

        {/* TOP Courses Desktop  */}
        {/* <div className=" grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-5 md:grid hidden">
        {topCourses.map((course: any, index: number) => (
          <div className="p-5 bg-white rounded-3xl" key={index}>
            <CourseCard
              title={course?.course_name}
              slug={course?.slug}
              link={`/course/${course?.slug}`}
              level={course?.level}
              type="music"
              image={course?.img}
              teacher={course?.allcourse}
              active={false}
              designBy={undefined}
              myCourses={undefined}
            />
          </div>
        ))}
      </div> */}

        <div className="my-4 md:my-24">
          <div className=" w-full my-4 mx-auto md:block hidden">
            <Multishape />
          </div>
          <div className="my-4 mx-auto block md:hidden flex justify-center">
            <Multishape2 />
          </div>
        </div>

        <div className=" bg-xcool-new-blue-bg flex flex-col justify-center items-center py-12">
          <div className=" mx-auto w-full  mb-6">
            <div className=" text-center font-semibold text-sm px-3 md:text-2xl">
              Learn creative courses from curated experts anytime, anywhere.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-0 w-full md:w-3/4 ">
            <div>
              <TeacherCard
                slug="Swaroop-Kumar"
                image="https://xcool.s3.ap-south-1.amazonaws.com/images/sPAG4sReftgMw0Ai00UkbHVEJTs8aS6hXOwhjBLi.jpg"
                teacherName="Swaroop Kumar"
                courses="Hindustani Classical and Semi-Classical Vocal Parampara Series Gandharva Mahavidyalaya Prarambhik to Alankar"
                intro="Swaroop Kumar is an accomplished musician and teacher. He started learning table at the age of 3 and at the age 7 started performing vocal concerts. He runs a trust to promote aspiring musicians and has over 20 years of teaching experience. He offers a customized course titled the 'Parampara Series'"
              />
            </div>
            <div>
              <TeacherCard
                slug="Priya-Purushothaman"
                image="https://xcool.s3.ap-south-1.amazonaws.com/images/dIyYMLy22mO8V38m1aEgUaGbI3EmFxzdvSHYR8u2.jpg"
                teacherName="Priya Purushothaman"
                courses="Hindustani Classical and Semi-Classical Vocal Parampara Series Gandharva Mahavidyalaya Prarambhik to Alankar"
                intro="Priya specialises Hindustani Classical Vocals in the style of the Agra gharana. She has performed extensively in India, the United States and Europe and has collaborated with many international musicians. She teaches privately and also conducts lecture-demonstrations and workshops for various institutions."
              />
            </div>
            <div>
              <TeacherCard
                slug="Shruteendra-Katagade"
                image="https://xcool.s3.ap-south-1.amazonaws.com/images/UID8ZXpUGU9oxc02A0ShZVO0wN8cH5EIDpMHTBpR.jpg"
                teacherName="Shruteendra Katagade"
                courses="Hindustani Classical Tabla Gandharva Mahavidyala Visharad"
                intro="Shruteendra is a highly talented percussionist with expertise in table and folk instruments such as Dhoka, Nakkara and Duggi. He has completed his masters in music and is a graded artist of All India Radio. He has accompanied many accomplished musician and has over 12 years of teaching experience."
              />
            </div>
            <div>
              <TeacherCard
                slug="Pranay-Shetye"
                image="https://xcool.s3.ap-south-1.amazonaws.com/images/LHbjxrDUglNwqxAF9pDtg0scNBJZEgxoyW9Khjen.jpg"
                teacherName="Pranay Shetye"
                courses="Keyboard"
                intro="Pranay Shetye is an experienced music director who has worked on a variety of projects. His recent project “Kokan Kokan” has gained popularity and has gone viral on YouTube and social media. In addition to his musical abilities, he is also a talented lyricist and sound engineer. Pranay is a trained keyboardist and provides keyboard lessons."
              />
            </div>
          </div>
        </div>

        <div className="my-12 md:my-32">
          <div className=" text-center font-semibold text-sm px-3 md:text-2xl">
            We are associated with renowned university teachers
          </div>
          <div className="flex justify-center flex-wrap mt-5 gap-5">
            {/* <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/university/1.png`}
              className="m-3 md:w-52 w-24"
              alt=""
              id="hero-banner-img"
            /> */}
            <Image
              width={250}
              height={150}
              alt="learn music"
              src="/university1.png"
            />
            <Image
              width={250}
              height={150}
              alt="learn music"
              src="/university2.png"
            />
            <Image
              width={250}
              height={150}
              alt="learn music"
              src="/university3.png"
            />
            <Image
              width={250}
              height={150}
              alt="learn music"
              src="/university4.png"
            />
            {/* <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/university/2.png`}
              className="m-3 md:w-52 w-24"
              alt=""
              id="hero-banner-img"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/university/3.png`}
              className="m-3 md:w-52 w-24"
              alt=""
              id="hero-banner-img"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/university/4.png`}
              className="m-3 md:w-52 w-24"
              alt=""
              id="hero-banner-img"
            /> */}
          </div>
        </div>

        <div className=" bg-xcool-new-blue-bg">
          {/* <Header title="Start your creative journey today with these easy steps" /> */}
          <div className=" text-center font-semibold text-sm px-3 md:text-2xl py-8">
            Start your creative journey today with these easy steps
          </div>

          <div className=" gap-2 flex justify-center flex-wrap pb-5">
            {stepData?.map((item: any, index: any) => {
              return (
                <CourseStep
                  key={index}
                  step={item.step}
                  title={item.title}
                  intro={item.intro}
                  classstyle={' text-base mb-4 font-bold text-black'}
                />
              );
            })}
          </div>
         
        </div>
        {/* <div className="block md:hidden ">
          <Carousel item={stepData} />
        </div> */}
      </div>
    </>
  );
};
