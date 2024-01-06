import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "@/common/Text/Header";
import { ContentCard } from "@/components/Card/ContentCard";
import { BookingSlotCard } from "@/components/Card/BookingSlotCard";

import { TeacherBanner } from "@/components/Banner/TeacherBanner";
import { Utils } from "@/utils/Utils";
import { TeacherProfileCard } from "@/components/Card/TeacherProfileCard";
import { TeacherProfileIntro } from "@/components/Card/TeacherProfileIntro";
import { statusStudent, statusTeacher } from "@/utils/Helpers";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import BasicAccordion from "@/common/BasicAccordion";
export default () => {
  const [teachers, SetTeachers] = useState<any>([]);
  const [teacherDetails, setTeacherDetails] = useState<any>([]);

  const [Course, setCourse] = useState<any>([]);
  const [Booking, setBooking] = useState<any>([]);
  const [isChecked, setIschecked] = useState<any>([]);
  const [teacherQual, setTeacherQual] = useState<any>([]);
  const [teacherAward, setTeacherAward] = useState<any>([]);
  const [BookingStatus, setBookingStatus] = useState<any>({});
  const router = useRouter();
  const slug = router?.query?.course;
  const slugname = router?.query?.slug;
  // console.log(teacherDetails, "teacherDetails");
  // console.log(teachers, " teachercontent");
  const [isLoading, setIsLoading] = useState<any>(true);
  var status = statusStudent(BookingStatus);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacher/${slugname}`)
      .then((response) => {
        setTeacherDetails(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCourseById/${slug}`)
      .then((response) => {
        SetTeachers(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getBookingDetails/${slug}/${slugname}`
      )
      .then((response) => {
        setBooking(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCourseInfo/${slug}/${slugname}`
      )
      .then((response) => {
        // console.log(response?.data?.data[0], "course info");
        setCourse(response?.data?.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/courseAppStatus/${slug}/${slugname}`,
        {
          headers: {
            "Content-Type": "multipart/form-data;",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response?.data?.data, "datttt");
        if (response?.data?.data.length === 0) return;
        setBookingStatus(response?.data?.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherIdQual/${slugname}`
      )
      .then((response) => {
        setTeacherQual(
          response?.data?.data?.filter((i: any) => i?.type === "degree")
        );
        setTeacherAward(
          response?.data?.data?.filter((i: any) => i?.type === "award")
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug, slugname, BookingStatus]);

  console.log(teachers, teacherDetails, "teacherDetails");

  const selectHandler = (i: any) => {
    if (isChecked?.includes(i?.slot_id)) {
      let copy = [...isChecked];
      copy = copy.filter((item) => item !== i.slot_id);
      setIschecked(copy);
    } else {
      setIschecked([...isChecked, i.slot_id]);
    }
  };
  // console.log(BookingStatus, " {} BookingStatus");

  const isObjectEmpty = (data: any) => Object.keys(data).length === 0;

  const setStatus = (data: any) => {
    return (
      (data?.is_accepted == 1 && "paid") ||
      (data?.is_accepted == 0 && data?.is_pending == 1 && "payment pending") ||
      (data?.is_demo_req == 1 && "demo") ||
      (data?.is_demo_req == 1 && "demo") ||
      (data?.is_cancelled == 1 && "cancelled") ||
      (data?.is_rejected == 1 && "rejected") ||
      "pending"
    );
  };

  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>

      <div className="lg:p-11 py-7">
        <GlobalBreadcrumb
          teacher={"teacher"}
          teacherName={slugname}
          courseName={slug}
        />
        <TeacherBanner
          level={teachers?.level}
          courseName={teachers?.course_name}
          teacherName={teacherDetails?.firstname}
          price={teacherDetails?.details?.rateph || 500}
          priceUSD={teacherDetails?.details?.usd_rateph || 20}
          courseSlug={slug}
          dp={teacherDetails?.dp}
          teacherSlug={teacherDetails?.slug}
        />

        <div className="my-8">
          <Header title="About the course" />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-4">
          <div className="">
            {/* <div className="bg-white rounded-3xl h-max">
            <TeacherProfileCard
              city={teacherDetails?.city}
              img={teacherDetails?.dp}
              year={teacherDetails?.details?.yoe}
              loading={isLoading}
            />
          </div>
          <div className="bg-white lg:col-span-3 rounded-3xl h-max">
            <TeacherProfileIntro
              bio={teacherDetails?.details?.bio}
              name={teacherDetails?.firstname}
              qualification={teacherQual}
              award={teacherAward}
              loading={isLoading}
            />
          </div> */}
            <div className="">
              <BasicAccordion
                bio={teacherDetails?.details?.bio}
                qualification={teacherQual}
                award={teacherAward}
              />
            </div>
          </div>
          <ContentCard
            title="Content"
            para={teachers?.summary}
            loading={isLoading}
          />
          <ContentCard
            title="Certification"
            para={teachers?.certification}
            loading={isLoading}
          />
          <div className="hidden">
            {!isObjectEmpty(BookingStatus) ? (
              <>
                <div className="mt-2 bg-[#ffffff] shadow-md shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] h-fit p-5 rounded-3xl">
                  <p className=" text-orange-400 font-semibold mb-3">
                    Course Applied Already
                  </p>
                  <span>
                    Status:
                    <button
                      className="  rounded-3xl px-2 text-white  py-1 shadow-md mx-2"
                      style={{
                        backgroundColor: Utils.genareteColor(status),
                      }}
                    >
                      {/* {setStatus(BookingStatus)} */}
                      {status}
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <BookingSlotCard
                Booking={Booking}
                selectHandler={(i: any) => selectHandler(i)}
                isChecked={isChecked}
                course_id={Course?.id}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
