import { useRouter } from "next/router";
import Head from "next/head";
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";


import { StudentBatchesOngoing } from "@/components/Card/StudentBatchesOngoing";

import React, { useEffect, useState } from "react";
import Application from "./TeacherApplication";
import TeacherBatch from "./teacherBatch";

import {
  AppBar,
  Breadcrumbs,
  Drawer,
  Toolbar,
  Typography,
  makeStyles,
} from "@mui/material";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

import { UploadDocument } from "@/components/Card/UploadDocument";

import { CourseRequest } from "@/components/Card/CourseRequest";
import { StudentResource } from "@/components/Card/StudentResource";
import { useModal } from "@/context/ModalContext";
import { HiMenu } from "react-icons/hi";
import { useAccountType } from "@/hooks/useAccountType";
import ResponsiveDrawer from "@/common/ResponsiveDrawer";
import { StudentApplication } from "@/components/Card/StudentApplication";
import TeacherApplication from "./TeacherApplication";

export default () => {
  const router = useRouter();
  const { tab } = router.query;
  console.log(tab, "tabquery");

  const {
    setModalOpen,
    setModalData,
    modalData,
    setModalType,
    setFilter,
    filter,
    activeTab,
    setActiveTab,
  }: any = useModal();

  const [selectedIndex, setSelectedIndex] = useState(activeTab);
  const { AccountType } = useAccountType();

  // useEffect(() => {

  //   const Type = localStorage.getItem("type");
  //   SetAccountType(Type ? Type : "");

  // }, [AccountType, activeTab]);

  // useEffect(() => {
  //   // Get the active tab index from the query parameter or set a default value

  //   const queryTab: any = parseInt(query.tab, 10) || 0;
  //   const reload: Boolean = Boolean(query.reload);
  //   // if(reload){
  //   //   // window.location.reload();
  //   // }
  //   setActiveTab(queryTab);
  // }, [router.query.tab]);

  const handleTabChange = (index: any) => {
    setActiveTab(activeTab);
    router.push(`?tab=${index}`, undefined, { shallow: true });
  };

  const showHandler = () => {
    setModalOpen(true);
    setModalType("sideBar");
  };

  console.log(activeTab);
  return (
    <>
      <Head>
        {" "}
        <title>Dashboard</title>
      </Head>
      <div className="py-7 px-3 container mx-auto">
        <Breadcrumbs className="my-2" aria-label="breadcrumb">
          <div className=" text-xcool-new-blue font-bold">
            <Link href="/" className="flex items-center">
              <span>
                <AiFillHome fontSize="inherit" />
              </span>

              <span className="mx-1"> HOME</span>
            </Link>
          </div>

          <div className=" text-xcool-new-blue font-bold">
            <div className="flex items-center">
              <Link href={`/account/dashboard`} className="flex items-center">
                <span className="mx-1 uppercase"> Dashboard</span>
              </Link>
            </div>
          </div>
        </Breadcrumbs>

        {/* <div className=" text-4xl font-bold my-2">Dashboard</div> */}
        {AccountType === "student" && (
          // <Tab.Group selectedIndex={activeTab} onChange={handleTabChange}>
          //   <div className="">
          //     <Tab.List
          //       className={
          //         "hidden md:flex flex-col col-span-1 gap-2 mt-5 border border-xcool-green h-fit py-3 rounded-lg"
          //       }
          //     >
          //       <TabHeading title="Batches" />

          //       <TabHeading title="Applications " />
          //       <TabHeading title="Resources " />
          //       <TabHeading title="Request " />
          //     </Tab.List>
          //     <div
          //       className="block md:hidden text-3xl cursor-pointer"
          //       onClick={showHandler}
          //     >
          //       <HiMenu />
          //     </div>
          //     <Tab.Panels className={"col-span-4"}>
          //       <Tab.Panel>
          //       <StudentUpcomingClasses />
          //     </Tab.Panel>
          //       <Tab.Panel>
          //         <StudentBatchesOngoing />
          //       </Tab.Panel>
          //       <Tab.Panel>
          //         <StudentBatchesCompleted />
          //       </Tab.Panel>
          //       <Tab.Panel>
          //         <StudentBatchesList />
          //       </Tab.Panel>
          //       <Tab.Panel>
          //         <StudentResource />
          //       </Tab.Panel>
          //       <Tab.Panel>
          //         <CourseRequest />
          //       </Tab.Panel>
          //     </Tab.Panels>
          //   </div>
          // </Tab.Group>
          <div>
            {tab == "0" && <StudentBatchesOngoing />}

            {tab == "1" && <StudentApplication />}
            {tab == "2" && <StudentResource />}
            {tab == "3" && <CourseRequest />}
          </div>
        )}
        {AccountType === "teacher" && (
          // <Tab.Group selectedIndex={activeTab}>
          //   <div className=" grid md:grid-cols-5 grid-cols-1 gap-2">
          //     <Tab.List
          //       className={
          //         " hidden md:flex flex-col col-span-1 gap-2 mt-5 border border-xcool-green h-fit py-3 rounded-lg"
          //       }
          //     >
          //       <TabHeading title="Batches" />

          //       <TabHeading title="Applications " />
          //       <TabHeading title="Resources" />
          //     </Tab.List>
          //     <div
          //       className="block md:hidden text-3xl cursor-pointer"
          //       onClick={showHandler}
          //     >
          //       <HiMenu />
          //     </div>
          //     <Tab.Panels className={"col-span-4"}>
          //       <Tab.Panel>
          //         <TeacherBatch />
          //       </Tab.Panel>

          //       <Tab.Panel>
          //         <Application />
          //       </Tab.Panel>
          //       <Tab.Panel>
          //         <UploadDocument />
          //       </Tab.Panel>
          //     </Tab.Panels>
          //   </div>
          // </Tab.Group>
          <div>
            {activeTab == "0" && <TeacherBatch />}

            {activeTab == "1" && <TeacherApplication />}
            {activeTab == "2" && <UploadDocument />}
          </div>
        )}
      </div>
    </>
  );
};
