import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { FaMusic } from "react-icons/fa";

import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

export const GlobalBreadcrumb = ({
  courseName,
  category,
  subcategory,
  teacher,
  course,
  subcat,
  teacherName,
}: any) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" className=" mt-2">
        <div className="  text-xcool-new-brown font-bold text-xs  md:text-sm ">
          <Link href="/" className="flex items-center">
            <span>
              <AiFillHome fontSize="inherit" />
            </span>

            <span className="mx-1"> HOME</span>
          </Link>
        </div>

        <div className="  text-xcool-new-brown font-bold   text-xs md:text-sm ">
          <div className="flex items-center">
            {category && (
              <Link href={`/learn/${category}`} className="flex items-center">
                <span className="mx-1 uppercase"> {category}</span>
              </Link>
            )}
            {teacher && (
              <Link href={`/teacher`} className="flex items-center">
                <span className="mx-1 uppercase"> {teacher}</span>
              </Link>
            )}

            {course && (
              <Link
                href={`/course/${courseName}`}
                className="flex items-center"
              >
                <span className="mx-1 uppercase"> {course}</span>
              </Link>
            )}
          </div>
        </div>

        {subcategory && (
          <Link
            href={`/learn/${category}/${subcat?.slug}`}
            className="flex items-center"
          >
            <div className="  text-xcool-new-brown font-bold   text-xs md:text-sm">
              <div className="flex items-center">
                <span className="mx-1 uppercase"> {subcategory}</span>
              </div>
            </div>
          </Link>
        )}
        {teacherName && (
          <Link
            href={`/teacher/${teacherName}`}
            className=" text-xcool-new-brown font-bold   text-xs md:text-sm"
          >
            <div className="mx-1 uppercase font-bold">
              {" "}
              {teacherName}
            </div>
          </Link>
        )}

        {!course && courseName && (
          <div className=" text-xcool-new-brown font-bold   text-xs md:text-sm">
            <Typography>{courseName}</Typography>
          </div>
        )}
      </Breadcrumbs>
    </>
  );
};
