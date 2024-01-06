import { ModalBase } from "@/common/Modal/ModalBase";
import { Skeleton, Stack } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";
import { MdDateRange } from "react-icons/md";

const EventCard = ({ img, eventName, date, para, link, loading }: any) => {
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modalData, setmodalData] = useState<any>();
  const modalActionHandler = ({ data }: any) => {
    setmodalState({
      isOpen: true,
      type: true,
    });
    setmodalData(data);
  };

  return (
    <>
      <div className="flex flex-col min-w-fit mb-4 w-full bg-white drop-shadow rounded-md">
        <div className="flex flex-col p-3 bg-white rounded-t-xl h-fit">
          <div className="flex ">
            {loading ? (
              <Stack paddingRight={1}>
                <Skeleton width={80} height={80} variant="rounded" />
              </Stack>
            ) : (
              <div
                className="mr-2"
                style={{
                  minWidth: 80,
                  height: 80,
                  borderRadius: 10,
                  // background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${img})`,
                  background: `url(https://xcool.s3.ap-south-1.amazonaws.com/${img})`,
                  backgroundSize: "cover",
                }}
              ></div>
            )}
            <div className="flex flex-col">
              {loading ? (
                <Stack spacing={2}>
                  <Skeleton />
                </Stack>
              ) : (
                <div className="course-title text-left lg:text-base md:text-sm font-bold text-sm h-12 shrink text-ellipsis overflow-hidden">
                  {eventName}
                </div>
              )}
              {loading ? (
                <Skeleton />
              ) : (
                <div className="flex items-center gap-1 flex-wrap text-sm mb-2">
                  <MdDateRange />
                  <span>Date : {moment(date).format("DD/MM/YYYY")}</span>
                </div>
              )}
              {loading ? (
                <Skeleton />
              ) : (
                <div className=" text-xs my-1 h-16 overflow-hidden">
                  <span>{para}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="  text-right bg-white pb-2 pe-2 rounded-md">
       { link!="/" && link!=null && <Link href={link ?? "#"} target="__blank" className="mr-2 ">
            Read More
          </Link>}
          <button
            className="  text-xs md:text-sm  bg-xcool-new-blue-dark text-white border rounded-md py-1 px-4 border-xcool-new-blue-dark"
            onClick={() =>
              modalActionHandler({
                data: para,
              })
            }
          >
            View More Details
          </button>
        </div>
      </div>

      {modalState && (
        <ModalBase
          closeModal={setmodalState}
          modalState={modalState}
          title={"Description"}
          className=""
        >
          <div className=" md:w-80 w-auto my-4">{modalData}</div>
        </ModalBase>
      )}
    </>
  );
};

export default EventCard;
