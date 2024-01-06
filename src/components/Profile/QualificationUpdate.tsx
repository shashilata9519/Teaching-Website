import { Repo } from "@/services/Repo";
import { TextField } from "@mui/material";
import axios from "axios";
import { AnyMxRecord } from "dns";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

export const QualificationUpdate = ({
  setEditQual,
  type,
  AccountType,
  setEditAward,
  setIsRefresh,
}: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  // console.log(qual,'rr')
  const [inputFields, setInputFields] = React.useState({
    university: "",

    cert_id: "",
    award: "",
  });

  const qualificationOnChangeHandler = (e: any, type: string) => {
    setInputFields({ ...inputFields, [type]: e.target.value });
  };
  const awardOnChangeHandler = (e: any, type: string) => {
    setInputFields({ ...inputFields, [type]: e.target.value });
  };
  console.log(inputFields);

  const awardAddFieldsHandler = async (e: any) => {
    e.preventDefault();
    let fdata: any = new FormData();
    fdata.append("type", "award");

    fdata.append("name", inputFields.award);

    const data = await Repo.addMeta(fdata);
    setIsRefresh(true);
    toast.success("Awards added successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setEditAward(false);
  };

  const qualificatioAddFieldsHandler = async (e: any) => {
    e.preventDefault();

    // console.log(inputFields, "inputFields");
    // console.log(typeof inputFields, "inputFields");

    let fdata = new FormData();

    fdata.append("type", "degree");
    fdata.append("university", inputFields.university);
    fdata.append("name", inputFields.cert_id);

    console.log(inputFields, "fdata");

    const data = await Repo.addMeta(fdata);
    toast.success("Degree added successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setIsRefresh(true);
    setEditQual(false);
  };

  return (
    <>
      {type === "qual" && (
        <form>
          <div className="mb-6 flex flex-col gap-3">
            <div>
              <TextField
                // value={inputFields.university}
                type="text"
                id="standard-basic"
                variant="standard"
                label="Unversity"
                className=" w-full"
                name="university"
                onBlur={(e) => qualificationOnChangeHandler(e, "university")}
              />
            </div>
            <div>
              <TextField
                // value={inputFields.degree}
                className=" w-full"
                type="text"
                id="standard-basic"
                variant="standard"
                label="Degree"
                name="degree"
                onBlur={(e) => qualificationOnChangeHandler(e, "cert_id")}
              />
            </div>
          </div>

          <button
            className="text-white rounded-md bg-xcool-new-blue px-4  py-1 mx-1 cursor-pointer mb-4"
            type="submit"
            onClick={qualificatioAddFieldsHandler}
          >
            Save
          </button>
          <button
            className="text-white rounded-md  bg-xcool-new-gray px-4  py-1 cursor-pointer mb-4"
            type="submit"
            onClick={() => setEditQual(false)}
          >
            Cancel
          </button>
        </form>
      )}
      {type === "award" && (
        <form>
          <div className="mb-6 grid grid-cols-1 gap-3 items-center">
            <TextField
              // value={inputFields.award}
              type="text"
              id="standard-basic"
              variant="standard"
              label="Award"
              name="award"
              onBlur={(e) => awardOnChangeHandler(e, "award")}
              // onChange={awardOnChangeHandler}
            />
          </div>

          <button
            className="text-white rounded-md bg-xcool-new-blue px-4  py-1 cursor-pointer mb-4 mx-1"
            type="submit"
            onClick={awardAddFieldsHandler}
          >
            Save
          </button>
          <button
            className="text-white rounded-md bg-xcool-new-gray px-4  py-1 cursor-pointer mb-4"
            type="submit"
            onClick={() => setEditAward(false)}
          >
            Cancel
          </button>
          <ToastContainer />
        </form>
      )}
    </>
  );
};
