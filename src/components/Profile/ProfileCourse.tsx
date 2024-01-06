import React from "react";
import { CourseCard } from "../Card/CourseCard";

export const ProfileCourse = ({ myCourses }: any) => {
  return (
    <div>
      {myCourses?.map((i: any, index: any) => {
        return (
          <div className="p-5 bg-white rounded-3xl" key={index}>
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
              setIsRefresh={undefined}
            />
          </div>
        );
      })}
    </div>
  );
};
