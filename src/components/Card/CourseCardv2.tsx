import Link from "next/link";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useModal } from "@/context/ModalContext";
import { Skeleton, Stack } from "@mui/material";
import Slug from "@/pages/course/[slug]";
import Course from "@/pages/teacher/[slug]/[course]";

export const CourseCardv2 = ({
  courseName,
  img,
  slug,
  cat,
  NoOfteacher,
  teacherImage,
  summary,
  level,
  showTeacher,
  item,
  link,
  loading,
  teacherName,
  teacherSlug,
  genreSlug,
}: any) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));
  const {
    setModalOpen,
    setModalData,
    modalData,
    setModalType,
    setFilter,
    filter,
  }: any = useModal();
  console.log(level,'slug')

  const applyHandler = (item: any) => {
    // console.log(item, slug, teacherSlug, genreSlug, "item");
    // setFilter({
    //   subcategory:""
    // })

    setModalData({
      ...modalData,
      Genre: genreSlug,
      Courses: slug,
      Teachers: teacherSlug || "",
    });

    setModalOpen(true);
  };

  return (
    // <div className="flex flex-col" style={{ minWidth: "300px", maxWidth: "300px" }}>
    <div className="flex flex-col min-w-fit mb-4 w-full bg-white drop-shadow rounded-md">
      <HtmlTooltip
        className="md:block hidden"
        title={
          <div className=" h-fit overflow-hidden">
            <Typography color="inherit" className=" font-semibold">
              {courseName}
            </Typography>
            <div
              className={`info-content text-xs px-3 my-3`}
              dangerouslySetInnerHTML={{
                __html: summary?.slice(0, 200),
              }}
            ></div>
          </div>
        }
      >
        <Stack spacing={10}>
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
                    background: `url(${img})`,
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
                  <div className="course-title text-left lg:text-lg md:text-sm font-bold h-16 shrink text-ellipsis overflow-hidden">
                    {courseName}
                  </div>
                )}
                {loading ? (
                  <Skeleton />
                ) : (
                  <div>
                    {showTeacher && (
                      <>
                        <div className="image-footer flex items-center mb-5">
                          <div className="category text-xcool-new-gray">{cat}</div>
                          <div className="  mx-2 my-1">
                            {level === 1 && (
                              <div className="text-white text-xs px-3 bg-xcool-new-blue rounded-full">
                                Beginner
                              </div>
                            )}
                            {level === 2 && (
                              <div className="text-white text-xs px-3 bg-[#fa9b05] rounded-full">
                                Intermediate
                              </div>
                            )}
                            {level === 3 && (
                              <div className="text-white text-xs px-3 bg-[#ca2c1b] rounded-full">
                                Advanced
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap">
                          <div className="offered-by  text-sm  text-xcool-new-gray">
                            Offered By
                          </div>
                          <div className="offered-by-panel px-2 text-sm flex items-center ">
                            <div className="">{NoOfteacher} Teachers</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Stack>
      </HtmlTooltip>
      <div className=" w-full flex justify-around -center bg-white pb-2 rounded-md">
        <Link href={link ?? "#"} className=" ">
          <button
            className=" w-full text-xs md:text-sm  text-xcool-new-blue-dark border rounded-md py-1 px-4 border-xcool-new-blue-dark"
            // onClick={() => applyHandler(item)}
          >
            View More Details
          </button>
        </Link>
        <div  className=" ">
          <button
            className=" w-full text-xs md:text-sm  bg-xcool-new-blue-dark text-white border rounded-md py-1 px-4 border-xcool-new-blue-dark"
            onClick={() => applyHandler(item)}
          >
           Book Now
          </button>
        </div>
       
        {/* <div
          // className="w-1/2 p-1 h-full text-white bg-gradient-to-r from-cyan-800 via-cyan-800 to-teal-500  rounded-br-lg"
          className=""
          onClick={() => applyHandler(item)}
        >
          <span className="text-white bg-xcool-new-blue-dark rounded-md px-4 py-1  md:text-sm  text-xs">
            Book Now
          </span>
        </div> */}
      </div>
    </div>
  );
};
