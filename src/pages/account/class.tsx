import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { AlertModal } from "@/common/Modal/AlertModal";
import Link from "next/link";
import { UploadDataModal } from "@/common/Modal/UploadDataModal";
import { Repo } from "@/services/Repo";
import moment from "moment";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";

export default () => {
  const router = useRouter();
  let [modal1State, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [cancelState, setcancelState] = useState<any>({
    isOpen: false,
    type: null,
  });
  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modal1State.isOpen,
      type: type,
    });
    setcancelState({
      isOpen: !cancelState.isOpen,
      type: type,
    });
  }

  const [classDetails, setClassDetails] = useState<any>("");

  useEffect(() => {
    (async () => {
      const data = await Repo.getClassroomDetails();
      setClassDetails(data);
    })();
  }, []);

  const cancelHandler=(id:any)=>{
    modalHandler({ type: "CancelClass" })
  }

  return (
    <>
      <Head>
        <title>class</title>
      </Head>
      <div className="lg:p-11 p-6  lg:mx-28">
      <Breadcrumb category={'Class Details'}/>
        <div>
          <div className="text-center text-2xl font-bold">Class Deatils</div>
          <p>
            <strong>Batch Name:</strong> Test 001
          </p>
          <p>
            <strong>Course :</strong> Gandharva Prarambhik Year 1
          </p>
          <p>
            <strong>Class Unique ID :</strong> {classDetails?.class_id}
          </p>
          <div className="grid md:grid-cols-3 grid-cols-1 my-5">
            <p>
              <strong>Class Date :</strong> {classDetails?.date}
            </p>
            <p>
              <strong>Timing:</strong>{" "}
              {moment(classDetails?.date_and_time + "Z").format("h:mm A")} -{" "}
              {moment(classDetails?.end_date_and_time + "Z").format("h:mm A")}
            </p>
            <p>
              <strong>Teacher :</strong> Jane.Doe1
            </p>
          </div>
          <strong className=" text-2xl">Class scheduled</strong>
          <div className="flex justify-around flex-wrap">
            <p>
              <strong>Class on:</strong> Xcool
            </p>
            <div className=" flex justify-between">
              {/* <button
                className="mx-2 text-white bg-red-500 rounded-lg px-2 py-1"
                onClick={() => modalHandler({ type: "UpdateLink" })}
              >
                Update Class Link
              </button> */}
              <Link
                href={`/account/joinclassroom/${"AVNISH"}`}
                
                className="mx-2 text-white bg-xcool-new-blue rounded-lg px-2 py-1"
              >
                Join Class
              </Link>
              {/* <button
                className="mx-2 text-white bg-orange-400 rounded-lg px-2 py-1"
                onClick={() => modalHandler({ type: "UploadData" })}
              >
                Upload Content
              </button> */}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 sm:text-center p-3  md:p-2 my-8 bg-white rounded-xl">
            <div className=" col-span-2 grid grid-cols-2 text-center">
              <div>
                <p className=" font-semibold">Student Name </p>
                <p className="text-sm">Tanisha</p>
              </div>
              <div className="">
                <p className=" font-semibold">free </p>
                <p className="text-sm">{classDetails?.is_demo===1?(<>Demo</>):(<> Rs :{classDetails?.fee}</>)}</p>
              </div>
            </div>
            <div className="text-center">
              <p className=" font-semibold ">Status </p>
              <div className=" flex justify-around items-center">
                <p className="text-sm">Enrolled</p>
                <button
                  className="  text-white bg-red-500 px-2 py-1 rounded-xl"
                  onClick={()=>cancelHandler(classDetails?.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal1State.type === "UpdateLink" && (
        <AlertModal
          modalState={modal1State}
          title="Update class link:"
          content="URL:"
          closeModal={setmodalState}
        />
      )}
      {/* {modal1State.type === "UploadData" && (
        <UploadDataModal modalState={modal1State} closeModal={setmodalState} />
      )} */}
      {cancelState.type === "CancelClass" && (
        <AlertModal
          modalState={cancelState}
          title="Cancel class?"
          content={`Are you sure you want to delete class id ${classDetails?.class_id}`}
          closeModal={setcancelState}
        />
      )}
    </>
  );
};
