import styled from "@emotion/styled";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { BsFillPersonVcardFill } from "react-icons/bs";
import { TiLocation } from "react-icons/ti";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useModal } from "@/context/ModalContext";
import { Skeleton, Stack } from "@mui/material";
import { calculateTeacherFee } from "@/utils/Helpers";

interface PropsType {
  firstname: string;
  dp: any;
  priceIN: any;
  priceUSD: any;
  teacherSlug: any;
  para: any;
  item: any;
  getVideoUrl: any;
  courseName: any;
  courseSlug: any;
  catSlug: any;
  loading: any;
}
export const OurTeacherCard = ({
  firstname,
  dp,
  priceIN,
  teacherSlug,
  para,
  courseSlug,
  priceUSD,
  courseName,
  loading,
  item,
  getVideoUrl,
  catSlug,
}: PropsType) => {
  // item.videoUrl="https://xcool.s3.ap-south-1.amazonaws.com/attachments/7U6upPPwgMCCT5sMzitzXt03n1dCxyj62SiSa47m.mp4"

  const router = useRouter();
  const [Location, SetLocation] = useState<any>([]);
  const [Id, setId] = useState<any>(null);
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      // fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  useEffect(() => {
    const location: any = localStorage.getItem("location");
    SetLocation(JSON.parse(location));
  }, []);

  const openHandler = () => {
    getVideoUrl(item?.videoUrl);
  };

  const getTeacherFee = () => {
    if (Location?.countryCode === "IN") {
      const newRate = ((priceIN || 500) * 1.1).toFixed(1);
      return parseFloat(newRate);
    } else {
      let usdRate = priceUSD || 20;
      usdRate = (usdRate / 83) * 1.25;
      if (usdRate <= 20) {
        usdRate = 20;
      }
      const newRate = usdRate.toFixed(1);
      const num = parseFloat(newRate);
      return Math.ceil(num);
    }
  };

  const {
    setModalOpen,
    setModalData,
    modalData,
    setModalType,
    setFilter,
    filter,
  }: any = useModal();

  const applyHandler = (data: any) => {
    // console.log(item, courseSlug, teacherSlug, modalData,"item", {
    //   Genre: catSlug,
    //   Courses: courseSlug,
    //   Teachers: teacherSlug,
    //   Fees: "",
    // });
    // console.log(teacherSlug,"item");
    setModalData({
      Genre: catSlug,
      Courses: courseSlug,
      Teachers: teacherSlug,
    });

    setModalOpen(true);
  };

  console.log(modalData, "modalData");

  return (
    <div className="flex flex-col flex-wrap min-w-fit mb-4 w-full bg-white drop-shadow rounded-md">
      <Stack spacing={10}>
        <div className="flex flex-col p-3 bg-white rounded-t-xl h-fit">
          <div className="flex ">
            {loading ? (
              <Stack paddingRight={1}>
                <Skeleton width={80} height={80} variant="rounded" />
              </Stack>
            ) : (
              <div
                className="mr-2 rounded-full"
                style={{
                  minWidth: 80,
                  height: 80,
                  // borderRadius: 10,
                  // background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${img})`,
                  background: `url(${dp})`,
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
                <div className="course-title text-left h-16 lg:text-lg md:text-sm font-bold shrink text-ellipsis overflow-hidden">
                  {firstname}
                </div>
              )}
              <div>
                <>
                  <div className="category flex  items-center mb-4">
                    <TiLocation className=" text-xcool-new-blue" />
                    <span className=" text-xcool-new-gray text-sm mx-2">
                      {" "}
                      Location{" "}
                    </span>
                    <span> {item?.city}</span>
                  </div>

                  <div className="flex flex-wrap items-center">
                    <div className=" text-sm  text-xcool-new-gray">
                      Fees starting at
                    </div>
                    <span className=" mx-1">
                      {" "}
                      {Location?.countryCode === "IN" ? "Rs." : "$"}
                      {Location?.countryCode === "IN" ? (
                        <>
                          {calculateTeacherFee(priceIN, Location?.countryCode)}
                        </>
                      ) : (
                        <>
                          {calculateTeacherFee(priceUSD, Location?.countryCode)}
                        </>
                      )}
                      {/* {calculateTeacherFee(priceIN,priceUSD,Location?.countryCode)} */}
                    </span>
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </Stack>

      <div className=" w-full flex justify-around -center bg-white pb-2 rounded-md">
        <Link href={`${router.asPath}/${teacherSlug}`}>
          <button
            className=" w-full text-xs md:text-sm  text-xcool-new-blue-dark border rounded-md py-1 px-4 border-xcool-new-blue-dark"
            // onClick={() => applyHandler(item)}
          >
            View More Details
          </button>
        </Link>
        <div className=" ">
          <button
            className=" w-full text-xs md:text-sm  bg-xcool-new-blue-dark text-white border rounded-md py-1 px-4 border-xcool-new-blue-dark"
            onClick={() => applyHandler(item)}
          >
            Book Now
          </button>
        </div>
        {/* <button
          // className="w-1/2 p-1 h-full text-white bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500  rounded-br-lg"
          className="w-1/2 h-full "
          onClick={() => applyHandler(item)}
        >
          <span className="text-white bg-xcool-new-blue-dark rounded-md px-4 py-1  md:text-sm  text-xs">
            Book Now
          </span>
        </button> */}
      </div>
    </div>
  );

  return (
    // <HtmlTooltip
    //   className="md:block hidden"
    //   title={
    //     <div className="">
    //       <Typography color="inherit" className=" font-semibold text-center">
    //         Teacher Bio
    //       </Typography>
    //       <div
    //         className="profile-bio overflow-hidden opacity-50  text-xs px-2 my-3"
    //         dangerouslySetInnerHTML={{
    //           __html: para?.slice(0, 200) + "...",
    //         }}
    //       ></div>
    //     </div>
    //   }
    // >
    <div className="p-3 bg-white rounded-3xl h-fit">
      <div
        onMouseEnter={() => {
          setId(item?.id);
        }}
        onMouseOut={() => {
          setId(null);
        }}
        className=" w-28 h-28  rounded-full mx-auto flex justify-center items-center"
        style={{
          background: `url(${dp})`,
          backgroundSize: "cover",
        }}
      >
        {item?.videoUrl?.length > 0 && (
          <p onClick={openHandler} className=" cursor-pointer">
            <div className="flex justify-center text-white text-2xl items-center drop-shadow-2xl">
              <BsFillPlayCircleFill />
            </div>
          </p>
        )}
      </div>

      <div className="text-center font-bold my-3">{firstname}</div>
      <div className=" text-center flex items-center">
        {/* <Tooltip title={`Location`}> */}

        {item?.city && (
          <>
            <TiLocation className=" text-red-500" />

            <span>{item?.city}</span>
          </>
        )}
      </div>

      {/* <div
          className="profile-bio h-12 overflow-hidden opacity-50 text-xs"
          dangerouslySetInnerHTML={{
            __html: para,
          }}
        ></div> */}
      <div className="flex justify-between items-center my-2 flex-wrap">
        <div className=" text-xs font-bold">Fees starting at</div>
        <div className=" text-base font-bold">
          {Location?.countryCode === "IN" ? "Rs." : "$"}

          {getTeacherFee()}
        </div>
      </div>
      <div className=" flex justify-between flex-wrap items-center">
        <Link
          className="  bg-gradient-to-l from-orange-500 text-center via-orange-400 to-orange-300 text-white px-3 py-1 rounded-3xl"
          href={`${router.asPath}/${teacherSlug}`}
        >
          {/* <div className="w-1/2 bg-[#fa9b05] text-white p-1 rounded-3xl"> */}
          View
          {/* </div> */}
        </Link>
        <button
          className="w-1/2 p-1 h-full text-white bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500 rounded-3xl"
          onClick={() => applyHandler(item)}
        >
          {" "}
          Book Now
        </button>
      </div>
    </div>
    // </HtmlTooltip>
  );
};
