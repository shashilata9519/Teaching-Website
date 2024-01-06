import { useRouter } from "next/router";
import Head from "next/head";
import { ProfileCourse } from "@/components/Profile/ProfileCourse";
import { useEffect, useState } from "react";
import { Repo } from "@/services/Repo";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import Link from "next/link";
import { CourseCard } from "@/components/Card/CourseCard";

export default () => {
  const router = useRouter();
  const [myCourses, setMyCourses] = useState<any>([]);
  const [IsRefresh,setIsRefresh]=useState(true)
  useEffect(() => {
    (async () => {
      const data = await Repo.myCourses();
      setMyCourses(data);
      setIsRefresh(false)
    })();
  }, [IsRefresh]);
  // console.log(router,'router')

  return (
    <>
      <Head>
        {" "}
        <title>courses</title>
      </Head>
      <div className="md:p-6 container mx-auto">
        <Breadcrumb category={"courses"} />
        <div className=" text-end">
          <Link
            href="/account/addCourses"
            className=" border rounded-full px-2 py-1 border-xcool-green text-xcool-new-blue hover:text-white hover:bg-xcool-new-blue"
          >
            + Add Course
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
          {myCourses?.map((i: any, index: any) => {
            return (
              <div className="p-5 bg-white rounded-3xl border" key={index}>
                <CourseCard
                  title={i?.course_name}
                  slug=""
                  level={i?.level}
                  type="template"
                  image={i?.coursetemplate?.img}
                  active={true}
                  link=""
                  designBy={i?.coursetemplate?.certification}
                  teacher={null}
                  myCourses={i}
                  setIsRefresh={setIsRefresh}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
