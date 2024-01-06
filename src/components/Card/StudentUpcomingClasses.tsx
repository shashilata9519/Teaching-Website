
import axios from "axios";
import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";

import { ClassCard } from "./StudentClassCard";

export const StudentUpcomingClasses = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/studentUpcomingClasses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div>
        { isLoading===false && 
          (data?.length>0?(data?.map((item: any) => {
            return <ClassCard key={item?.id} item={item} />;
          })):(
            <div className=" text-2xl mt-4 ">No Upcoming class available</div>
          ))
        }
      </div>
    </>
  );
};
