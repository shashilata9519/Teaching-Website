import { GenericModal } from "@/common/Modal/GenericModal";
import { Repo } from "@/services/Repo";
import moment from "moment";
import Link from "next/link";
import React, { useState } from "react";

export const TeacherClassCard = ({ item, setRefresh }: any) => {
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  let [modalData, setmodalData] = useState<any>();

  const modalActionHandler = ({ type, id }: any) => {
    setmodalState({
      isOpen: true,
    });
    setmodalData({ type, id });
  };

  const successHandler = async () => {
    //call Api
    if (modalData?.type === "completeClass") {
      await Repo.completeClass(modalData?.id);
    }
    if (modalData?.type === "cancelClass") {
      await Repo.cancelClass(modalData?.id);
    }

    setRefresh(true);
    setmodalState({
      isOpen: false,
      type: null,
    });
  };

  const dataHandler = (name = null) => {
    if (modalData?.type === "completeClass") {
      return {
        title: "Complete Class",
        content: "Did you finish the class ?",
      };
    }

    if (modalData?.type === "cancelClass") {
      return {
        title: "Cancel Class",
        content: "Do you want to cancel this Class ?",
      };
    }
  };
  return (
    <>
      {" "}
      <div className="bg-white my-10 rounded-3xl py-3 px-4 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <div className=" lg:col-span-2">
            <p className=" lg:text-3xl text-xl font-semibold">
              {item ? item?.batch?.course?.course_name : ""}
              {item?.is_demo_req == 1 ? (
                <span className="border text-lg rounded-lg bg-gray-500 text-white p-1">
                  Demo
                </span>
              ) : (
                <></>
              )}
            </p>

            <p className=" font-semibold">Batch : {item?.batch?.batch_name}</p>
            <p className=" font-semibold">
              with{" "}
              {item?.batch?.invitation?.map(
                (item: any) => item.student?.firstname
              )}
            </p>
            <div>
              {/* TODO: Why is this static? */}
              <Link href={`/account/purchaseDetails/${item?.batch?.id}`}>
                <button className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1">
                  View Details
                </button>
              </Link>
              {/* Static ? */}
              <Link href={`${localStorage.getItem("video_link")}`}>
                <button className="border text-white bg-red-500 font-semibold rounded-3xl px-4 text-xs py-1">
                  Join Class
                </button>
              </Link>
            </div>
          </div>

          <div className="flex md:justify-between  flex-col">
            <div className="md:text-center">
              {item?.batch && (
                <div>
                  <p>Class Start Date </p>
                  {/* <p className=" font-semibold">{item?.batch?.start_date}</p> */}
                </div>
              )}
            </div>

            <div className="md:text-center">
              <div className="font-bold ">
                {moment(item?.class_datetime + "Z").format("MMMM Do YYYY")}
                <br />
                {moment(item?.class_datetime + "Z").format("h:mm A")}
              </div>

              {/* <div className="flex w-fit mx-auto gap-1"> */}
                <div className="flex flex-wrap justify-end">
                  <button className="border text-white bg-blue-500 font-semibold rounded-3xl px-4 text-xs py-1">
                    Reschedule
                  </button>
                  {item?.is_cancelled == 1 ? (
                    <span className="text-white bg-gray-700 p-1 rounded-3xl px-4 text-xs py-1">
                      Cancelled
                    </span>
                  ) : item?.status_t == "Completed" ? (
                    <span className="text-white bg-green-700 p-1 rounded-3xl px-4 text-xs py-1">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        className="border text-white bg-red-500 font-semibold rounded-3xl px-4 text-xs py-1"
                        onClick={() =>
                          modalActionHandler({
                            type: "cancelClass",
                            id: item?.class_id,
                          })
                        }
                      >
                        Cancel Class
                      </button>
                      <button
                        className="border text-white bg-blue-500 font-semibold rounded-3xl px-4 text-xs py-1"
                        onClick={() =>
                          modalActionHandler({
                            type: "completeClass",
                            id: item?.id,
                          })
                        }
                      >
                        Complete Class
                      </button>
                    </>
                  )}
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {modalState.isOpen && (
        <GenericModal
          modalState={modalState}
          title={dataHandler()?.title}
          content1={dataHandler(item?.batch_name)?.content}
          successText={"Confirm"}
          rejectionText={"Cancel"}
          setmodalState={setmodalState}
          successCb={successHandler}
        />
      )}
    </>
  );
};
