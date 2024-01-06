import { useRouter } from "next/router";
import Head from "next/head";

import { ApplicationCard } from "@/components/Card/ApplicationCard";
import { useEffect, useState } from "react";
import axios from "axios";
import TitleText from "@/common/Text/TitleText";
import { Repo } from "@/services/Repo";
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import { Skeleton } from "@mui/material";

export default () => {
  const router = useRouter();

  const [AccountType, SetAccountType] = useState<any>("");
  const [isRefresh, setRefresh] = useState(true);
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
  useEffect(() => {
    (async () => {
      if (AccountType == "teacher") {
        const pendingData = await Repo.getPendingTeacherApplication();
        setPendingData(pendingData);

        const paidData = await Repo.getPaidTeacherApplication();
        setPaidData(paidData);

        const archiveData = await Repo.getArchiveTeacherApplication();
        setArchiveData(archiveData);
        setIsLoading(false);
      }
    })();
    setRefresh(false);
  }, [AccountType, isRefresh]);

  return (
    <>
      <Head>
        {" "}
        <title>Application</title>
      </Head>

      <div>
        <Tab.Group onChange={handleTabChange} selectedIndex={activeTabs}>
          <Tab.List className={"hidden  flex-wrap gap-2 mt-5"}>
            {/* <TabHeading title="Upcoming Classes" /> */}
            <TabHeading title="Paid" />
            <TabHeading title="Pending" />
            <TabHeading title="Archived" />
          </Tab.List>

          <Tab.Panels className={"my-7"}>
            <Tab.Panel>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    className=" rounded-3xl mb-3"
                  />
                </>
              ) : (
                <>
                  {paidData?.length > 0 ? (
                    <>
                      {paidData?.map((i: any, index: any) => {
                        return (
                          <ApplicationCard
                            data={i}
                            key={index}
                            student={i?.student}
                            course_id={i?.course_id}
                            timeSlot={i?.custom_timeslot}
                            batch={i?.batch?.batch_name}
                            courseName={i?.course?.course_name}
                            setRefresh={setRefresh}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className=" text-2xl mt-4 ">
                      No Paid batch Available
                    </div>
                  )}
                </>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    className=" rounded-3xl mb-3"
                  />
                </>
              ) : (
                <>
                  {pendingData?.length > 0 ? (
                    <>
                      {pendingData?.map((i: any, index: any) => {
                        return (
                          <ApplicationCard
                            data={i}
                            key={index}
                            student={i?.student}
                            course_id={i?.course_id}
                            timeSlot={i?.custom_timeslot}
                            batch={i?.batch?.batch_name}
                            courseName={i?.course?.course_name}
                            setRefresh={setRefresh}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className=" text-2xl mt-4 ">
                      No Pending batch Available
                    </div>
                  )}
                </>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    className=" rounded-3xl mb-3"
                  />
                </>
              ) : (
                <>
                  {archiveData?.length > 0 ? (
                    archiveData?.map((i: any, index: any) => {
                      return (
                        <ApplicationCard
                          data={i}
                          key={index}
                          student={i?.student}
                          course_id={i?.course_id}
                          timeSlot={i?.custom_timeslot}
                          batch={i?.batch?.batch_name}
                          courseName={i?.course?.course_name}
                          setRefresh={setRefresh}
                        />
                      );
                    })
                  ) : (
                    <div className=" text-2xl mt-4 ">
                      No Archived batch available
                    </div>
                  )}
                </>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="">
        {/* {isLoading === false &&
          (data?.length > 0 ? (
            data?.map((i: any, index: any) => {
              return (
                <ApplicationCard
                  data={i}
                  key={index}
                  student={i?.student}
                  course_id={i?.course_id}
                  timeSlot={i?.custom_timeslot}
                  batch={i?.batch?.batch_name}
                  courseName={i?.course?.course_name}
                  setRefresh={setRefresh}
                  
                />
              );
            })
          ) : (
            <div className=" text-2xl mt-4 ">No Application available</div>
          ))} */}
      </div>
    </>
  );
};
