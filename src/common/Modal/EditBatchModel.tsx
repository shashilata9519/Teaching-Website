import { useForm } from "react-hook-form";
import React, { useState, Fragment, useEffect } from "react";
import { FormModalBase } from "./FormBaseModal";
import { Dialog, Transition } from "@headlessui/react";

import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Link from "next/link";
import { TextModal } from "./TextModal";
import { AlertModal } from "./AlertModal";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { statusTeacher } from "@/utils/Helpers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Oliver Hansen", "Van Henry", "April Tucker"];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const EditBatchModal = ({
  isOpen,
  closeModal,
  modalState,
  batchName,
  batchDetail,
  courseName,
  setcancelState,
  cancelState,
}: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [addActive, setAddActive] = useState(false);
  // console.log(batchDetail, "batchDetail");
 
  function modalHandler({ type }: any) {
    setcancelState({
      isOpen: !cancelState.isOpen,
      type: type,
    });
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [Days, setDays] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value?.split(",") : value
    );
  };

  const findDay = () => {
    const day = batchDetail?.days?.split(",");
    var uniqueDays: any = [];
    day?.forEach(function (dateString: any) {
      var date = new Date(dateString);
      var dayOfWeek = date?.getDay();
      var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      var dayName = daysOfWeek[dayOfWeek];

      if (!uniqueDays.includes(dayName)) {
        uniqueDays.push(dayName);
      }
    });
    setDays(uniqueDays);
  };
  const minDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    findDay();
  }, []);

  return (
    <>
      <FormModalBase
        isOpen={isOpen}
        closeModal={closeModal}
        modalState={modalState}
        title={batchName}
      >
        <div className="text-center">{/* ( Course : {courseName} ) */}</div>
        <div className="my-5 flex justify-between flex-wrap text-sm">
          <div>
            <p>
              Batch Start Date:{" "}
              <strong>{moment(batchDetail?.start_date).format("LL")}</strong>
            </p>
            <p>
              Batch End Date:{" "}
              <strong>{moment(batchDetail?.end_date).format("LL")}</strong>
            </p>
          </div>
          <div>
            <p>
              Class occur every:{" "}
              {Days?.map((i: any, index: any) => {
                return (
                  <strong key={index}>
                    {i} {index !== Days?.length - 1 && ", "}
                  </strong>
                );
              })}
            </p>
            <p>
              Class Timing:
              <strong>
                {moment(batchDetail?.start_time, "HH:mm:ss").format("hh:mm A")}{" "}
                - {moment(batchDetail?.end_time, "HH:mm:ss").format("hh:mm A")}{" "}
              </strong>
            </p>
          </div>
        </div>
        <hr />
        {/* <div className="text-center mt-3">No. of Classes remaining: 1 / 1</div> */}
        {/* <div className=" flex flex-wrap gap-2">
          {batchDetail?.batch_classes?.map((i: any, index: any) => {
            return (
              <div
                className=" border border-orange-400 w-fit p-2 mt-4"
                key={index}
              >
                <p>
                  Class {index + 1}
                  <Link
                    href="class"
                    className=" bg-gray-400 rounded-3xl mx-1 text-xs px-2 py-1 text-white"
                  >
                    Manage
                  </Link>
                </p>
               
                <p className=" text-sm">
                  {" "}
                  {moment(i?.class_datetime + "Z").format("MMMM Do YYYY")}
                </p>
                <p className=" text-sm">
                  {moment(i?.class_datetime + "Z").format("h:mm A")}
                </p>

                <button
                  className=" text-red-500 text-sm"
                  onClick={() => modalHandler({ type: "CancelClass" })}
                >
                  Cancel Class
                </button>
              </div>
            );
          })}
        </div> */}

        <hr />
        <form className="my-5">
              <div className="my-3">
                <InputLabel id="demo-multiple-chip-label">Student</InputLabel>
                <Select
                  className=" w-full"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <div className="my-3">
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    variant="standard"
                  >
                    Fees per student per sessions
                  </InputLabel>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    className=" w-full"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  className="mt-5 bg-red-500 px-2 py-1 mx-3  text-white rounded-3xl"
                  onClick={closeModal}
                >
                  Discard
                </button>
                <button
                  className="mt-5 bg-xcool-new-blue px-2 py-1  text-white rounded-3xl"
                  onClick={closeModal}
                >
                  Save
                </button>
              </div>
            </form>
        {/* {addActive ? (
          <>
            <form className="my-5">
              <div className="my-3">
                <InputLabel id="demo-multiple-chip-label">Student</InputLabel>
                <Select
                  className=" w-full"
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <div className="my-3">
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    variant="standard"
                  >
                    Fees per student per sessions
                  </InputLabel>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    type="text"
                    className=" w-full"
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  className="mt-5 bg-red-500 px-2 py-1 mx-3  text-white rounded-3xl"
                  onClick={() => setAddActive(false)}
                >
                  Discard
                </button>
                <button
                  className="mt-5 bg-xcool-new-blue px-2 py-1  text-white rounded-3xl"
                  onClick={() => setAddActive(false)}
                >
                  Save
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="text-end my-3">
              <button
                className=" text-sm border border-xcool-green px-2 py-1 rounded-3xl text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white"
                onClick={() => setAddActive(true)}
              >
                Add Participants
              </button>
            </div>
            <div className="grid grid-cols-3 my-4">
              {batchDetail?.invitation?.map((i: any, index: any) => {
                return (
                  <div
                    className="flex aspect-square flex-col items-center border rounded-md border-blue-400 w-fit p-2 mt-4 relative"
                    key={index}
                  >
                    <div className=" text-orange-500  p-1 absolute top-0 left-0 text-xs font-semibold">
                      {statusTeacher(i)}
                    </div>
                    <div className="aspect-square border rounded-full mt-5">image</div>
                    <div 
                  className=" h-14 w-14 bg-cover rounded-full mx-auto brightness-50 mt-3"
                  style={{
                    backgroundImage: `url(${i?.student?.dp})`,
                  }}
                ></div>
                    <div className="mt-6">
                      {i?.is_demo_req === 1 ? "Demo batch" : ""}
                    </div>
                    {statusTeacher(i) == "Paid" && <div>Rs {i?.fees}</div>}
                    <div>
                      <button className=" text-red-500 p-1">Remove</button>
                    </div>
                  </div>
                );
              })}
             
            </div>
          </>
        )} */}
      </FormModalBase>
    </>
  );
};
