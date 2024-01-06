
import axios from "axios";
import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";

import { StudentBatchesCard } from "./StudentBatchesCard";

export const StudentBatchesCompleted = ({ item }: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentCompletedBatch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false)
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isRefresh]);

  return (
    <>
      { isLoading===false &&
        (data?.length>0?(data?.map((item: any) => {
          return <StudentBatchesCard key={item?.id} item={item} active={true} completed={false}  setRefresh={setRefresh} />;
        })):(
          <div className=" text-2xl mt-4 ">No completed batch available</div>
        ))
      }
    </>
  );
};
