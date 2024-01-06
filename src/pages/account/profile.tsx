import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import { useState } from "react";

import { ProfileCourse } from "@/components/Profile/ProfileCourse";

import Head from "next/head";
import { ProfileUpdate } from "@/components/Profile/ProfileUpdate";
import { TimeSlotUpdate } from "@/components/Profile/TimeSlotUpdate";
import { QualificationUpdate } from "@/components/Profile/QualificationUpdate";
import axios from "axios";
import { ProfileCard } from "@/components/Profile/ProfileCard";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { QualificationCard } from "@/components/Profile/QualificationCard";
import { SocialMediaCard } from "@/components/Profile/SocialMediaCard";
import { SocialMediaUpdate } from "@/components/Profile/SocialMediaUpdate";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { Repo } from "@/services/Repo";
import UploadVideo from "@/components/Profile/UploadVideo";
import SpokenLanguage from "@/components/Profile/SpokenLanguage";
import { toast } from "react-toastify";
import { Achievemensts } from "@/components/Profile/Achievements";
export default () => {
  const [editTimeSlot, setEditTime] = useState(false);
  const [timeslots, setTimeslots] = useState<any>([]);
  const [editQualification, setEditEditQualification] = useState(false);
  const [editAccountInfo, setEditAccountInfo] = useState(false);
  const [AccountType, SetAccountType] = useState<any>("");
  const [qual, setQual] = useState<any>([]);
  const [award, setAward] = useState<any>([]);

  const [lang, setLang] = useState<any>([]);
  const [editMedia, setEditMedia] = useState<any>(false);
  const [user, setUser] = useState<any>("");
  const [isRefresh, setIsRefresh] = useState<any>(false);
  const days_array = [
    { index: "1", value: "Monday" },
    { index: "2", value: "Tuesday" },
    { index: "3", value: "Wednesday" },
    { index: "4", value: "Thursday" },
    { index: "5", value: "Friday" },
    { index: "6", value: "Saturday" },
    { index: "7", value: "Sunday" },
  ];
  // console.log(user?.firstname, "user");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myself`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });

    (async () => {
      const data = await Repo.getDegree();
      setQual(data);
      const data1 = await Repo.getAward();
      setAward(data1);
      const data2 = await Repo.getLanguage();
      setLang(data2);
    })();
    setIsRefresh(false);
  }, [editMedia, editAccountInfo, editQualification, isRefresh]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myTimeSlots`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeslots(response?.data?.data);
        // toast.success("Timeslot updated successfully", { autoClose: 2000 ,position: "bottom-right",});
      })
      .catch((error) => {
        console.log(error);
      });
  }, [editTimeSlot]);

  React.useEffect(() => {
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);
  }, []);
  // React.useEffect(() => {
  //   for (var key in timeslots) {
  //     if (timeslots.hasOwnProperty(key)) {
  //       timeslots[key] *= 2;
  //     }
  //   }
  // }, [timeslots]);

  const slots = {};
  timeslots?.forEach((element: any) => {
    if (element.days_slot_no == "1") {
      Object.assign(slots, {
        [`range_1_start_${element.day}`]: element.timeslot.split("-")[0].trim(),
        [`range_1_end_${element.day}`]: element.timeslot.split("-")[1].trim(),
      });
    } else {
      Object.assign(slots, {
        [`range_2_start_${element.day}`]: element.timeslot.split("-")[0].trim(),
        [`range_2_end_${element.day}`]: element.timeslot.split("-")[1].trim(),
      });
    }
  });

  return (
    <>
      <Head>
        {" "}
        <title>Dashboard</title>
      </Head>
      <div className="lg:p-11 p-6 mx-1 lg:mx-28">
        <Breadcrumb category={"Profile"} />
        {AccountType == "teacher" ? (
          <>
            <div className=" bg-xcool-new-blue-bg p-4 rounded-md">
              <div>
                <ProfileCard
                  user={user}
                  AccountType={AccountType}
                  setIsRefresh={setIsRefresh}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  {editAccountInfo ? (
                    <ProfileUpdate
                      setEditAccountInfo={setEditAccountInfo}
                      AccountType={AccountType}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <ProfileInfo
                      setEditAccountInfo={setEditAccountInfo}
                      user={user}
                    />
                  )}
                </div>
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  {editMedia ? (
                    <SocialMediaUpdate
                      setEditMedia={setEditMedia}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <SocialMediaCard
                      setEditMedia={setEditMedia}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  )}
                </div>
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  <SpokenLanguage setIsRefresh={setIsRefresh} lang={lang} />
                </div>
                <div className="bg-white  flex flex-col flex-wrap justify-between h-[min-content] min-h-[200px]">
                  <UploadVideo />
                </div>
              
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  <QualificationCard
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
              </div>
              <div className=" bg-white p-2 mt-3">
              {editTimeSlot ? (
                    <TimeSlotUpdate
                      timeslots={slots}
                      setEditTime={setEditTime}
                    />
                  ) : (
                    <div className="my-4">
                      <p className=" md:text-xl text-sm  font-bold mb-2 opacity-50">
                        Time Slots
                      </p>
                      <form>
                        <div>
                          {days_array?.map((item: any, index: any) => (
                            <div
                              className=" grid grid-cols-3 gap-2"
                              key={index}
                            >
                              <p className=" font-semibold text-xs md:text-sm">{item?.value}</p>
                              <p className=" text-xs md:text-sm text-center">
                                {
                                  timeslots?.filter(
                                    (slot: any) => slot?.day === item?.index
                                  )[0]?.timeslot
                                }
                              </p>
                              <p className=" text-xs md:text-sm text-center">
                                {
                                  timeslots?.filter(
                                    (slot: any) => slot?.day === item?.index
                                  )[1]?.timeslot
                                }
                              </p>
                            </div>
                          ))}

                          <div className="my-5 text-center">
                            <button
                              onClick={() => setEditTime(true)}
                              className="text-white rounded-md bg-xcool-new-blue px-6  py-2  cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
              </div>
            </div>
            {/* <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 ">
              <div
                className="bg-white col-span-1 text-center h-fit py-5 rounded-2xl"
                style={{
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <ProfileCard
                  user={user}
                  AccountType={AccountType}
                  setIsRefresh={setIsRefresh}
                />
              </div>

              <div
                className="lg:col-span-3 md:col-span-2  gap-6 bg-white p-3 h-fit rounded-2xl"
                style={{
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
              >
                <>
                  {editAccountInfo ? (
                    <ProfileUpdate
                      setEditAccountInfo={setEditAccountInfo}
                      AccountType={AccountType}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <ProfileInfo
                      setEditAccountInfo={setEditAccountInfo}
                      user={user}
                    />
                  )}

                  <hr />
                  {editMedia ? (
                    <SocialMediaUpdate
                      setEditMedia={setEditMedia}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <SocialMediaCard
                      setEditMedia={setEditMedia}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  )}

                  <hr />
                  <UploadVideo />
                  <hr />

                  <SpokenLanguage setIsRefresh={setIsRefresh} lang={lang} />

                  <hr />

                  <QualificationCard
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />

                  <hr />
                  {editTimeSlot ? (
                    <TimeSlotUpdate
                      timeslots={slots}
                      setEditTime={setEditTime}
                    />
                  ) : (
                    <div className="my-4">
                      <p className=" md:text-2xl  font-bold mb-2 opacity-50">
                        Time Slots
                      </p>
                      <form>
                        <div>
                          {days_array?.map((item: any, index: any) => (
                            <div
                              className=" grid grid-cols-3 gap-2"
                              key={index}
                            >
                              <p className=" font-semibold">{item?.value}</p>
                              <p className=" text-sm text-center">
                                {
                                  timeslots?.filter(
                                    (slot: any) => slot?.day === item?.index
                                  )[0]?.timeslot
                                }
                              </p>
                              <p className=" text-sm text-center">
                                {
                                  timeslots?.filter(
                                    (slot: any) => slot?.day === item?.index
                                  )[1]?.timeslot
                                }
                              </p>
                            </div>
                          ))}

                          <div className="my-5 text-center">
                            <a
                              onClick={() => setEditTime(true)}
                              className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              </div>
            </div> */}
          </>
        ) : (
          <>
            <div className=" bg-xcool-new-blue-bg p-4 rounded-md">
              <div>
                <ProfileCard
                  user={user}
                  AccountType={AccountType}
                  setIsRefresh={setIsRefresh}
                />
              </div>
              {/* <div className=" grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-white">
                  {editAccountInfo ? (
                    <ProfileUpdate
                      setEditAccountInfo={setEditAccountInfo}
                      AccountType={AccountType}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <ProfileInfo
                      setEditAccountInfo={setEditAccountInfo}
                      user={user}
                    />
                  )}
                </div>

               
                <div className="bg-white">
                  <QualificationCard
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
                <div className="bg-white">
                  <Achievemensts
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
              </div> */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  {editAccountInfo ? (
                    <ProfileUpdate
                      setEditAccountInfo={setEditAccountInfo}
                      AccountType={AccountType}
                      user={user}
                      setIsRefresh={setIsRefresh}
                    />
                  ) : (
                    <ProfileInfo
                      setEditAccountInfo={setEditAccountInfo}
                      user={user}
                    />
                  )}
                </div>
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  <QualificationCard
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
                <div className="bg-white flex flex-col flex-wrap justify-between h-[min-content]">
                  <Achievemensts
                    setEditEditQualification={setEditEditQualification}
                    qual={qual}
                    AccountType={AccountType}
                    award={award}
                    setIsRefresh={setIsRefresh}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
