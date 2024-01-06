import { DemoBatchModal } from "@/common/Modal/DemoBatchModal";
import { NewBatchModal } from "@/common/Modal/NewBatchModal";
import TitleText from "@/common/Text/TitleText";
import { TeacherBatchesCard } from "@/components/Card/TeacherBatchesCard";
import { Repo } from "@/services/Repo";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export default () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  let [isRefresh,setRefresh]=React.useState<any>(false)

  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }
  console.log(modalState,'all')
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherCompletedBatches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
        setRefresh(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isRefresh]);
  const [myCourse, setMyCourse] = useState<any>([]);
  const [mystudent, setMyStudent] = useState<any>([]);

  // useEffect(() => {
  //   (async () => {
  //     const data1 = await Repo.courseDropDown();
  //     setMyCourse(data1);
  //     const  data2= await Repo.studentDropdown();
  //     setMyStudent(data2);
  //   })();
  // }, [modalState]);


  return (
    <>
      <Head>
        {" "}
        <title>Batches</title>
      </Head>

      <div>
        <div>
          <div className="flex gap-1 justify-end">
            <div
              className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
              onClick={() => modalHandler({ type: "New" })}
            >
              New Batch
            </div>
            <div
              className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
              onClick={() => modalHandler({ type: "Demo" })}
            >
              Demo Batch
            </div>
          </div>

          {isLoading === false &&
            (data?.length > 0 ? (
              data?.map((item: any) => {
                return <TeacherBatchesCard completed={true} key={item?.id} item={item} setRefresh={setRefresh}/>;
              })
            ) : (
              <div className=" text-2xl mt-4 ">No batch available</div>
            ))}
        </div>
      </div>
      {modalState.type === "New" && (
        <NewBatchModal modalState={modalState} closeModal={setmodalState} mystudent={mystudent} myCourse={myCourse} setRefresh={setRefresh} />
      )}
      {modalState.type === "Demo" && (
        <DemoBatchModal modalState={modalState} closeModal={setmodalState} mystudent={mystudent} myCourse={myCourse} setRefresh={setRefresh} />
      )}
      
    </>
  );
};
