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
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import { Skeleton } from "@mui/material";

export const StudentBatchesOngoing = ({ item }: any) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState(0);
  const [isRefresh, setRefresh] = useState(false);
  const [completedBatch, setCompletedBatch] = useState<any>([]);

  const handleTabChange = (index: any) => {
    setActiveTabs(index);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentCompletedBatch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCompletedBatch(response?.data?.data);
        setIsLoading(false);
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isRefresh]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getStudentOngoingBatch`, {
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
  }, []);

  return (
    <>
      <Tab.Group onChange={handleTabChange} selectedIndex={activeTabs}>
        <Tab.List className={" flex flex-wrap gap-2 mt-5"}>
          {/* <TabHeading title="Upcoming Classes" /> */}
          <TabHeading title="In Progress" />
          <TabHeading title="Archived" />
        </Tab.List>

        <Tab.Panels className={"my-7"}>
          <Tab.Panel>
            {isLoading ? (
              <>
                {" "}
                <Skeleton
                  variant="rectangular"
                  height={200}
                  className=" rounded-3xl mb-3"
                />
              </>
            ) : (
              <>
                {data.length > 0 ? (
                  <>
                    {data?.map((item: any) => {
                      return (
                        <StudentBatchesCard
                          key={item?.id}
                          item={item}
                          completed={false}
                          setRefresh={setRefresh}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className=" text-2xl mt-4 ">No Courses In Progress</div>
                )}
              </>
            )}
          </Tab.Panel>
          <Tab.Panel>
            {isLoading ? (
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
                      <StudentBatchesCard
                        key={item?.id}
                        item={item}
                        active={true}
                        completed={false}
                        setRefresh={setRefresh}
                      />
                    );
                  })
                ) : (
                  <div className=" text-2xl mt-4 ">
                    No completed batch available
                  </div>
                )}
              </>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
