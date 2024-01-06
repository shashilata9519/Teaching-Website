import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "@/common/Text/Header";
import { ContentCard } from "@/components/Card/ContentCard";
import { BookingSlotCard } from "@/components/Card/BookingSlotCard";
import { TeacherProfileCard } from "@/components/Card/TeacherProfileCard";
import { TeacherBanner } from "@/components/Banner/TeacherBanner";
import { TeacherProfileIntro } from "@/components/Card/TeacherProfileIntro";
import { Utils } from "@/utils/Utils";
import { statusStudent, statusTeacher } from "@/utils/Helpers";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import BasicAccordion from "@/common/BasicAccordion";

export default () => {
  const [teachers, SetTeachers] = useState<any>([]);
  const [teacherDetails, setTeacherDetails] = useState<any>([]);

  const [Booking, setBooking] = useState<any>([]);

  const [Course, setCourse] = useState<any>([]);
  const [courseById, setCourseById] = useState<any>([]);
  const [isChecked, setIschecked] = useState<any>([]);
  const [BookingStatus, setBookingStatus] = useState<any>({});
  const [teacherQual, setTeacherQual] = useState<any>([]);

  const [teacherAward, setTeacherAward] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  var status = "";

  const router = useRouter();
  const slugname = router?.query?.teacher;
  const slug = router?.query?.slug;

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        status = statusStudent(response?.data?.data[0]);
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
        setIsLoading(false);
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
        setCourseById(response?.data?.data);
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherIdQual/${slugname}`
      )
      .then((response) => {
        setTeacherQual(
          response?.data?.data?.filter((i: any) => i?.type === "degree")
        );
        setTeacherAward(
          response?.data?.data?.filter((i: any) => i?.type === "award")
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    // TODO: add teacher details api usign the get teacher by ID API
  }, [slug, slugname]);

  const selectHandler = (i: any) => {
    if (isChecked?.includes(i?.slot_id)) {
      let copy = [...isChecked];
      copy = copy.filter((item) => item !== i.slot_id);
      setIschecked(copy);
    } else {
      setIschecked([...isChecked, i.slot_id]);
    }
  };
  // console.log(teacherDetails, "teacherDetails");

  console.log(slug, slugname, "tttt");
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
          course={"course"}
          subcategory={slugname}
          courseName={slug}
        />
        <TeacherBanner
          level={courseById?.level}
          courseName={courseById?.course_name}
          teacherName={teacherDetails?.firstname}
          price={teacherDetails?.details?.rateph || 500}
          priceUSD={teacherDetails?.details?.usd_rateph || 20}
          dp={teacherDetails?.dp}
          courseSlug={slug}
          teacherSlug={slugname}
        />
        <div className="my-8">
          <Header title="About the course" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* <div className="bg-white rounded-3xl h-fit">
            <TeacherProfileCard
              city={teacherDetails?.city}
              img={teacherDetails?.dp}
              year={teacherDetails?.details?.yoe}
              loading={isLoading}
            />
          </div>
          <div className="bg-white col-span-3 rounded-3xl h-max">
            <TeacherProfileIntro
              bio={teacherDetails?.details?.bio}
              name={teacherDetails?.firstname}
              qualification={teacherQual}
              award={teacherAward}
              loading={isLoading}
            />
          </div> */}
          <div className="hidden">
            <BasicAccordion
              bio={teacherDetails?.details?.bio}
              qualification={teacherQual}
              award={teacherAward}
            />
          </div>

          <div className="hidden">
            {!isObjectEmpty(BookingStatus) ? (
              <>
                <div className="mt-2 bg-[#ffffff] shadow-md shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] h-fit p-5 rounded-3xl">
                  <p className=" text-orange-400 font-semibold mb-3">
                    Course Applied
                  </p>
                  <span>
                    Current status:
                    <button
                      className="  rounded-3xl px-2 py-1 shadow-md mx-2"
                      style={{
                        backgroundColor: Utils.genareteColor(
                          setStatus(BookingStatus)
                        ),
                      }}
                    >
                      {statusStudent(BookingStatus)}
                      {/* {status} */}
                    </button>
                  </span>
                </div>
              </>
            ) : (
              <div>
                <BookingSlotCard
                  Booking={Booking}
                  selectHandler={(i: any) => selectHandler(i)}
                  isChecked={isChecked}
                  course_id={Course?.id}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 my-8">
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
          <div className="">
            <BasicAccordion
              bio={teacherDetails?.details?.bio}
              qualification={teacherQual}
              award={teacherAward}
            />
          </div>
        </div>
      </div>
    </>
  );
};
