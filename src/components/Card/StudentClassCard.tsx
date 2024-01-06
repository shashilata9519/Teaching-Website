import Logo from "@/assets/logo";
import { statusStudent } from "@/utils/Helpers";
import { Utils } from "@/utils/Utils";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";

export const ClassCard = ({ item }: any) => {
  return (
    <>
      {" "}
      <div className="bg-white my-10 rounded-3xl py-3 px-4 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <div className=" lg:col-span-2">
            <p className=" lg:text-3xl text-2xl font-semibold">
              {item ? item?.course?.course_name : ""}
              {item?.is_demo_req == 1 ? (
                <span className="border text-lg rounded-lg bg-gray-500 text-white p-1">
                  Demo
                </span>
              ) : (
                <></>
              )}
            
            </p>

            <p className=" font-semibold">{item?.batch?.batch_name}</p>
            <Link href={`/teacher/${item?.teacher?.slug}`} className=" font-semibold">by {item?.teacher?.firstname}</Link>
          </div>
          

          <div className="flex justify-between flex-wrap">
            <div>
              {item?.batch && (
                <>
                  <p>Class Date</p>
                  <p className=" font-semibold">{item?.batch?.start_date}</p>
                </>
              )}
            </div>

            <div className="text-center">
              <div className="font-bold ">
                {moment(item?.date_and_time + "Z").format("MMMM Do YYYY")}
                <br />
                {moment(item?.date_and_time + "Z").format("h:mm a")}
              </div>

              <div className="flex w-fit mx-auto gap-1">
                {/* TODO: Why is this static? */}
                {/* <Link href={`/account/purchaseDetails/${item?.id}`} className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1">
                  View Details
                </Link> */}
                <Link href={`joinclassroom/${item?.teacher?.name}-${item?.teacher?.jm_uuid}`} className="border text-white bg-red-500 font-semibold rounded-3xl px-4 text-xs py-1">
                  Join Class
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
