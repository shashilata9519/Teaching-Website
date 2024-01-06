import { GenericModal } from "@/common/Modal/GenericModal";
import { ModalBase } from "@/common/Modal/ModalBase";
import { useAccountType } from "@/hooks/useAccountType";
import { Repo } from "@/services/Repo";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const GetAttachment = ({ data ,setRefresh}: any) => {
  // console.log(data, "resource card");
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modalData, setmodalData] = useState<any>();
  // console.log(modalData);

  const dataHandler = (name = null) => {
    if (modalData?.type === "delete") {
      return {
        content: "Do you want to delete this resourse ?",
        title:'Delete Resourse'
      };
    }
  };
  const {AccountType}=useAccountType()
  const modalActionHandler = ({ type, link, fileType,name ,id}: any) => {
    console.log(id)
    setmodalState({
      isOpen: true,
      type: type,
    });
    setmodalData({ type, link, fileType ,name,id});
  };
  const successHandler = async () => {
    //call Api
    if (modalData?.type === "delete") {
      await Repo.removeResourse(modalData?.id);
      toast.success("Resourse deleted Successfully", { autoClose: 2000 ,position: "bottom-right",});
    }
   
    setRefresh(true);
    setmodalState({
      isOpen: false,
      type: null,
    });
  };
  return (
    <>
      <div className="mt-2 bg-[#ffffff] shadow-md my-6 shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] h-fit p-5 rounded-3xl grid grid-cols-2 md:grid-cols-3 text-center ">
        <>
          <div>
            File name : <span className=" font-semibold">{data?.cert_id}</span>{" "}
          </div>
          <div className="">
            Type:
            <span className=" font-semibold">
              {data?.pre_name || " Not available"}
            </span>
          </div>
          <div className="flex gap-3 justify-center">
            {data?.pre_name == "file" && data?.university !== null ? (
              <button
                className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1"
                onClick={() =>
                  modalActionHandler({
                    type: "file",
                    link: data?.file_name,
                    fileType: data?.university,
                    name:data?.cert_id
                  })
                }
              >
                Open
              </button>
            ) : (
              <Link
                href={data?.details || ""}
                target="__blank"
                className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1"
              >
                Open
              </Link>
            )}
            {
              AccountType==="teacher" && (

            <button className="border  text-white bg-red-500 font-semibold rounded-3xl px-4 text-xs py-1"
            onClick={() =>
              modalActionHandler({
                type: "delete",
                id: data?.id,
              })
            }
            >
              Delete
            </button>
              )
            }
          </div>
        </>
        <ToastContainer />
      </div>
      {modalState?.type === "file" && (
        <ModalBase
          closeModal={setmodalState}
          modalState={{
            isOpen: true,
            type: null,
          }}
          title={modalData?.name}
          className="items-center"
        >
          <div>
            {modalData.fileType == "image/png" && (
              <div className="mt-3">
                <img className=" w-96" src={modalData?.link} />
              </div>
            )}
            {modalData.fileType == "application/pdf" && (
              <div className=" w-52 text-4xl text-center font-semibold">
                Coming Soon
                {/* Document : <Link href={modalData?.link}>open</Link> */}
              </div>
            )}
            {modalData.fileType == "video/mp4" && (
              <div className="mt-3">
                <video width="500" height="500" autoPlay controls>
                  <source src={modalData?.link} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </ModalBase>
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

      {/* {modalState.type === "file" &&
        modalState.isOpen &&
        modalData.fileType && (
          <GenericModal
            modalState={modalState}
            title={dataHandler()?.title}
            successText={"Submit"}
            rejectionText={"Cancel"}
            setmodalState={setmodalState}
            successCb={""}
          >
            <div>
              {modalData.fileType == "image/png" && (
                <div className=" w-52">
                  <img src={modalData?.link} />
                </div>
              )}
              {modalData.fileType == "application/pdf" && (
                <div className=" w-52">
                  Document : <Link href={modalData?.link}>open</Link>
                </div>
              )}
              {modalData.fileType == "video/mp4" && (
                <div className=" w-52">
                  <video width="500" height="500" autoPlay controls>
                    <source src={modalData?.link} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          </GenericModal>
        )} */}

      {/* {data?.pre_name === "file" && (
        <div className="mt-2 bg-[#ffffff] shadow-md my-6 shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] h-fit p-5 rounded-3xl grid grid-cols-2 md:grid-cols-3 text-center ">
          <>
            <div>
              File name :{" "}
              <span className=" font-semibold">{data?.cert_id}</span>{" "}
            </div>
            <div className="">
              Type:<span className=" font-semibold">{data?.pre_name}</span>
            </div>
            <div className="flex gap-3 justify-center">
              {data?.file_name && (
                <button
                  className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1"
                  onClick={() =>
                    modalActionHandler({
                      type: "file",
                      link: data?.file_name,
                      fileType: data?.university,
                    })
                  }
                >
                  Open (Coming Soon){" "}
                </button>
              )}
            </div>
          </>
        </div>
      )}
      {data?.pre_name === "link" && (
        <div className="mt-2 bg-[#ffffff] shadow-md my-6 shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] h-fit p-5 rounded-3xl grid grid-cols-2 md:grid-cols-3 text-center ">
          <>
            <div>
              Name : <span className=" font-semibold">{data?.cert_id}</span>
            </div>
            <div className="">
              type:<span className=" font-semibold">{data?.pre_name}</span>
            </div>
            <div className="flex gap-3 justify-center">
              {data?.details && (
                <Link
                  href={data?.details}
                  target="__blank"
                  className="border  text-white bg-xcool-new-blue font-semibold rounded-3xl px-4 text-xs py-1"
                >
                  Open
                </Link>
              )}
            </div>
          </>
        </div>
      )}

      {modalState.type === "file" && modalState.isOpen && (
        <GenericModal
          modalState={modalState}
          title={dataHandler()?.title}
          successText={"Submit"}
          rejectionText={"Cancel"}
          setmodalState={setmodalState}
          successCb={""}
        >
          <div>

        
            {modalData.fileType == "image/png" && (
              <div className=" w-52">
                <img src={modalData.link} />
              </div>
            )}
            {modalData.fileType == "application/pdf" && (
              <div className=" w-52">
                Document : <Link href={modalData.link}>open</Link>
              </div>
            )}
            {modalData.fileType == "video/mp4" && (
              <div className=" w-52">video : not available</div>
            )}
          </div>
        </GenericModal>
      )} */}
    </>
  );
};
