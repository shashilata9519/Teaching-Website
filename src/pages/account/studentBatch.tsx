import TitleText from "@/common/Text/TitleText";
import { StudentBatchesCard } from "@/components/Card/StudentBatchesCard";
import { StudentApplication } from "@/components/Card/StudentApplication";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default  () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentBatches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Head>
        {" "}
        <title>Batches</title>
      </Head>

      
      <div className="lg:p-8 md:p-10 p-6  lg:mx-auto lg:w-8/12">
        <TitleText>My Batches</TitleText>

        <StudentApplication />
      </div>
    </>
  );
};
