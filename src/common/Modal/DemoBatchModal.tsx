import {
  Autocomplete,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormModalBase } from "./FormBaseModal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Repo } from "@/services/Repo";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

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

function getStyles(
  name: string,
  studentUsername: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      studentUsername.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const DemoBatchModal = ({
  isOpen,
  closeModal,
  modalState,
  item,
  setRefresh,
}: any) => {
  const schema: any = yup.object().shape({
    batch_name: yup.string().required("batch Name is required"),
    course_id: yup.number().required("Select a course"),
    // video_option:yup.string().required('video_option is required'),
    isChecked: yup.string(),
    utc_time: yup.string().required("utc time is required"),
    eutc_time: yup.string().required("eutc time is required"),
    demo_date: yup.string().required("demo date is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      batch_name: item?.batch_name || item?.batch?.batch_name,
      course_id: item?.course_id,
      utc_time: item?.start_time || item?.batch?.start_time,
      demo_date: item?.start_date || item?.batch?.start_date,
      eutc_time: item?.end_time,
    },
  });
  const errorMsg: any = errors.batch_name && errors.batch_name.message;
  const course_idMsg: any = errors?.course_id && errors?.course_id?.message;
  const eutc_timeMsg: any = errors?.eutc_time && errors?.eutc_time?.message;
  const utc_timeMsg: any = errors?.utc_time && errors?.utc_time?.message;
  const demo_dateMsg: any = errors?.demo_date && errors?.demo_date?.message;

  const [myCourse, setMyCourse] = useState<any>([]);
  const [mystudent, setMyStudent] = useState<any>([]);

  const fixedOptions: any = [];
  const [value, setValue] = React.useState([...fixedOptions]);
  const [student_idMsg, setStudent_idMsg] = useState(false);

  function convertISO(time: any) {
    // Parse the start and end times
    const format = "HH:mm";
    let date = new Date();
    const temp = moment(time, format).utc().format("HH:mm");
    // .format(format);

    // Calculate the duration in minutes

    return temp;
  }

  const onSubmit = async (data: any) => {
    data.is_demo = 1;
    data.student_ids = value?.map((item: any) => item?.id);
    data.class_datetime = data?.demo_date + " " + convertISO(data?.utc_time);
    data.class_edatetime = data?.demo_date + " " + convertISO(data?.eutc_time);

    // console.log(data, "data");
    if (data.student_ids?.length > 0) {
      setStudent_idMsg(false);
      const res = await Repo.demoBatchRequest(data);
      setRefresh(true);
      closeModal(true);
      if (res?.success) {
        toast.success("Demo Batch created", {
          autoClose: 2000,
          position: "bottom-right",
        });
      } else {
        toast.error("Something went wrong. Try Again!", {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
      // toast.success("Demo Batch created", { autoClose: 2000,position: "bottom-right", });
    } else {
      if (data.student_ids?.length === 0) {
        setStudent_idMsg(true);
      } else {
        setStudent_idMsg(false);
      }
    }

    // console.log(errors,'error')
  };

  useEffect(() => {
    (async () => {
      const data1 = await Repo.courseDropDown();
      setMyCourse(data1);
      const data2 = await Repo.studentDropdown();
      setMyStudent(data2);
    })();
  }, []);

  // console.log(isChecked,'isChecked')

  return (
    <FormModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title="Demo Batch"
    >
      <div className="mt-2">
        <form className=" my-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <TextField
                type="text"
                id="standard-basic"
                label="Batch Name"
                variant="standard"
                {...register("batch_name")}
              />
              {errorMsg && (
                <p className=" text-red-600 text-center text-xs">{errorMsg}</p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Course
              </InputLabel>

              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Course"
                className="w-full"
                variant="standard"
                defaultValue={item?.course_id}
                {...register("course_id")}
              >
                {myCourse?.map((item: any, index: any) => {
                  return (
                    <MenuItem className=" text-xs" key={index} value={item?.id}>
                      {item?.course_name}
                    </MenuItem>
                  );
                })}
                {/* <MenuItem value={"Course2"}>Course1</MenuItem> */}
                {/* <MenuItem value={"Course3"}>Course2</MenuItem> */}
              </Select>
              {course_idMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {course_idMsg}
                </p>
              )}
            </div>

            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class Start Date
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="date"
                className=" w-full"
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                  // max: maxDateFormatted,
                }}
                {...register("demo_date")}
              />
              {demo_dateMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {demo_dateMsg}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class Start time
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="time"
                className=" w-full"
                {...register("utc_time")}
              />
              {utc_timeMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {utc_timeMsg}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class End time
              </InputLabel>
              <TextField
                id="standard-basic"
                variant="standard"
                type="time"
                className=" w-full"
                {...register("eutc_time")}
              />
              {eutc_timeMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {eutc_timeMsg}
                </p>
              )}
            </div>
          </div>
          <div className="my-3">
            <Autocomplete
              multiple
              id="fixed-tags-demo"
              value={value}
              getOptionLabel={(option) => option?.firstname}
              onChange={(event: any, newValue: any) => {
                setValue([
                  ...fixedOptions,
                  ...newValue.filter(
                    (option: any) => fixedOptions.indexOf(option) === -1
                  ),
                ]);
              }}
              options={mystudent}
              // getOptionLabel={(option) => option.firstname}
              renderTags={(tagValue, getTagProps) =>
                tagValue?.map((option, index) => (
                  <div key={index}>
                    <Chip
                      label={option?.firstname}
                      {...getTagProps({ index })}
                      // disabled={fixedOptions.indexOf(option) !== -1}
                    />
                  </div>
                ))
              }
              className=" w-full"
              // style={{ width: 200 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Student"
                  placeholder="Search student"
                />
              )}
            />
          </div>
          {student_idMsg && (
            <p className=" text-red-600 text-center text-xs">
              Please select at least one student
            </p>
          )}

          {/* <div className="my-3">
            <InputLabel id="demo-multiple-chip-label">Student</InputLabel>
            <Select
              className=" w-full"
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={studentUsername}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={mystudent[value]?.firstname} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {mystudent?.map((i:any,index:any) => (
                <MenuItem
                onClick={()=>selectStudentHandler(i?.id)}
                  key={index}
                  value={index}
                  style={getStyles(i?.firstname, studentUsername, theme)}
                >
                  {i?.firstname}
                </MenuItem>
              ))}
            </Select>
          </div> */}
          <div className="text-center">
            <button
              className="mt-5 bg-red-500 px-2 py-1 mx-3  text-white rounded-3xl"
              onClick={closeModal}
            >
              Discard
            </button>
            <button
              className="mt-5 bg-xcool-new-blue px-2 py-1  text-white rounded-3xl"
              type="submit"
            >
              Save & Send invites
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </FormModalBase>
  );
};
