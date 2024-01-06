import { AlertModal } from "@/common/Modal/AlertModal";
import { ApplicationModal } from "@/common/Modal/ApplicationModal";
import { DemoBatchModal } from "@/common/Modal/DemoBatchModal";
import { GenericModal } from "@/common/Modal/GenericModal";
import { ModalBase } from "@/common/Modal/ModalBase";
import { NewBatchModal } from "@/common/Modal/NewBatchModal";
import { ScheduleBatchModal } from "@/common/Modal/ScheduleBatchModal";
import { Repo } from "@/services/Repo";
import { statusStudent, statusTeacher } from "@/utils/Helpers";
import { Utils } from "@/utils/Utils";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

export const ApplicationCard = ({
  batch,
  courseName,
  student,
  timeSlot,
  course_id,
  data,
  setRefresh,
}: any) => {
  // console.log(AccountType, "accountType");
  var status = statusTeacher(data);
  const setDays = [
    {
      id: 1,
      day: "Sun ",
    },
    {
      id: 2,
      day: "Mon ",
    },
    {
      id: 3,
      day: "Tue ",
    },
    {
      id: 4,
      day: "Wed ",
    },
    {
      id: 5,
      day: "Thur ",
    },
    {
      id: 6,
      day: "Fri ",
    },
    {
      id: 7,
      day: "Sat ",
    },
  ];
  const router = useRouter();
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [acceptState, setacceptState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modalData, setmodalData] = useState<any>();

  const chatHandler = async (id: any) => {
    const { data } = await Repo.createConversation(id);
    if (data?.id) {
      router.push(`/account/chat?Id=${data?.id}`);
    }
  };
  const findAppliedDuration = (time: any) => {
    const pastDate: any = new Date(time);
    const currentDate: any = new Date();

    const timeDifference: any = currentDate - pastDate; // Difference in milliseconds

    // Convert milliseconds to different time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    if (seconds <= 60) {
      return seconds > 1 ? `${seconds} seconds ago` : `${seconds} second ago`;
    } else if (minutes < 60) {
      return minutes > 1 ? `${minutes} minutes ago` : `${minutes} minute ago`;
    } else if (hours < 24) {
      return hours > 1 ? `${hours} hours ago` : `${hours} hour ago`;
    } else if (days < 7) {
      return days > 1 ? `${days} days ago` : `${days} day ago`;
    } else if (weeks <= 4) {
      return weeks > 1 ? `${weeks} weeks ago` : `${weeks} week ago`;
    } else {
      return months > 1 ? `${months} months ago` : `${months} month ago`;
    }
  };
  const getDayName = (index: any) => {
    const dayObj = setDays.find((day) => day.id === index);
    return dayObj ? dayObj.day : "Invalid Day";
  };

  const successHandler = async () => {
    //call Api

    if (modalData?.type === "cancelInvitation") {
      await Repo.cancelInvitation(modalData?.id);
      setRefresh(true);
      toast.success("Invite cancelled successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "cancelDemo") {
      await Repo.cancelInvitation(modalData?.id);
      setRefresh(true);
      toast.success("Demo cancelled  successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "deleteBatch") {
      await Repo.updateInvitation(modalData?.id);
      setRefresh(true);
      toast.success("Batch deleted successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "rejectInvitation") {
      await Repo.rejectApplicationStatus(modalData?.id);
      setRefresh(true);
      toast.success("Invite rejected successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }

    setRefresh(true);
    setmodalState({
      isOpen: false,
      type: null,
    });
  };
  const dataHandler = () => {
    if (modalData?.type === "deleteBatch") {
      return {
        content: "Do you want to delete the Batch ?",
        title: "Delete Batch",
      };
    }
    if (modalData?.type === "cancelInvitation") {
      return {
        content: "Do you want to cancel invitation ?",
        title: "Cancel Invitation",
      };
    }
    if (modalData?.type === "rejectInvitation") {
      return {
        content: "Do you want to reject invitation ?",
        title: "Reject Invitation",
      };
    }
    if (modalData?.type === "cancelDemo") {
      return {
        content: "Do you want to Cancel Demo ?",
        title: "Cancel Demo",
      };
    }
  };

  const actionHandler = ({ type, id }: any) => {
    setmodalData({ type, id });
    if (
      [
        "cancelInvitation",
        "rejectInvitation",
        "cancelDemo",
        "deleteBatch",
      ]?.includes(type)
    ) {
      setmodalState({
        isOpen: true,
        type: type,
      });
    }
    if (type === "accept") {
      setacceptState({
        isOpen: true,
      });
    }
    if (type === "schedule") {
      setacceptState({
        isOpen: true,
      });
    }
    setRefresh(true);
  };
  let [modalState1, setmodalState1] = useState<any>({
    isOpen: false,
    type: null,
  });
  // console.log(modalState1,'modalState1');

  function modalHandler({ type }: any) {
    setmodalState1({
      isOpen: !modalState1.isOpen,
      type: type,
    });
  }

  return (
    <>
      <div
        className="bg-white my-4 rounded-lg py-3 px-4 "
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          // backgroundColor: Utils.genareteColor(status),
        }}
        //   style={{
        //     backgroundColor: Utils.genareteColor(setStatus(data)),
        //   }}
      >
        <p className="absolute lg:text-3xl text-2xl font-semibold">
          {data?.is_demo_req == 1 ? (
            <span className="border text-lg rounded-lg bg-gray-500 text-white p-1">
              Demo
            </span>
          ) : (
            <></>
          )}
        </p>
        <div className=" text-end text-xs text-[#A9A9A9]">
          Updated {findAppliedDuration(data?.updated_at)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
          <div className=" sm:col-span-3 flex">
            {/* <div className=" w-16 mx-auto">
              <img
                // src="https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                src={
                  student?.dp
                    ? student?.dp
                    : "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                }
                alt="student"
                className=" rounded-full"
              />
            </div> */}
            <div>
              <div
                className=" h-14 w-14 bg-cover rounded-full mx-auto md:mx-2 brightness-50 mt-3"
                style={{
                  backgroundImage: `url(${
                    data?.student?.dp
                      ? data?.student?.dp
                      : "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                  })`,
                }}
              ></div>
            </div>

            <div className=" mx-4">
              <p>
                {" "}
                <span className=" font-bold text-orange-400">
                  {data?.student?.firstname} {data?.student?.lastname}
                </span>{" "}
                applied for
                <span className=" font-bold">
                  {" "}
                  {courseName
                    ? courseName
                    : `${data?.lead?.genre_name} ${
                        data?.lead?.course_name ? data?.lead?.course_name : ""
                      }`}{" "}
                </span>
                {data?.batch?.batch_name && (
                  <>
                    added to Batch:{" "}
                    <span className=" font-bold ">
                      {data?.batch?.batch_name}
                    </span>
                  </>
                )}
              </p>
              <p>Paid for {data?.lead?.no_classes} classes</p>

              <button
                className="my-3 flex text-lg items-center  w-fit py-1 px-3 bg-slate-200 rounded-3xl"
                onClick={() => chatHandler(data?.registered_stud)}
              >
                <span className="me-2">Chat</span>
                <span>
                  <BsChatDots className=" text-xcool-new-blue" />
                </span>
              </button>
            </div>
          </div>
          <hr className=" sm:hidden visible" />
          <div className="flex flex-wrap gap-2 col-span-1">
            {data?.custom_timeslot !== null &&
            data?.custom_timeslot !== "null" ? (
              <>
                <div>
                  <p className=" font-semibold">Custom data</p>
                  <p>{data?.custom_timeslot}</p>
                </div>
              </>
            ) : (
              ""
            )}

            {data?.lead?.day_pref && (
              <>
                <div>
                  <p className=" font-semibold">Day Preference</p>
                  <p>
                    {" "}
                    {data?.lead?.day_pref
                      ?.split(",")
                      .map(Number)
                      .map((index: any) => getDayName(index))
                      .join(", ")}
                  </p>
                </div>
              </>
            )}
            {/* {timeSlot && (
              <>
                <div>
                  <p className=" font-semibold">Preferred Time Slots</p>
                  <p>Mon. 10:48 AM to 12:46 AM</p>
                  <p>Mon. 10:48 AM to 12:46 AM</p>
                </div>
              </>
            )} */}
            {timeSlot && <hr className=" sm:hidden visible" />}
            <div className="text-center flex flex-col flex-wrap items-center mx-auto md:mx-1 ">
              {data?.is_demo_req == 0 && (
                <div className=" font-semibold">
                  Fees:
                  <span>
                    {data?.currency === "USD" ? "$ " : "Rs. "}
                    {data?.fees || data?.usd_fees || 0}
                  </span>
                </div>
              )}
              <p className=" font-bold">Application Status</p>
              <p
                style={{
                  color: Utils.GenerateTextColor(status),
                }}
              >
                {status}
              </p>
              <div className="flex gap-1">
                {status === "Applied" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-blue-500 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "accept",
                          id: data?.id,
                        })
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "rejectInvitation",
                          id: data?.id,
                        })
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
                {status === "Demo" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-blue-500 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "accept",
                          id: data?.id,
                        })
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "rejectInvitation",
                          id: data?.id,
                        })
                      }
                    >
                      Reject
                    </button>
                  </>
                )}
                {status === "Invited" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "cancelDemo",
                          id: data?.id,
                        })
                      }
                    >
                      Cancel Demo
                    </button>
                  </>
                )}
                {status === "Removed" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "deleteBatch",
                          id: data?.id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </>
                )}

                {status === "Cancelled" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "deleteBatch",
                          id: data?.id,
                        })
                      }
                    >
                      Delete
                    </button>
                  </>
                )}

                {status === "Payment Due" && (
                  <>
                    <button
                      className="text-white rounded-3xl bg-red-600 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        actionHandler({
                          type: "cancelInvitation",
                          id: data?.id,
                        })
                      }
                    >
                      Cancel Invite
                    </button>
                  </>
                )}
                {status === "Paid" && data?.batch == null && (
                  <>
                    {/* <Link
                      href={`/account/purchaseDetails/${data?.id}`}
                      className="text-white rounded-3xl bg-yellow-600 px-4 text-xs py-1 mt-3"
                    >
                      Schedule
                    </Link> */}
                    <button
                      className="text-white rounded-3xl bg-blue-500 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        // actionHandler({
                        //   type: "accept",
                        //   id: data?.id,
                        // })
                        setmodalState1({
                          isOpen: !modalState1.isOpen,
                          type: "Schedule",
                        })
                      }
                    >
                      Schedule
                    </button>
                    <button
                      className="text-white rounded-3xl bg-red-500 px-4 text-xs py-1 mt-3"
                      onClick={() =>
                        // actionHandler({
                        //   type: "accept",
                        //   id: data?.id,
                        // })
                        // setmodalState1({
                        //   isOpen: !modalState1.isOpen,
                        //   type: "Schedule",
                        // })
                        alert("Coming soon")
                      }
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap  gap-2">
            {data?.batch &&
              data?.class?.map((i: any, index: any) => {
                return (
                  <div
                    className="flex flex-col items-center border rounded-md border-orange-400 w-fit p-2 mt-4"
                    key={index}
                  >
                    <div>Class {index + 1}</div>
                    <div className=" text-xs">
                      {moment(i?.date_and_time + "Z").format("MMM Do YYYY")}
                    </div>
                    <div>{moment(i?.date_and_time + "Z").format("h:mm A")}</div>
                    {/* Class ID: {i?.class_id} */}
                    {/* <div className="text-xs p-1 border rounded-md text-black bg-blue-100">
                        {i?.batchclass?.is_cancelled
                          ? "Cancelled"
                          : i?.batchclass?.status_t
                          ? i?.batchclass?.status_t
                          : "Scheduled"}
                      </div> */}
                  </div>
                );
              })}
          </div>
        </div>
        <ToastContainer />
      </div>

      {acceptState && (
        <ApplicationModal
          modalState={acceptState}
          closeModal={setacceptState}
          firstname={student?.firstname}
          course={courseName}
          course_id={course_id}
          item={data}
          modalState1={modalState1}
          setmodalState1={setmodalState1}
        />
      )}

      <GenericModal
        modalState={modalState}
        title={dataHandler()?.title}
        content1={dataHandler()?.content}
        successText={"Confirm"}
        rejectionText={"Cancel"}
        setmodalState={setmodalState}
        successCb={successHandler}
      />
      {modalState1?.type === "New" && (
        <NewBatchModal
          modalState={modalState1}
          closeModal={setmodalState1}
          // firstname={firstname}
          // courseid={course_id}
          item={data}
          setRefresh={setRefresh}
          // course={course}
        />
      )}
      {modalState1?.type === "Schedule" && (
        <ScheduleBatchModal
          modalState={modalState1}
          closeModal={setmodalState1}
          // firstname={firstname}
          // courseid={course_id}
          item={data}
          setRefresh={setRefresh}
          // course={course}
        />
      )}
      {modalState1?.type === "Demo" && (
        <DemoBatchModal
          modalState={modalState1}
          closeModal={setmodalState1}
          // firstname={firstname}
          item={data}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};
