import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { CourseCard } from "@/components/Card/CourseCard";
import { ProfileCourse } from "@/components/Profile/ProfileCourse";
import { Repo } from "@/services/Repo";
import React, { useEffect, useState } from "react";

export default () => {
  const [myCourses, setMyCourses] = useState<any>([]);
  const [isRefresh, setIsRefresh] = useState<any>(false);
  useEffect(() => {
    (async () => {
      const data = await Repo.availableCourses();
      let result = Object.keys(data).map((key) => data[key])
      setMyCourses(result);
    })();
    setIsRefresh(false);
  }, [isRefresh]);
  console.log(myCourses, "myCourses");

  return (
    <div className="md:p-6 container mx-auto">
      <Breadcrumb category={"Add Course"} />
      {/* <div className="grid md:grid-cols-3 grid-cols-1  gap-3 my-4"> */}
        {/* <div>filter</div> */}
        <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {myCourses?.map((i: any, index: any) => {
            return (
              <div className="p-5 bg-white rounded-3xl" key={index}>
                <CourseCard
                  title={i?.course_name}
                  slug={i?.slug}
                  level={i?.level}
                  type="addCourse"
                  image={i?.img}
                  active={false}
                  link=""
                  designBy={i?.certification}
                  teacher={null}
                  myCourses={i}
                  setIsRefresh={setIsRefresh}
                />
              </div>
            );
          })}
        </div>
      {/* </div> */}
    </div>
  );
};
