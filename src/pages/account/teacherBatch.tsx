import { DemoBatchModal } from "@/common/Modal/DemoBatchModal";
import { NewBatchModal } from "@/common/Modal/NewBatchModal";
import TitleText from "@/common/Text/TitleText";
import { TeacherBatchesCard } from "@/components/Card/TeacherBatchesCard";
import { Repo } from "@/services/Repo";
import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import TeacherBatchCompleted from "./teacherBatchCompleted";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@mui/material";

export default () => {
  const [data, setData] = useState<any>([]);
  const [completedBatch, setCompletedBatch] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  let [isRefresh, setRefresh] = React.useState<any>(false);

  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherBatches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTeacherCompletedBatches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCompletedBatch(response?.data?.data);
        setIsLoading1(false);
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isRefresh]);
  const [myCourse, setMyCourse] = useState<any>([]);
  const [mystudent, setMyStudent] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const data1 = await Repo.courseDropDown();
      setMyCourse(data1);
      const data2 = await Repo.studentDropdown();
      setMyStudent(data2);
    })();
  }, []);
  const [activeTabs, setActiveTabs] = useState(0);

  const handleTabChange = (index: any) => {
    setActiveTabs(index);
  };

  return (
    <>
      <Head>
        {" "}
        <title>Batches</title>
      </Head>

      <div>
        <Tab.Group onChange={handleTabChange} selectedIndex={activeTabs}>
          <div className=" flex justify-between flex-wrap">
            <Tab.List className={" flex flex-wrap justify-center gap-2 mt-5"}>
              {/* <TabHeading title="Upcoming Classes" /> */}
              <TabHeading title="In Progress" />
              <TabHeading title="Completed" />
            </Tab.List>
          </div>
          <div className="hidden gap-1 justify-end">
            <div
              className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
              onClick={() => modalHandler({ type: "New" })}
              // onClick={()=>toast.success("New Batch created",{autoClose:2000})}
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

          <Tab.Panels className={"my-7"}>
            <Tab.Panel>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  height={200}
                  className=" rounded-3xl mb-3"
                />
              ) : (
                <>
                  {data?.length > 0 ? (
                    data?.map((item: any) => {
                      return (
                        <TeacherBatchesCard
                          completed={false}
                          key={item?.id}
                          item={item}
                          setRefresh={setRefresh}
                        />
                      );
                    })
                  ) : (
                    <div className=" text-2xl mt-4 ">No batch available</div>
                  )}
                </>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {/* <TeacherBatchCompleted /> */}
              {isLoading1 ? (
                <Skeleton
                  variant="rectangular"
                  height={200}
                  className=" rounded-3xl mb-3"
                />
              ) : (
                <>
                  {completedBatch?.length > 0 ? (
                    completedBatch?.map((item: any) => {
                      return (
                        <TeacherBatchesCard
                          completed={true}
                          key={item?.id}
                          item={item}
                          setRefresh={setRefresh}
                        />
                      );
                    })
                  ) : (
                    <div className=" text-2xl mt-4 ">No batch available</div>
                  )}
                </>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <ToastContainer />
      </div>

      {modalState.type === "New" && (
        <NewBatchModal
          modalState={modalState}
          closeModal={setmodalState}
          mystudent={mystudent}
          myCourse={myCourse}
          setRefresh={setRefresh}
        />
      )}
      {modalState.type === "Demo" && (
        <DemoBatchModal
          modalState={modalState}
          closeModal={setmodalState}
          mystudent={mystudent}
          myCourse={myCourse}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};
