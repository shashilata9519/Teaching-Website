import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import { FaMusic } from "react-icons/fa";

import { AiFillHome } from "react-icons/ai";
import Link from "next/link";

export const Breadcrumb = ({ courseName, category }: any) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" className="mt-2">
        <div className="  text-xcool-new-brown font-bold text-xs  md:text-sm ">
          <Link href="/" className="flex items-center">
            <span>
              <AiFillHome fontSize="inherit" />
            </span>

            <span className="mx-1"> HOME</span>
          </Link>
        </div>
        {category && (
          <div className="  text-xcool-new-brown font-bold text-xs  md:text-sm ">
            <div className="flex items-center">
              {/* <span>
              <FaMusic fontSize="inherit" />
            </span> */}

              <span className="mx-1 uppercase"> {category}</span>
            </div>
          </div>
        )}
        {
          courseName && (
            <div className=" text-xcool-new-brown font-bold text-xs  md:text-sm ">
            <Typography>{courseName}</Typography>
          </div>
          )
        }
        
       
      </Breadcrumbs>
    </>
  );
};
