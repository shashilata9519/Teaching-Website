import { Repo } from "@/services/Repo";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { QualificationUpdate } from "./QualificationUpdate";
import { toast } from "react-toastify";

export const Achievemensts = ({
 
  qual,
  AccountType,
  award,
  setIsRefresh,
}: any) => {
  // console.log(qual, "qual");

  const qualificatioRemoveFeildHandler = async (id: any) => {
    await Repo.removeDegree(id);
setIsRefresh(true);
toast.success("Removed successfully", { autoClose: 2000 ,position: "bottom-right",});
};
  const [editQual, setEditQual] = useState<any>(false);
  const [editAward, setEditAward] = useState<any>(false);

  return (
    <>
      
        {/* <div className=" bg-white p-2">
          <p className=" md:text-2xl  font-bold mb-2 opacity-50">
            Degrees & Certifications
          </p>
          <div className=" text-sm mx-8 ">
            {qual?.length !== 0 ? (
              <>
                {qual?.map((item: any, index: any) => {
                  return (
                    <div key={index} className="flex flex-wrap justify-between">
                      <div>
                        <p className=" font-semibold">{item?.university}</p>
                        <p>{item?.cert_id}</p>
                      </div>
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
              <div className="my-5">
                <a
                  onClick={() => setEditQual(true)}
                  className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer"
                >
                  Add
                </a>
              </div>
            )}
          </div>
        </div> */}
         <div className="p-2 relative min-h-[200px] ">
          <p className=" text-xl font-bold mb-2 opacity-50 ">
            {AccountType === "teacher"
              ? "Awards & Recognition"
              : "Other Achievements"}
          </p>
          <ul className=" text-sm px-3 overflow-y-auto max-h-[100px]" style={{ listStyle: "disc" }}>
            {award?.length === 0 ? (
              <p>Not Available</p>
            ) : (
              <>
                {award?.map((item: any, index: any) => {
                  return (
                    <div key={index} className=" flex items-center flex-wrap mb-1 justify-between">
                      <li>{item?.cert_id}</li>
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
            <div className="my-5 absolute bottom-0">
              <a
                onClick={() => setEditAward(true)}
                className="text-white rounded-md bg-xcool-new-blue px-6  py-2  cursor-pointer"
              >
                Add
              </a>
            </div>
          )}
        </div> 
     
    </>
  );

};
