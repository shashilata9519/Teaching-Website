import { AlertModal } from "@/common/Modal/AlertModal";
import { EditBatchModal } from "@/common/Modal/EditBatchModel";
import { GenericModal } from "@/common/Modal/GenericModal";
import { NewBatchModal } from "@/common/Modal/NewBatchModal";
import { Repo } from "@/services/Repo";
import { statusTeacher } from "@/utils/Helpers";
import { Utils } from "@/utils/Utils";
import { InputLabel, TextField, Tooltip } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { title } from "process";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsChatDots } from "react-icons/bs";
import { RxCopy, RxCross2 } from "react-icons/rx";
import * as yup from "yup";
import { CgArrowsExchangeV } from "react-icons/cg";
import { TiTick } from "react-icons/ti";
import { MdOutlineDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export const TeacherBatchesCard = ({ item, setRefresh, completed }: any) => {
  const router = useRouter();
  const [batchDetail, setBetchDetail] = useState<any>([]);

  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  let [addModalState, setaddModalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  let [modalData, setmodalData] = useState<any>();

  let [updateState, setUpdateState] = useState<any>({
    isOpen: false,
    type: null,
  });

  // const editHandler = async (id: any) => {
  //   const { data } = await Repo.getBatchDetails(id);
  //   setBetchDetail(data);
  //   modalHandler({ type: "Edit" });
  // };

  // const copyHandler = () => {
  //   modalHandler({ type: "copy" });
  // };
  const schema: any = yup.object().shape({
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
    start_date: yup.string().required("start date is required"),
  });

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const [reForm, setReForm] = React.useState<any>({
    fields: {
      start_date: "",
      start_time: "",
      end_time: "",
    },
    errors: {
      start_date: "",
      start_time: "",
      end_time: "",
    },
  });

  const chatHandler = async (id: any) => {
    const { data } = await Repo.createConversation(id);

    if (data?.id) {
      router.push(`/account/chat?Id=${data?.id}`);
    }
  };

  const modalActionHandler = ({ type, id }: any) => {
    if (type === "copybatch") {
      setUpdateState({
        isOpen: true,
        type: "copybatch",
      });
      return;
    }

    if (type === "addParticipant") {
      setaddModalState({
        isOpen: true,
        type: "addParticipant",
      });

      return;
    }

    setmodalState({
      isOpen: true,
      type: type,
    });
    setmodalData({ type, id });
  };

  const successHandler = async () => {
    //call Api
    if (modalData?.type === "completeClass") {
      await Repo.completeClass(modalData?.id);
      toast.success("Class completed successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "completeBatch") {
      await Repo.batchCompleted(modalData?.id);
      toast.success("Batch completed successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "cancelClass") {
      await Repo.cancelClass(modalData?.id);
      toast.success("Class cancelled successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "removeInvite") {
      await Repo.cancelInvitation(modalData?.id);
      toast.success("Invite Removed succesfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "cancelBatch") {
      await Repo.batchCancel(modalData?.id);
      toast.success("Batch cancelled successfully", {
        autoClose: 2000,
        position: "bottom-right",
      });
    }
    if (modalData?.type === "deleteBatch") {
      await Repo.deleteBatch(modalData?.id);
      toast.success(" Batch deleted successfully", {
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
    if (modalData?.type === "cancelBatch") {
      return {
        title: "Cancel Batch",
        content: "Do you want to cancel Batch ?",
      };
    }
    if (modalData?.type === "completeClass") {
      return {
        title: "Complete Class",
        content: "Did you finish the class ?",
      };
    }
    if (modalData?.type === "removeInvite") {
      return {
        title: "Remove Invite",
        content: "Do you want to remove this Invite ?",
      };
    }
    if (modalData?.type === "deleteBatch") {
      return {
        title: "Delete Batch",
        content: "Do you want to delete this Batch ?",
      };
    }
    if (modalData?.type === "completeBatch") {
      return {
        title: "Complete Batch ?",
        content: "This is permanent you will not be able to revert back ?",
      };
    }
    if (modalData?.type === "cancelClass") {
      return {
        title: "Cancel Class",
        content: "Do you want to cancel this Class ?",
      };
    }

    if (modalData?.type === "Reschedule") {
      return {
        title: "Reschedule the Class",
      };
    }
  };
  function convertISO(time: any) {
    // Parse the start and end times
    const format = "HH:mm";
    let date = new Date();
    const temp = moment(time, format).utc().format("HH:mm");
    // .format(format);

    // Calculate the duration in minutes

    return temp;
  }
  const onSubmit = async () => {
    let validationErrors: any = {};
    Object.keys(reForm?.fields).forEach((name) => {
      const error = validate(name, reForm?.fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setReForm({
        ...reForm,
        errors: validationErrors,
      });

      return;
    }

    // console.log({...reForm.fields,start_time:convertISO(reForm.fields.start_time)}, "data");
    const fdata = {
      class_id: modalData?.id,
      date: reForm?.fields?.start_date,
      utc_time: convertISO(reForm?.fields?.start_time),
      eutc_time: convertISO(reForm?.fields?.end_time),
    };
    console.log(fdata);

    await Repo.rescheduleClass(fdata);
    setRefresh(true);
    toast.success("Rescheduled Class Successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setmodalState({
      isOpen: false,
      type: "Reschedule",
    });
  };

  const validate = (name: any, value: any) => {
    switch (name) {
      case "start_date":
      case "start_time":
      case "end_time":
        if (!value || value.trim() === "") {
          return " date is Required";
        }
        return "";

      default:
        break;
    }
  };

  const handletReForm = (e: any) => {
    setReForm((pre: any) => ({
      errors: {
        ...pre.errors,
        [e.target.name]: validate(e.target.name, e.target.value),
      },
      fields: {
        ...pre.fields,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <>
      <div className="bg-white my-10 rounded-3xl py-3 px-4 border" >
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className=" my-4">
            <div className=" flex gap-2 md:items-center">
              <p className=" font-semibold  text-center">Course: </p>
              <p className="text-sm">{item?.course?.course_name}</p>
            </div>
            <div className="flex gap-2">
              <p className=" font-semibold text-center">Batch Name:</p>
              <p>{item?.batch_name}</p>
            </div>
            {/* <div className="flex gap-2">
              <p className=" font-semibold text-center">Total Student:</p>
              <p>01</p>
            </div> */}
          </div>

          <div className=" my-4">
            <div>
              <div className="flex">
                <p className=" font-semibold text-center"> Start Date:</p>
                <p className=" ">
                  {moment(item?.start_date).format("MMM Do YYYY")}
                </p>
              </div>
              <div className="flex">
                <p className=" font-semibold text-center"> End Date:</p>
                <p className="">
                  {moment(item?.end_date).format("MMM Do YYYY")}
                </p>
              </div>
            </div>
          </div>

          <div className="my-4 flex justify-around">
            <div>
              {item?.status_t && completed && (
                <>
                  <p className=" font-semibold">Status</p>
                  <p className="  text-red-500">{item?.status_t}</p>
                </>
              )}
            </div>
            <div>
              <p className=" font-semibold text-center">Action</p>
              <div className="flex w-fit gap-1 flex-wrap">
                {/* <Tooltip title="Copy Batch">
                  <button
                    className="text-white rounded-lg bg-xcool-new-blue text-lg px-2 py-1 mt-3"
                    // onClick={copyHandler}
                    onClick={() =>
                      modalActionHandler({
                        type: "copybatch",
                        id: item?.id,
                      })
                    }
                  >
                    <RxCopy />
                  </button>
                </Tooltip> */}
                {!completed && (
                  <>
                    {item?.status_t !== "Cancelled" && (
                      <Tooltip title="Cancel Batch">
                        <button
                          className="text-white  bg-red-500 text-lg  mt-3 border-red-400 border rounded-lg p-1 "
                          // onClick={cancelBatch}
                          onClick={() =>
                            modalActionHandler({
                              type: "cancelBatch",
                              id: item?.id,
                            })
                          }
                        >
                          <RxCross2 />
                        </button>

                        {/* {!completed && (
                      <>
                        <button
                          className="text-white  bg-red-500 text-lg  mt-3 border-red-400 border rounded-lg p-1 "
                          // onClick={cancelBatch}
                          onClick={() =>
                            modalActionHandler({
                              type: "cancelBatch",
                              id: item?.id,
                            })
                          }
                        >
                          <RxCross2 />
                        </button> */}
                      </Tooltip>
                    )}

                    {item?.status_t == "Cancelled" && (
                      <Tooltip title="Delete Batch">
                        <button
                          className="text-white rounded-lg bg-red-500 text-lg p-1 mt-3 border-red-400"
                          // onClick={() => alert("delete batch")}
                          onClick={() =>
                            modalActionHandler({
                              type: "deleteBatch",
                              id: item?.id,
                            })
                          }
                        >
                          <MdOutlineDelete />
                        </button>
                      </Tooltip>
                    )}
                    {!completed && (
                      <>
                        {" "}
                        <Tooltip title="Complete Batch">
                          <button
                            className="text-white rounded-lg bg-green-800  text-lg p-1 mt-3"
                            // onClick={() => alert("delete batch")}
                            onClick={() =>
                              modalActionHandler({
                                type: "completeBatch",
                                id: item?.id,
                              })
                            }
                          >
                            <TiTick />
                          </button>
                        </Tooltip>
                        <Link
                          href={`${localStorage.getItem("video_link")}`}
                          className="border text-white bg-blue-500 font-semibold rounded-3xl px-4 text-xs py-1 mt-3"
                        >
                          Join Class{" "}
                        </Link>
                      </>
                    )}
                  </>
                )}
                {item?.status_t == "Cancelled" && (
                  <button
                    className="text-white rounded-3xl bg-red-500 px-4 text-xs py-1 mt-3"
                    // onClick={() => alert("delete batch")}
                    onClick={() =>
                      modalActionHandler({
                        type: "deleteBatch",
                        id: item?.id,
                      })
                    }
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          {item?.batch_classes.length !== 0 && (
            <div className="flex flex-wrap gap-2 w-full md:w-2/3 bg-gray-300 p-2 m-2 rounded-lg">
              {item?.batch_classes?.map((i: any, index: any) => {
                return (
                  <div
                    className="flex flex-col items-center border rounded-md border-orange-400 bg-white w-fit p-2 mt-4"
                    key={index}
                  >
                    <div>Class {index + 1}</div>
                    <p>
                      {/* <Link
                    href="class"
                    className=" bg-gray-400 rounded-3xl mx-1 text-xs px-2 py-1 text-white"
                  >
                    Manage
                  </Link> */}
                    </p>

                    <div className=" text-sm">
                      {moment(i?.class_datetime + "Z").format("MMM Do YYYY")}
                    </div>
                    <div>
                      {moment(i?.class_datetime + "Z").format("h:mm A")}
                    </div>

                    <>
                      {i?.is_cancelled == 1 ? (
                        <div className="text-white bg-red-700 p-1 text-xs rounded-md m-1">
                          Cancelled
                        </div>
                      ) : i?.status_t == "Completed" ? (
                        <div className="text-white bg-green-700 p-1 text-xs rounded-md m-1">
                          Completed
                        </div>
                      ) : (
                        <>
                          {!completed && (
                            <div className="flex justify-center items-center text-sm gap-1">
                              {/* <div className="w-full"> */}
                              <Tooltip title="Cancel">
                                <button
                                  className="border-red-400 border rounded-lg p-1 bg-red-500 text-white"
                                  // onClick={() => cancelClass(i?.id)}
                                  onClick={() =>
                                    modalActionHandler({
                                      type: "cancelClass",
                                      id: i?.class_id,
                                    })
                                  }
                                >
                                  <RxCross2 />
                                </button>
                              </Tooltip>
                              {/* </div> */}

                              {/* <div className="w-full"> */}
                              <Tooltip title="Complete">
                                <button
                                  className="border-green-800 border rounded-lg p-1 bg-green-800 text-white "
                                  // onClick={() => completeClass(i?.id)}
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
                              {/* </div> */}
                              {/* <div> */}
                              <Tooltip title="Reschedule">
                                <button
                                  className="border-blue-400 border rounded-lg p-1 bg-blue-500 text-white"
                                  // onClick={() => cancelClass(i?.id)}
                                  onClick={() =>
                                    modalActionHandler({
                                      type: "Reschedule",
                                      id: i?.class_id,
                                    })
                                  }
                                >
                                  <CgArrowsExchangeV />
                                </button>
                              </Tooltip>
                              {/* </div> */}
                            </div>
                          )}
                        </>
                      )}
                    </>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex flex-wrap gap-2 w-full md:w-1/3">
            {item?.invitation?.map((i: any, index: any) => {
              return (
                <div
                  className="flex aspect-square flex-col items-center border rounded-md border-blue-400 w-fit h-fit px-4 py-2 mt-4 relative"
                  key={index}
                >
                  <div
                    className="  p-1 absolute top-0 left-0 text-xs font-semibold"
                    style={{
                      color: Utils.GenerateTextColor(statusTeacher(i)),
                    }}
                  >
                    {statusTeacher(i)}
                  </div>
                  {i?.is_demo_req == 1 && (
                    <div className=" text-white bg-gray-700 p-2 absolute top-0 right-0 rounded-md text-xs font-semibold">
                      Demo
                    </div>
                  )}
                  {/* {i?.id} */}
                  {/* <div className="aspect-square border rounded-full mt-5">image</div> */}
                  <div
                    className=" h-14 w-14 bg-cover rounded-full mx-auto brightness-50 mt-3"
                    style={{
                      backgroundImage: `url(${i?.student?.dp})`,
                    }}
                  ></div>
                  <div>{i?.student?.firstname}</div>
                  {/* {statusTeacher(i) == "Paid" && <div>Rs {i?.fees}</div>} */}
                  <div>
                    {i?.currency !== "INR"
                      ? i?.fees_usd
                        ? "$ " + i?.fees_usd
                        : "N/A"
                      : "Rs." + i?.fees}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {!completed && statusTeacher(i) !== "Removed" && (
                      <div>
                        <Tooltip title="Remove Student">
                          <button
                            className="border-red-400 border rounded-lg p-1 bg-red-500 text-white"
                            // onClick={() => removeInvite(i?.student?.id)}
                            onClick={() =>
                              modalActionHandler({
                                type: "removeInvite",
                                id: i?.id,
                              })
                            }
                          >
                            <RxCross2 />
                          </button>
                        </Tooltip>
                      </div>
                    )}
                    <Tooltip title="Chat">
                      <button
                        className=" text-lg  w-fit py-1 px-3 bg-slate-200 rounded-3xl"
                        onClick={() => chatHandler(i?.registered_stud)}
                      >
                        <BsChatDots className=" text-xcool-new-blue" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
          {!completed && (
            <>
              <div className="text-end my-3 hidden">
                <button
                  className=" text-sm border border-xcool-green px-2 py-1 rounded-3xl text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white"
                  // onClick={() => editHandler(item?.id)}
                  onClick={() =>
                    modalActionHandler({
                      type: "addParticipant",
                      id: item?.id,
                    })
                  }
                >
                  Add Participants
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {addModalState.type == "addParticipant" && addModalState.isOpen && (
        <EditBatchModal
          modalState={addModalState}
          closeModal={setaddModalState}
        />
      )}

      {modalState.isOpen && modalState.type !== "Reschedule" && (
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

      {modalState.type == "Reschedule" && modalState.isOpen && (
        <GenericModal
          modalState={modalState}
          title={dataHandler()?.title}
          successText={"Submit"}
          rejectionText={"Cancel"}
          setmodalState={setmodalState}
          successCb={onSubmit}
        >
          <div className=" grid grid-cols-1 gap-5">
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class Date
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="date"
                name={"start_date"}
                onChange={handletReForm}
                className=" w-full"
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
                // {...register("start_date")}
              />
              {reForm?.errors?.start_date && (
                <p className=" text-red-600 text-center text-xs">
                  {reForm.errors.start_date}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class Start time
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="time"
                className=" w-full"
                name={"start_time"}
                onChange={handletReForm}
                // {...register("start_time")}
              />
              {reForm?.errors?.start_time && (
                <p className=" text-red-600 text-center text-xs">
                  {reForm.errors.start_time}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class End time
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="time"
                className=" w-full"
                name={"end_time"}
                onChange={handletReForm}
                // {...register("end_time")}
              />
              {reForm?.errors?.end_time && (
                <p className=" text-red-600 text-center text-xs">
                  {reForm.errors.end_time}
                </p>
              )}
            </div>
          </div>
          <ToastContainer />
        </GenericModal>
      )}

      {updateState.type == "copybatch" && updateState.isOpen && (
        <NewBatchModal
          modalState={updateState}
          closeModal={setUpdateState}
          item={item}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};
