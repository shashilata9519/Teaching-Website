import Logo from "@/assets/logo";
import { AlertModal } from "@/common/Modal/AlertModal";
import { GenericModal } from "@/common/Modal/GenericModal";
import { Repo } from "@/services/Repo";
import { statusStudent } from "@/utils/Helpers";
import { Utils } from "@/utils/Utils";
import { Tooltip } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import React from "react";

import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";

export const StudentBatchesCard = ({
  item,
  active,
  setRefresh,
  completed,
}: any) => {
  let [cancelState, setcancelState] = useState<any>({
    isOpen: false,
    type: null,
  });
  function modalHandler({ type }: any) {
    setcancelState({
      isOpen: !cancelState.isOpen,
      type: type,
    });
  }

  let [modalData, setmodalData] = useState<any>();
  const [userData, setUserData] = useState<any>({});
  // console.log(userData,'userdata')

  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone_no: localStorage.getItem("phone_no"),
      user_id: localStorage.getItem("user_id"),
    });
  }, []);

  var status = statusStudent(item);
  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay(invitation_id: any) {
    console.log(invitation_id);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await Repo.createOrder({
      amount: item?.fees || item?.fees_usd,
      currency: item?.currency || "INR",
      invitation_id: invitation_id,
    });

    console.log(result, "result");

    const options = {
      // key: "rzp_test_bELNQVu6cqbl9r", // Development
      key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
      amount: Math.trunc(item.fees * 100 || item.fees_usd * 100),
      currency: item?.currency || "INR",
      name: "xcool",
      description: "Payment by student",
      image: "",
      order_id: result?.payment_order_id,

      handler: async function (response: any) {
        const data: any = {
          order_id: result?.order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          user_id: item?.registered_stud,
        };
        console.log(data, "data");
        const res = await Repo.savePayment(data);
        setRefresh(true);
        // console.log(res, "payment");
        if (res?.success) {
          toast.success("Transation Successfull !", { autoClose: 2000 });
        } else {
          toast.error("failed try again !", {
            autoClose: 2000,
            position: "bottom-right",
          });
        }
      },
      prefill: {
        name: userData?.name,
        email: userData?.email,
        contact: userData?.phone_no,
      },
      notes: {
        order_id: result?.order_id,
        user_id: userData?.user_id,
      },
      theme: {
        color: "#528FF0",
      },
    };
    console.log(options);
    const paymentObject: any = new window.Razorpay(options);

    paymentObject.open();
  }

  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  const modalActionHandler = ({ type, id }: any) => {
    setmodalState({
      isOpen: true,
    });
    setmodalData({ type, id });
  };

  const successHandler = async () => {
    //call Api
    if (modalData?.type === "acceptInvitation") {
      await Repo.acceptInvitation(modalData?.id);
      toast.success("Accept invite successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "completeClass") {
      await Repo.completeClassStudent(modalData?.id);
      setRefresh(true);
      toast.success("Class completed successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "declineInvitation") {
      await Repo.declineInvitation(modalData?.id);
      toast.success("Decline invite successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "archive") {
      await Repo.updateApplicationStatus(modalData?.id);
      toast.success("Archive invite successfully", {
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
  const dataHandler = (name = null) => {
    if (modalData?.type === "acceptInvitation") {
      return {
        title: "Accept Invitation",
        content: "Do you want to Accept Invitation ?",
      };
    }
    if (modalData?.type === "declineInvitation") {
      return {
        title: "Decline Invitation",
        content: "Do you want to Decline Invitation ?",
      };
    }
    if (modalData?.type === "archive") {
      return {
        title: "Archive Invitation",
        content: "Do you want to Archive Invitation",
      };
    }
    if (modalData?.type === "completeClass") {
      return {
        title: "Complete Class",
        content: "Do you mark this class as complete?",
      };
    }
  };

  return (
    <>
      {" "}
      <div className="bg-white my-10 rounded-3xl py-3 px-4 border">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <div className=" lg:col-span-2">
            <p className=" lg:text-2xl text-xl font-semibold">
              {item?.is_demo_req == 1 ? (
                <span className="border text-lg rounded-lg bg-gray-500 text-white p-1">
                  Demo
                </span>
              ) : (
                <></>
              )}
              {item?.course
                ? item?.course?.course_name
                : `${item?.lead?.genre_name} ${
                    item?.lead?.course_name
                      ? ": " + item?.lead?.course_name
                      : ""
                  }`}
            </p>

            <div className=" flex gap-5">
              <div className=" w-16 h-16">
                <img
                  // src="https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                  src={
                    item?.teacher?.dp
                      ? item?.teacher?.dp
                      : "https://xcool.s3.ap-south-1.amazonaws.com/images/lpddATIs8JiE61c5FByWdjTwjDfaVDXGcN1IKdhB.png"
                  }
                  alt="student"
                  className=" rounded-full w-full h-full"
                />
              </div>

              <div>
                <Link
                  href={`/teacher/${item?.teacher?.slug}`}
                  className=" font-semibold"
                >
                  {item?.teacher?.firstname
                    ? `by ${item?.teacher?.firstname}`
                    : "Teacher allocation pending"}
                </Link>
                <p className=" font-semibold">
                  {item?.batch?.batch_name
                    ? item?.batch?.batch_name
                    : "Classes to be scheduled"}
                </p>
                <p className=" font-semibold">
                  {item?.class_count != 0
                    ? `${item?.class_count} Classes`
                    : `${item?.lead?.no_classes} Classes`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between flex-wrap mt-4">
            <div>
              {item?.batch && (
                <>
                  <p>Class Start Date</p>
                  <p className=" font-semibold">
                    {moment(item?.batch?.start_date + "Z").format(
                      "MMM Do YYYY"
                    )}
                  </p>
                  {item?.is_demo_req === 0 && (
                    <>
                      <p>Class End Date</p>
                      <p className=" font-semibold">
                        {" "}
                        {moment(item?.batch?.end_date + "Z").format(
                          "MMM Do YYYY"
                        )}
                      </p>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="text-center">
              {item?.is_demo_req == 0 && (
                <div className=" font-semibold">
                  Fees:{" "}
                  <span>
                    {item?.currency === "USD" ? "$ " : "Rs "}
                    {item?.fees || item?.usd_fees || 0}
                  </span>
                </div>
              )}

              {completed && (
                <div className="flex flex-col w-fit mx-auto mt-3">
                  <>
                    <p>Application Status</p>
                    <button
                      className=" font-semibold rounded-3xl px-4 text-xs py-1"
                      style={{
                        color: Utils.GenerateTextColor(status),
                      }}
                    >
                      {status}
                    </button>
                  </>
                  {status === "Applied" && (
                    <>
                      <span>
                        Applied on {/* { item?.created_at} */}
                        {moment(item?.created_at).format("MMM Do YYYY")}
                      </span>
                    </>
                  )}
                  {status === "Payment Due" && (
                    <>
                      <div className="flex flex-wrap">
                        <button
                          className="text-white rounded-3xl bg-xcool-new-blue px-4 text-xs py-1 mt-3"
                          onClick={() => displayRazorpay(item?.id)}
                        >
                          Pay Now
                        </button>
                        <button
                          className="text-white rounded-3xl bg-red-500 px-4 text-xs py-1 mt-3"
                          // onClick={() => declineinvitation(item?.id)}
                          onClick={() =>
                            modalActionHandler({
                              type: "declineInvitation",
                              id: item?.id,
                            })
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </>
                  )}
                  {status === "Pending confirmation" && (
                    <>
                      <div className="flex flex-wrap">
                        <button
                          className="text-white rounded-3xl bg-xcool-new-blue px-4 text-xs py-1 mt-3"
                          // onClick={() => acceptinvitation(item?.id)}
                          onClick={() =>
                            modalActionHandler({
                              type: "acceptInvitation",
                              id: item?.id,
                            })
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="text-white rounded-3xl bg-red-500 px-4 text-xs py-1 mt-3"
                          // onClick={() => declineinvitation(item?.id)}
                          onClick={() =>
                            modalActionHandler({
                              type: "declineInvitation",
                              id: item?.id,
                            })
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </>
                  )}
                  {status === "Invited" && (
                    <>
                      <div className="flex flex-wrap justify-center">
                        <button
                          className="text-white rounded-3xl bg-blue-300 px-4 text-xs py-1 mt-3"
                          // onClick={() => acceptinvitation(item?.id)}
                          onClick={() =>
                            modalActionHandler({
                              type: "acceptInvitation",
                              id: item?.id,
                            })
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="text-white rounded-3xl bg-red-500 px-4 text-xs py-1 mt-3"
                          // Decline API call
                          // onClick={() => declineinvitation(item?.id)}
                          onClick={() =>
                            modalActionHandler({
                              type: "declineInvitation",
                              id: item?.id,
                            })
                          }
                        >
                          Decline
                        </button>
                      </div>
                    </>
                  )}
                  {status === "Paid" && (
                    <>
                      {/* <div className="flex flex-wrap justify-center">
                        <Link
                          href={`/account/purchaseDetails/${item?.id}`}
                          className="text-white rounded-3xl bg-yellow-600 px-4 text-xs py-1 mt-3"
                        >
                          View Details
                        </Link>
                      </div> */}
                    </>
                  )}
                  {status === "Rejected" && (
                    <div className=" flex flex-wrap justify-center">
                      <button
                        className="text-white rounded-3xl bg-gray-400 px-4 text-xs py-1 mt-3"
                        // Decline API call
                        // onClick={() => declineinvitation(item?.id)}
                        onClick={() =>
                          modalActionHandler({
                            type: "archive",
                            id: item?.id,
                          })
                        }
                      >
                        Archive
                      </button>
                    </div>
                  )}
                  {status === "Applied" && (
                    <div className=" flex flex-wrap justify-center">
                      <button
                        className="text-white rounded-3xl bg-gray-400 px-4 text-xs py-1 mt-3"
                        // Decline API call
                        // onClick={() => declineinvitation(item?.id)}
                        onClick={() =>
                          modalActionHandler({
                            type: "archive",
                            id: item?.id,
                          })
                        }
                      >
                        Archive
                      </button>
                    </div>
                  )}
                  {item?.batch_id != null ? (
                    item?.is_accepted == 1 ? (
                      item?.teacher?.details?.custom_link_use_xcool ? (
                        <>
                          <div className="flex flex-wrap justify-center">
                            <Link
                              href={`/account/joinclassroom/${item?.teacher?.name}-${item?.teacher?.jm_uuid}`}
                              className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1 mx-auto"
                            >
                              Join Class
                            </Link>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-wrap justify-center">
                            <Link
                              href={`${item?.teacher?.details?.custom_link}`}
                              className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1 mx-auto"
                            >
                              Join Class
                            </Link>
                          </div>
                        </>
                      )
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {item?.batch && (
            <div className="flex flex-wrap  gap-2 bg-gray-300 w-full md:w-2/3 p-2 m-2 rounded-lg">
              {item?.class?.map((i: any, index: any) => {
                return (
                  <div
                    className="flex flex-col items-center border rounded-md border-orange-400 bg-white w-fit p-2 mt-4"
                    key={index}
                  >
                    <div>Class {index + 1}</div>
                    <div className=" text-xs">
                      {moment(i?.date_and_time + "Z").format("MMM Do YYYY")}
                    </div>
                    <div>{moment(i?.date_and_time + "Z").format("h:mm A")}</div>
                    {/* Class ID: {i?.class_id} */}
                    <div className="">
                      <div className="hidden">
                        {i?.batchclass?.is_cancelled ? (
                          <p className=" text-white bg-red-500 rounded-md text-xs p-1">
                            Cancelled
                          </p>
                        ) : i?.batchclass?.status_t ? (
                          <div className="flex gap-1">
                            <p className=" text-white bg-xcool-new-blue-dark rounded-md text-xs p-1">
                              {i?.batchclass?.status_t}
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <p className=" text-white bg-slate-700 rounded-md text-xs p-1">
                              Scheduled
                            </p>
                          </div>
                        )}
                      </div>
                      {i?.batchclass?.status_s == "Completed" ? (
                        <p className=" text-white bg-xcool-new-blue-dark rounded-md text-xs p-1 my-1">
                          Completed
                        </p>
                      ) : (
                        <p>
                          <Tooltip title="Complete Class">
                            <button
                              className="text-white rounded-md bg-xcool-green text-xs  p-1"
                              // onClick={() => alert("delete batch")}
                              onClick={() =>
                                modalActionHandler({
                                  type: "completeClass",
                                  id: i?.id,
                                })
                              }
                            >
                              <TiTick />
                            </button>
                          </Tooltip>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      {/* {cancelState.type === "CancelClass" && (
        <GenericModal
          modalState={cancelState}
          title="Accept Batch"
          content1={`Do you really want to cancel Batch ?`}
          closeModal={setcancelState}
          successText={""}
          rejectionText={""}
          successCb={declineinvitation}
          rejectionCb={setcancelState}
        />
      )}
      {cancelState.type === "accept" && (
        // <AlertModal
        //   modalState={cancelState}
        //   title="Cancel Batch"
        //   content={`Do you really want to cancel batch ${item?.batch?.batch_name} ?`}
        //   closeModal={setcancelState}
        // />
        <GenericModal
          modalState={cancelState}
          title="Accept Batch"
          content1={`Do you  want to Accept Batch ?`}
          closeModal={setcancelState}
          successText={""}
          rejectionText={""}
          successCb={acceptinvitation}
          rejectionCb={setcancelState}
        />
      )} */}
      <GenericModal
        modalState={modalState}
        title={dataHandler()?.title}
        content1={dataHandler(item?.batch_name)?.content}
        successText={"Confirm"}
        rejectionText={"Cancel"}
        setmodalState={setmodalState}
        successCb={successHandler}
      />
    </>
  );
};
