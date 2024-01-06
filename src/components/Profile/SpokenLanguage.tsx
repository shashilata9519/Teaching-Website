import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import LanguageUpdate from "./LanguageUpdate";
import { Repo } from "@/services/Repo";
import { ToastContainer, toast } from "react-toastify";

const SpokenLanguage = ({ lang, setIsRefresh }: any) => {
  const [editLang, setEditLang] = useState<any>(false);

  const langRemoveHandler = async (id: any) => {
    await Repo.removeLang(id);
    setIsRefresh(true);
    toast.success("Language removed successfully", { autoClose: 2000 ,position: "bottom-right",});
  };

  return (
    <div className=" min-h-[200px] p-2 relative">
      <p className=" md:text-xl text-sm font-bold opacity-50">
        Spoken Languages
      </p>
      <div className=" gap-2">
        <ul className=" text-sm mx-5" style={{ listStyle: "disc" }}>
          {lang.length === 0 ? (
            <p>Not Available</p>
          ) : (
            <>
              {lang?.map((item: any, index: any) => {
                return (
                  <div key={index} className=" flex  items-center flex-wrap mb-1 justify-between">
                    <li>{item?.cert_id}</li>
                    <span
                      className=" cursor-pointer text-red-600 border rounded-full p-1 border-red-600"
                      onClick={() => langRemoveHandler(item?.id)}
                    >
                      <AiFillDelete className=" text-lg" />
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </ul>
        <div>
          {editLang ? (
            <LanguageUpdate
              setEditLang={setEditLang}
              setIsRefresh={setIsRefresh}
            />
          ) : (
            <div className=" text-right absolute bottom-3">
              <button
                onClick={() => setEditLang(true)}
                className="text-white rounded-md bg-xcool-new-blue  px-6  py-2  cursor-pointer"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SpokenLanguage;
