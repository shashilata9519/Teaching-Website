import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { OurTeacherCard } from "@/components/Card/OurTeacherCard";
import { CourseBanner } from "@/components/Banner/CourseBanner";
import { Header } from "@/common/Text/Header";
import { ContentCard } from "@/components/Card/ContentCard";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import { ModalBase } from "@/common/Modal/ModalBase";
import { useModal } from "@/context/ModalContext";

export default () => {
  const [details, setDetails] = useState<any>([]);
  const [teachers, setTeachers] = useState<any>([]);
  const [Booking, setBooking] = useState<any>([]);
  const router = useRouter();
  const slug = router?.query?.slug;
  const [isLoading, setIsLoading] = useState(true);
  const [videoLink, setVideoLink] = useState<any>("");
  const {
    setModalOpen,
    setModalData,
    modalData,
    setFilter,
    setSelectedOptions,
  }: any = useModal();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCourseMetaById/${slug}`)
      .then((response) => {
        setDetails(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCourseTeachers/${slug}`)
      .then((response) => {
        setTeachers(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);
  // console.log(router, "course");
  // console.log(teachers, "teacher");
  const applyHandler = () => {
    setFilter({ subcategory: details?.subcat?.slug });
    setModalData({
      ...modalData,
      Genre: details?.subcat?.slug,
      Courses: details?.slug,
      Fees: "",
      Teachers: "",
      Timeslot: "",
    });
    setModalOpen(true);
  };
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <div className="lg:p-11 py-7">
        <GlobalBreadcrumb
          category={details?.subcat?.parentcategory?.category}
          subcategory={details?.subcat?.subcategory}
          subcat={details?.subcat}
        />
        {/* <CourseBanner
          genre={details?.subcat?.slug}
          courseName={details?.course_name}
          courseSlug={details?.slug}
          hideBread={true}
          img={details?.img}
        /> */}
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-3">
          <div className="bg-xcool-new-blue-bg h-fit rounded-sm my-3 pb-6 md:px-7">
            <div className="my-4">
              <Header title={details?.course_name} />
              <hr
                className=" bg-slate-300 mb-2 mx-2"
                style={{ height: "1px" }}
              />
            </div>
            <div className=" text-base my-2 font-semibold">
              About the course
            </div>
            <div className="">
              <ContentCard
                title="Content"
                para={details?.summary}
                loading={isLoading}
              />
              <ContentCard
                title="Certification"
                para={details?.certification}
                loading={isLoading}
              />
            </div>
            <div className=" text-center mt-4">
              <button
               className=" mx-4 border text-sm md:text-xl py-2 cursor-pointer rounded-full text-white bg-xcool-new-blue-dark hover:bg-xcool-new-blue-hover px-2 md:px-8 mt-2"
               
                // className=" bg-white px-4 rounded-2xl"
                onClick={applyHandler}
              >
                Book Now
              </button>
            </div>
          </div>
          <div>
            <div className="my-8">
              <Header title="Teachers Offering this course" />
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
              {teachers?.map((item: any) => {
                return (
                  <OurTeacherCard
                    getVideoUrl={(url: any) => {
                      if (!url) {
                        alert("video Link is not found!");
                      }
                      setVideoLink(url);
                    }}
                    courseName={details?.course_name}
                    courseSlug={details?.slug}
                    catSlug={details?.subcat?.slug}
                    key={item?.id}
                    priceIN={item?.teacher?.details?.rateph}
                    priceUSD={item?.teacher?.details?.usd_rateph}
                    firstname={item?.teacher?.firstname}
                    dp={item?.teacher?.dp}
                    teacherSlug={item?.teacher?.slug}
                    para={item?.teacher?.details?.bio}
                    item={item?.teacher}
                    loading={false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {videoLink?.length > 0 && (
        <ModalBase
          className="items-center"
          closeModal={() => setVideoLink("")}
          modalState={{
            isOpen: true,
            type: null,
          }}
        >
          <video width="500" height="500" autoPlay controls>
            <source src={videoLink} type="video/mp4" />
          </video>
        </ModalBase>
      )}
    </>
  );
};
