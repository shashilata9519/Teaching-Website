import Logo from "@/assets/logo";
import TitleText from "@/common/Text/TitleText";
import { statusStudent } from "@/utils/Helpers";
import { Utils } from "@/utils/Utils";
import axios from "axios";
import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { StudentBatchesCard } from "./StudentBatchesCard";
import { ClassCard } from "./StudentClassCard";
import { TeacherClassCard } from "./TeacherClassCard";

export const TeacherUpcomingClasses = ({ item }: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  let [isRefresh,setRefresh]=React.useState<any>(false)

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/teacherUpcomingClasses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false)
        setRefresh(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRefresh]);

  

  return (
    <>
      <div>
        { isLoading===false && (data?.length > 0 ? (
          data?.map((item: any) => {
            return <TeacherClassCard key={item?.id} item={item} setRefresh={setRefresh}/>;
          })
        ) : (
          <div className=" text-2xl mt-4 ">No Upcoming classes available</div>
        ))}
      </div>
    </>
  );
};
