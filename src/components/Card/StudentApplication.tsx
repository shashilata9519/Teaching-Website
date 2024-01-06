import React from "react";

import { useEffect, useState } from "react";

import { StudentBatchesCard } from "./StudentBatchesCard";

import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import { Repo } from "@/services/Repo";

export const StudentApplication = ({ item }: any) => {
  const [data, setData] = useState<any>([]);
  const [AccountType, SetAccountType] = useState<any>("");
  const [isRefresh, setRefresh] = useState(false);
  const [activeTabs, setActiveTabs] = useState(0);
  const [paidData, setPaidData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (index: any) => {
    setActiveTabs(index);
  };

  useEffect(() => {
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);
  }, []);
  // console.log(data, "data");

  useEffect(() => {
    (async () => {
      if (AccountType == "student") {
        // const pendingData = await Repo.getPendingStuApplication();
        // setPendingData(pendingData);
        // setIsLoading(false);
        const paidData = await Repo.getPaidStuApplication();
        setPaidData(paidData);
        setIsLoading(false);
       
        const archiveData = await Repo.getArchiveStuApplication();
        setArchiveData(archiveData);
        setIsLoading(false);
        setRefresh(false)
      }
    })();
  }, [AccountType, isRefresh]);

  return (
    <>
      {/* {AccountType == "teacher" ? (
        data?.map((i: any, index: any) => {
          return (
            <ApplicationCard
              data={i}
              key={index}
              student={i?.student}
              timeSlot={i?.custom_timeslot}
              batch={i?.batch?.batch_name}
              setRefresh={setRefresh}
              courseName={i?.course?.course_name}
            />
          );
        })
      ) : ( */}
      <div>
        <Tab.Group onChange={handleTabChange} selectedIndex={activeTabs}>
          <Tab.List className={"flex flex-wrap  gap-2 mt-5"}>
            {/* <TabHeading title="Upcoming Classes" /> */}
            <TabHeading title="Active" />
            {/* <TabHeading title="Pending" /> */}
            <TabHeading title="Completed" />
          </Tab.List>

          <Tab.Panels className={"my-7"}>
            <Tab.Panel>
              {isLoading === false &&
                (paidData?.length > 0 ? (
                  <>
                    {paidData?.map((item: any) => {
                      return (
                        <StudentBatchesCard
                          key={item?.id}
                          item={item}
                          completed={true}
                          setRefresh={setRefresh}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className=" text-2xl mt-4 ">No Paid batch Available</div>
                ))}
            </Tab.Panel>

            <Tab.Panel>
              {isLoading === false &&
                (archiveData?.length > 0 ? (
                  archiveData?.map((item: any) => {
                    return (
                      <StudentBatchesCard
                        key={item?.id}
                        item={item}
                        completed={true}
                        setRefresh={setRefresh}
                      />
                    );
                  })
                ) : (
                  <div className=" text-2xl mt-4 ">
                    No Archived batch available
                  </div>
                ))}
            </Tab.Panel>
            <Tab.Panel>
              {isLoading === false &&
                (pendingData?.length > 0 ? (
                  <>
                    {pendingData?.map((item: any) => {
                      return (
                        <StudentBatchesCard
                          key={item?.id}
                          item={item}
                          completed={true}
                          setRefresh={setRefresh}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className=" text-2xl mt-4 ">
                    No Pending batch Available
                  </div>
                ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* {
            data?.map((item: any) => {
              return (
                <StudentBatchesCard
                  key={item?.id}
                  item={item}
                  completed={true}
                  setRefresh={setRefresh}
                />
              );
            }
            )
          } */}
      </div>
      {/* )} */}
    </>
  );
};
