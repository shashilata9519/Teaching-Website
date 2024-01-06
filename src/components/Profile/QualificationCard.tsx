import { Repo } from "@/services/Repo";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { QualificationUpdate } from "./QualificationUpdate";
import { toast } from "react-toastify";

export const QualificationCard = ({
  qual,
  AccountType,
  award,
  setIsRefresh,
}: any) => {
  // console.log(qual, "qual");

  const qualificatioRemoveFeildHandler = async (id: any) => {
    await Repo.removeDegree(id);
    setIsRefresh(true);
    toast.success("Removed successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
  };
  const [editQual, setEditQual] = useState<any>(false);
  const [editAward, setEditAward] = useState<any>(false);

  return (
    <>
      <div className=" p-2  min-h-[200px] relative">
        <p className=" text-sm  md:text-xl  font-bold mb-2 opacity-50">
          Degrees & Certifications
        </p>
        <div className=" text-sm overflow-y-auto max-h-[100px]">
          {qual?.length !== 0 ? (
            <>
              {qual?.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between mb-1 flex-wrap items-center list-disc"
                  >
                    <p>
                      {item?.university} : {item?.cert_id}
                    </p>

                    <span
                      className=" cursor-pointer text-red-600 border rounded-full p-1 border-red-600"
                      onClick={() => qualificatioRemoveFeildHandler(item?.id)}
                    >
                      <AiFillDelete className=" text-lg" />
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <p>Not Available</p>
          )}
        </div>
        <div>
          {editQual ? (
            <QualificationUpdate
              setEditQual={setEditQual}
              type="qual"
              AccountType={AccountType}
              setIsRefresh={setIsRefresh}
            />
          ) : (
            <div className="my-5 absolute bottom-0  ">
              <button
                onClick={() => setEditQual(true)}
                className="text-white rounded-md bg-xcool-new-blue px-6  py-2  cursor-pointer"
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className=" bg-white w-1/3">
          <p className=" md:text-2xl  font-bold mb-2 opacity-50 ">
            {AccountType === "teacher"
              ? "Awards & Recognition"
              : "Other Achievements"}
          </p>
          <ul className=" text-sm mx-8" style={{ listStyle: "disc" }}>
            {award?.length === 0 ? (
              <p>Not Available</p>
            ) : (
              <>
                {award?.map((item: any, index: any) => {
                  return (
                    <div key={index} className=" flex justify-between">
                      <li>{item?.cert_id}</li>
                      <span
                        className=" cursor-pointer text-red-600"
                        onClick={() => qualificatioRemoveFeildHandler(item?.id)}
                      >
                        <AiFillDelete className=" text-lg" />
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </ul>
          {editAward ? (
            <QualificationUpdate
              setEditAward={setEditAward}
              type="award"
              AccountType={AccountType}
              setIsRefresh={setIsRefresh}
            />
          ) : (
            <div className="my-5">
              <a
                onClick={() => setEditAward(true)}
                className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer"
              >
                Add
              </a>
            </div>
          )}
        </div> */}
    </>
  );
};
