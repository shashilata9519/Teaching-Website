import { TextModal } from "@/common/Modal/TextModal";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CourseCardv2 } from "../Card/CourseCardv2";
import { useModal } from "@/context/ModalContext";
import { Skeleton } from "@mui/material";
import Image from "next/image";
function WelcomeBanner2() {
  const [courses, setCourses] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [activeMenu, setActiveMenu] = useState<any>("Music");
  const [loading, setLoading] = useState<any>(true);
  const [categoryloading, setCategoryLoading] = useState<any>(true);

  const [filter, setfilter] = useState<any>({
    category: activeMenu,
    subcategory: "Hindustani-Classical-Vocals",
  });
  const { isModalOpen, setModalOpen, setModalData, modalData, setFilter }: any =
    useModal();
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`)
      .then((response) => {
        setCategory(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubCategory`)
      .then((response) => {
        setSubCategory(response?.data?.data);
        setCategoryLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    // http://127.0.0.1:8000/api/getAllCourses
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCourses`, {
        subcategory: modalData?.Genre,
      })
      .then((response) => {
        setCourses(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [modalData?.Genre]);

  const toFindDuplicates: any = (arry: any, id: any) =>
    arry.filter((item: any, index: any) => item.category_id === id);
  const Music: [{ slug: "" }] = toFindDuplicates(subCategory, 1);
  const Dance: [{ slug: "" }] = toFindDuplicates(subCategory, 8);

  const applyHandler = (item: any) => {
    setModalOpen(true);
  };
  const [showAll, setShowAll] = useState(false);

  const handleExploreClick = () => {
    setShowAll(true);
  };

  const displayedSubcategories = showAll ? subCategory : subCategory.slice(0, 8);


  return (
    <>
      <div
        className=" w-full gap-3 rounded-3xl container mx-auto"
        // style={{
        //   background: `linear-gradient(90deg, #1A2980 0%, #26D0CE 100%)`,
        // }}
      >
        <div className="flex flex-wrap md:justify-center items-center py-5 text-start md:mx-auto bg-[#FBFFFF]">
          <div className=" w-full md:w-2/3 md:px-6">
            <p className="font-dm banner-title text-2xl  md:text-5xl mx-2   my-2 md:my-5 font-bold md:py-10 ">
              Digital{" "}
              <span className=" border-bottom border-b-4 border-xcool-new-blue border-none">
                {" "}
                Gurucool
              </span>{" "}
              <br /> for all things{" "}
              <span className=" text-xcool-new-blue"> Creative</span>
            </p>
            <p className="lg:text-md md:text-xl mx-2 text-left text-xcool-new-gray text-sm mb-4 md:w-2/3">
            Choose from a wide array of courses and start learning today!
            </p>
            <div className="w-full flex justify-start mb-4">
              <button
                className=" mx-4 border text-sm md:text-xl py-2 cursor-pointer rounded-full text-white bg-xcool-new-blue-dark hover:bg-xcool-new-blue-hover px-2 md:px-8 mt-2"
                onClick={applyHandler}
              >
                Book now
              </button>
              {/* <Link
                href={`/learn/${activeMenu}/${
                  modalData?.Genre ? modalData?.Genre : ""
                }`}
                className="border border-xcool-new-blue-dark hover:bg-xcool-new-blue-button cursor-pointer text-black rounded-full px-2 md:px-8 mt-2 text-sm md:text-xl py-2"
              >
                Explore more
                
              </Link> */}
            </div>
            <div className="flex cursor-pointer flex-wrap text-sm mt-6  font-sm md:font-medium text-black justify-center md:w-2/3 place-content-center gap-3">
              {categoryloading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={30}
                    className="rounded-3xl"
                  />

                  <Skeleton
                    variant="rectangular"
                    width={100}
                    height={30}
                    className="rounded-3xl"
                  />
                  <Skeleton
                    variant="rectangular"
                    width={200}
                    height={30}
                    className="rounded-3xl"
                  />
                </>
              ) : (
                <>
                  {displayedSubcategories?.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className="min-w-fit rounded-md border-gray-700"
                      >
                        <div
                          key={item?.id}
                          onClick={() => {
                            setModalData({
                              ...modalData,

                              Genre: item?.slug,
                            });
                          }}
                          className={`${
                            item?.slug === modalData?.Genre
                              ? "active border-2 font-semibold border-xcool-new-blue"
                              : "md:hover:text-black  md:hover:bg-xcool-new-blue"
                          } bg-xcool-new-blue-button inline-block px-2 md:px-4 py-2 rounded-md`}
                        >
                          {item?.subcategory}
                        </div>
                      </div>
                    );
                  })}{!showAll && <button className=" text-xcool-new-blue underline text-sm" onClick={handleExploreClick}>View more</button>}

                </>
              )}
            </div>
          </div>
          <div className="my-4 md:my-5 w-1/3 relative aspect-square hidden md:block">
            <Image
              // width={100}
              // height={100}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="learn music"
              className="relative md:px-6"
              src="/Frame46.png"
            />
          </div>
        </div>
      </div>
      <div className=" bg-xcool-new-blue-bg flex flex-col py-4 container mx-auto">
        {/* <div className="flex  text-gray-600 flex-wrap gap-1 py-1 mb-3 items-start justify-center w-full">
         
        </div> */}

        <div className="w-full justify-center  flex overflow-x-auto mt-3 px-3 md:px-16">
          <div className="flex flex-wrap justify-center w-full">
            <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-full">
              {courses?.slice(0, 9)?.map((item: any) => {
                return (
                  <CourseCardv2
                    key={item?.id}
                    courseName={item?.course_name}
                    slug={item?.slug}
                    img={item?.img}
                    cat={activeMenu}
                    NoOfteacher={item?.course_count}
                    teacherImage={item?.image}
                    level={item?.level}
                    summary={item?.summary}
                    showTeacher={true}
                    item={item}
                    link={`/course/${item?.slug}`}
                    loading={loading}
                    genreSlug={item?.subcat?.slug}
                  />
                );
              })}
              
            </div>
            <Link
                href={`/learn/${activeMenu}/${
                  modalData?.Genre ? modalData?.Genre : ""
                }`}
                className="border bg-white border-xcool-new-blue-dark hover:bg-xcool-new-blue-button cursor-pointer text-black rounded-full px-2 md:px-8 mt-2 text-sm md:text-xl py-2"
              >
                Explore more
                {/* in "
            {filter.subcategory ? filter.subcategory : activeMenu}" */}
              </Link>
          </div>
        </div>
      </div>
      <TextModal modalState={modalState} closeModal={setmodalState} />
    </>
  );
}

export default WelcomeBanner2;
