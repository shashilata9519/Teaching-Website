import { GenericModal } from "@/common/Modal/GenericModal";
import { UploadDataModal } from "@/common/Modal/UploadDataModal";
import { Repo } from "@/services/Repo";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const UploadVideo = () => {
  let [uploadmodalState, setuploadmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  const [videoFeature, setVideoFeature] = useState<any>([]);
  const [Refresh, setRefresh] = useState(false);

  function modalHandler({ type }: any) {
    setuploadmodalState({
      isOpen: !uploadmodalState.isOpen,
      type: type,
    });
  }
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modalData, setmodalData] = useState<any>();
  // console.log(modalData);

  const dataHandler = (name = null) => {
    if (modalData?.type === "delete") {
      return {
        content: "Do you want to delete this video ?",
        title: "Delete Video",
      };
    }
  };
  const successHandler = async () => {
    //call Api
    if (modalData?.type === "delete") {
      await Repo.removeResourse(modalData?.id);
      toast.success("Video deleted Successfully", {
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
  const modalActionHandler = ({ type,id }: any) => {
    console.log(id);
    setmodalState({
      isOpen: true,
      type: type,
    });
    setmodalData({ type, id });
  };

  // console.log(videoFeature[0], "videoFeature");

  useEffect(() => {
    (async () => {
      const data3 = await Repo.getVideoFeature();
      setVideoFeature(data3);
      setRefresh(false);
    })();
  }, [Refresh]);

  return (
    <>
      <p className=" text-sm p-2 md:text-xl font-bold opacity-50 ">Feature Video</p>
      {videoFeature?.length === 0 ? (
        <>
          <div
            onClick={() => modalHandler({ type: "uploadVideo" })}
            className="border border-xcool-green cursor-pointer mb-7 mx-auto text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
          >
            Upload video
          </div>
        </>
      ) : (
        <div >
          <video width="300" height="300" controls>
            <source src={videoFeature[0]?.file_name} type="video/mp4" />
          </video>
          <div className=" text-center mt-3">
            <button
             
              className="border border-red-500 cursor-pointer mb-7 mx-auto text-red-500 hover:bg-red-500 hover:text-white  w-fit rounded-full px-4"
              onClick={() =>
                modalActionHandler({
                  type: "delete",
                  id: videoFeature[0]?.id,
                })
              }
           >
              Delete
            </button>
          </div>
          <ToastContainer />
        </div>
        
      )}

      {uploadmodalState.type === "uploadVideo" && (
        <UploadDataModal
          modalState={uploadmodalState}
          closeModal={setuploadmodalState}
          setRefresh={setRefresh}
        />
      )}
          {
        modalData?.type==="delete" && (
          <GenericModal
          modalState={modalState}
          title={dataHandler()?.title}
          content1={dataHandler()?.content}
          successText={"Confirm"}
          rejectionText={"Cancel"}
          setmodalState={setmodalState}
          successCb={successHandler}
        />
        )
      }
    </>
  );
};

export default UploadVideo;
