import { ModalBase } from "./ModalBase";

import { useRouter } from "next/router";
import Link from "next/link";
import { TextField } from "@mui/material";
import { useState } from "react";
import { Repo } from "@/services/Repo";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
export const AlertModal = ({
  isOpen,
  closeModal,
  modalState,
  title,
  content,
}: any) => {
  const router = useRouter();
  const [active, setActive] = useState<any>(0);
  const [UpdateLink, setUpdateLink] = useState("");
  const schema: any = yup.object().shape({
    Url: yup.string().url("Invalid URL format").required("URL is required"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>();
  const [errorMsg, setErrorMsg] = useState(false);

  const submitHandler = async (data: any) => {
    data.preventDefault();

    if (modalState.type === "UpdateLink") {
      if (active === 1) {
        await Repo.updateLink(UpdateLink);
      }
      if (active === 0) {
        await Repo.updateLink("");
      }
    }
    closeModal(true);
    toast.success("Class link updated", {
      autoClose: 2000,
      position: "bottom-right",
    });
  };

  const activeHandler = (index: any) => {
    setActive(index);
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title={title}
    >
      <div className=" my-5 ">
        {/* <p className=" my-4">{content}</p> */}

        {modalState.type === "UpdateLink" ? (
          <>
            <div>
              <div className=" text-center">
                {["xcool service", "custom link"].map((i: any, index: any) => {
                  return (
                    <button
                      className={`${
                        index === active
                          ? "bg-xcool-new-blue text-white"
                          : " bg-white text-xcool-new-blue"
                      } mx-2 mb-4 p-1 rounded-lg text-xs font-semibold`}
                      onClick={() => activeHandler(index)}
                      key={index}
                    >
                      {i}
                    </button>
                  );
                })}
              </div>

              {active === 1 && (
                <form>
                  <TextField
                    id="standard-basic"
                    label="Enter URL here"
                    variant="standard"
                    className=" w-72 mt-4"
                    value={UpdateLink}
                    onChange={(e) => setUpdateLink(e.target.value)}
                  />
                  {active === 1 && errorMsg && (
                    <p className=" text-red-600 text-center text-xs mt-3">
                      Invalid class link
                    </p>
                  )}
                </form>
              )}
              <div className=" flex justify-end my-3">
                <button
                  className=" mx-3 text-white bg-gray-400 px-2 py-1 rounded-lg "
                  onClick={() => closeModal(true)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" mx-3 text-white bg-xcool-new-blue px-2 py-1 rounded-lg "
                  onClick={submitHandler}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <hr />
            <div className=" flex justify-end my-3">
              <button
                className=" mx-3 text-white bg-gray-400 px-2 py-1 rounded-lg "
                onClick={() => closeModal(true)}
              >
                No
              </button>
              <button
                type="submit"
                className=" mx-3 text-white bg-xcool-new-blue px-2 py-1 rounded-lg "
                onClick={submitHandler}
              >
                Yes
              </button>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    </ModalBase>
  );
};
