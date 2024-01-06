import { GenericModal } from "@/common/Modal/GenericModal";
import { ModalBase } from "@/common/Modal/ModalBase";
import { Repo } from "@/services/Repo";
import { Skeleton } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CourseRequest = () => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modalData, setmodalData] = useState<any>();
  const dataHandler = (name = null) => {
    if (modalData?.type === "delete") {
      return {
        // content: "Do you want to delete this request ?",
        title: "Coming Soon",
      };
    }
  };
  const modalActionHandler = ({ type, id }: any) => {
    setmodalState({
      isOpen: true,
      type: type,
    });
    setmodalData({ type, id });
  };

  useEffect(() => {
    (async () => {
      const data = await Repo.courseRequest();
      // console.log(data, "data");
      setData(data);
      setIsLoading(false);
    })();
  }, []);
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

  const getDayName = (index: any) => {
    const dayObj = setDays.find((day) => day.id === index);
    return dayObj ? dayObj.day : "Invalid Day";
  };
  const successHandler = async () => {
    //call Api
    // if (modalData?.type === "delete") {
    //   await Repo.removeResourse(modalData?.id);
    // }

    // setRefresh(true);
    setmodalState({
      isOpen: false,
      type: null,
    });
  };

  return (
    <div>
      <div className=" mt-3">
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={100}
              className=" rounded-3xl mb-3"
            />
          </>
        ) : (
          <>
            {data?.length > 0 ? (
              <>
                {data.map((item: any, index: any) => (
                  <div
                    className="bg-white my-10 rounded-3xl  py-3 px-4 "
                    key={index}
                  >
                    <div className=" flex justify-between">
                      {" "}
                      <div>
                        <span className=" font-semibold">Applied at:</span>{" "}
                        {moment(item?.created_at).format("DD MMMM YYYY")}
                      </div>
                      <button
                        className="border  text-white bg-red-500 font-semibold rounded-3xl px-4 text-xs py-1"
                        onClick={() =>
                          modalActionHandler({
                            type: "notify",
                            id: item?.id,
                          })
                        }
                      >
                        Delete
                      </button>
                    </div>
                    <div className=" grid lg:grid-cols-3 md:grid-cols-2">
                      <div>
                        <span className=" font-semibold"> Course:</span>{" "}
                        {item?.course_name ? item?.course_name : "Any"}
                      </div>
                      <div>
                        <span className=" font-semibold"> Genre:</span>{" "}
                        {item?.genre_name ? item?.genre_name : "Any"}
                      </div>
                      <div>
                        <span className=" font-semibold"> Teacher: </span>
                        {item?.teacher_name ? item?.teacher_name : "Any"}
                      </div>
                      <div>
                        <span className=" font-semibold">Fee:</span>{" "}
                        {item?.fee_pref ? item?.fee_pref : "Any"}
                      </div>
                      <div>
                        <span className=" font-semibold">Time:</span>{" "}
                        {item?.time_pref ? item?.time_pref : "Any"}
                      </div>
                      <div>
                        <span className=" font-semibold">Day:</span>{" "}
                        {item?.day_pref
                          ? item?.day_pref
                              ?.split(",")
                              .map(Number)
                              .map((index: any) => getDayName(index))
                              .join(", ")
                          : "Any"}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className=" text-2xl mt-4 ">No requested data</div>
            )}
          </>
        )}
      </div>
      {modalData?.type === "delete" && (
        <GenericModal
          modalState={modalState}
          title={dataHandler()?.title}
          // content1={dataHandler()?.content}
          successText={"Confirm"}
          rejectionText={"Cancel"}
          setmodalState={setmodalState}
          successCb={successHandler}
        />
      )}
      {modalState?.type === "notify" && (
        <ModalBase
          closeModal={setmodalState}
          modalState={{
            isOpen: true,
            type: null,
          }}
          title={"Coming Soon !"}
          className=""
        >
          <div></div>
        </ModalBase>
      )}
    </div>
  );
};
