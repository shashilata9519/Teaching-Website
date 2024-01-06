import YogaGirl from "@/assets/YogaGirl";
import { LoginModal } from "@/common/Modal/LoginModal";
import { TextModal } from "@/common/Modal/TextModal";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function WelcomeBanner() {
  const [category, setCategory] = useState<any>([]);
  const [subCategory, setSubCategory] = useState<any>([]);
  const [activeMenu, setActiveMenu] = useState<any>("Music");


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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categoryHandler = (type: string, id: any) => {
    setActiveMenu(type);
    if (type === "Yoga") {
      setmodalState({
        isOpen: true,
        type: null,
      });
      setActiveMenu("Music");
      return;
    }
  };
  const toFindDuplicates: any = (arry: any, id: any) =>
    arry.filter((item: any, index: any) => item.category_id === id);
  const Music: [] = toFindDuplicates(subCategory, 1);
  const Dance: [] = toFindDuplicates(subCategory, 8);

  return (
    <>
      <div
        className=" w-full grid lg:grid-cols-4 gap-3 rounded-3xl py-3 px-10"
        style={{
          background: `linear-gradient(90deg, #1A2980 0%, #26D0CE 100%)`,
        }}
      >
        <div className=" lg:col-span-3 md:col-span-1 flex flex-col flex-wrap justify-center items-start">
          <p className="font-dm lg:text-5xl md:text-5xl sm:text-3xl mb-3 text-white font-bold">
            Digital Gurucool for all things 
          </p>
          <p className="text-white lg:text-2xl md:text-2xl mb-3">
            Learn creative courses from curated experts anytime, anywhere.
          </p>

          <div className="flex gap-1 text-white mb-3">
            {category.map((item: any) => {
              return (
                <div
                  key={item?.id}
                  onClick={() => categoryHandler(item?.category, item?.id)}
                  className={`${
                    item?.category === activeMenu
                      ? "bg-white text-black"
                      : " hover:border-xcool-green hover:text-white hover:bg-xcool-new-blue"
                  } border cursor-pointer rounded-full px-4`}
                >
                  {item?.category}
                </div>
              );
            })}
          </div>
          <div className="flex  text-gray-600 md:w-full w-full flex-wrap gap-1 py-1 mb-3">
            {activeMenu === "Music" &&
              Music &&
              Music?.map((item: any) => {
                return (
                  <Link
                    key={item?.id}
                    href={`/learn/music/${item?.slug}`}
                    className="border cursor-pointer text-xcool-new-blue bg-gray-300 rounded-full px-4 hover:text-white"
                  >
                    {item?.subcategory}
                  </Link>
                );
              })}
            {activeMenu === "Dance" &&
              Dance &&
              Dance?.map((item: any) => {
                return (
                  <Link
                    key={item?.id}
                    href={`/learn/dance/${item?.slug}`}
                    className="border cursor-pointer text-xcool-new-blue bg-gray-300 rounded-full px-4 hover:text-white"
                  >
                    {item?.subcategory}
                  </Link>
                );
              })}
            {/* {subCategory &&
              subCategory?.map((item: any) => {
                return (
                  <Link
                    key={item?.id}
                    href={`/learn/music/${item?.slug}`}
                    className="border cursor-pointer text-xcool-new-blue bg-gray-300 rounded-full px-4 hover:text-white"
                  >
                    {item?.subcategory}
                  </Link>
                );
              })} */}
          </div>
        </div>

        <div className=" flex justify-center max-sm:hidden">
          <YogaGirl />
        </div>
      </div>
      <TextModal modalState={modalState} closeModal={setmodalState} />
    </>
  );
}

export default WelcomeBanner;
