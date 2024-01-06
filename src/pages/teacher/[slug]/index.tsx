import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/common/Text/Header";
import { CourseCard } from "@/components/Card/CourseCard";
import { TeacherProfileIntro } from "@/components/Card/TeacherProfileIntro";
import { ProfileBannerCard } from "@/components/Banner/ProfileBanner";
import { TeacherProfileCard } from "@/components/Card/TeacherProfileCard";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import { CourseCardv2 } from "@/components/Card/CourseCardv2";
import BasicAccordion from "@/common/BasicAccordion";
import { useModal } from "@/context/ModalContext";
import { Repo } from "@/services/Repo";

export default () => {
  const router = useRouter();
  const { slug } = router?.query;

  const [teacher, setTeacher] = useState<any>([]);
  const [teacherQual, setTeacherQual] = useState<any>([]);
  const [teacherAward, setTeacherAward] = useState<any>([]);
  const [teacherCourse, setTeacherCourse] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [videoData, setVideo] = useState<any>('');

  const { isModalOpen, setModalOpen, setModalData, modalData }: any =
    useModal();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacher/${slug}`)
      .then((response) => {
        setTeacher(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherIdQual/${slug}`)
      .then((response) => {
        setTeacherQual(
          response?.data?.data?.filter((i: any) => i?.type === "degree")
        );
        setTeacherAward(
          response?.data?.data?.filter((i: any) => i?.type === "award")
        );
        setVideo(
          response?.data?.data?.filter((i: any) => i?.type === "videofeature")
        );
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherIdCourses/${slug}`
      )
      .then((response) => {
        setTeacherCourse(response?.data?.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  // console.log(router, "teacherCourse");
  console.log(videoData, "teacher");
  return (
    <>
      <Head>
        {" "}
        <title>{router.query.slug}</title>
      </Head>
      <div className="container mx-auto p-1 md:p-3 mt-3">
        <GlobalBreadcrumb
          teacher={"teacher"}
          subcategory={teacher?.firstname}
        />
        <ProfileBannerCard
          teacher={teacher}
         
          youtube={teacher?.details?.yt}
          fb={teacher?.details?.fb}
          insta={teacher?.details?.insta}
          linkedin={teacher?.details?.linkedin}
          twitter={teacher?.details?.twitter}
          videoData={videoData}
        />
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="my-8">
              <Header title="Meet the teacher" />
            </div>
            <div className="">
              <BasicAccordion
                bio={teacher?.details?.bio}
                qualification={teacherQual}
                award={teacherAward}
              />
              {/* Video part removed */}
              {/* <div className="my-8">
                <Header title="Shorts Video" />
              </div>
              {
                videoData.length===0?(

              <div className=" text-[#ca2c1b] m-9 font-semibold">
                Not Available
              </div>
                ):(

              <div className=" grid md:grid-cols-2 grid-cols-1 gap-4 ">
                {videoData?.map((i: any, index: any) => {
                  return (
                    <video width="320" height="240" key={index} controls>
                      <source src={i?.file_name} type="video/mp4" />
                    </video>
                  );
                })}
              </div>
                )
              } */}
            </div>
          </div>
          <div>
            <div className="my-8">
              <Header title="Teacher Courses" />
            </div>
            {teacherCourse.length == 0 ? (
              <div className=" text-[#ca2c1b] m-9 font-semibold">
                Not Available
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-5">
                {teacherCourse?.map((item: any) => {
                  
                  return (
                    <CourseCardv2
                      key={item?.id}
                      courseName={item?.course_name}
                      teacherName={teacher?.firstname}
                      teacherSlug={teacher?.slug}
                      slug={item?.slug}
                      img={item?.img}
                      level={item?.level}
                      NoOfteacher={""}
                      teacherImage={""}
                      link={`${router.asPath}/${item?.slug}`}
                      cat={""}
                      summary={""}
                      showTeacher={false}
                      item={item}
                      genreSlug={item?.subcat?.slug}
                    />
                    // <div className="p-5 bg-white rounded-3xl" key={item?.id}>
                    //   <CourseCard
                    //     title={item?.coursetemplate?.course_name}
                    //     slug={item?.coursetemplate?.slug}
                    //     link={`${router.asPath}/${item?.coursetemplate?.slug}`}
                    //     type={slug}
                    //     level={item?.coursetemplate?.level}
                    //     image={item?.coursetemplate?.img}
                    //     active={false}
                    //     teacher={null}
                    //     designBy={''}
                    //     myCourses={''}
                    //   />
                    // </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
