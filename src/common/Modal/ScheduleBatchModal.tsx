import {
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

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { FormModalBase } from "./FormBaseModal";
import Form1 from "@/components/Form/Form1";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Repo } from "@/services/Repo";
import moment from "moment";
import { getDatesBetween, getDatesForN } from "@/utils/Helpers";
import { ToastContainer, toast } from "react-toastify";
import CustomSelect from "react-select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const ScheduleBatchModal = ({
  isOpen,
  closeModal,
  modalState,
  item,
  setRefresh,
  course_id,
}: any) => {
  // /api/myCoursesDropdown
  // /api/studentDropdown

  // console.log(item, "batch");

  const schema: any = yup.object().shape({
    batch_name: yup.string().required("batch Name is required"),
    course_id: yup.number().required("Select a course"),
    // ratepc: yup.number().required("Enter Fees per class"),
    // currency: yup.string().required("currency is required"),
    isChecked: yup.string(),
    start_time: yup.string().required("Start time is required"),
    end_time: yup.string().required("End time is required"),
    start_date: yup.string().required("start date is required"),
    // end_date: yup.string().required("end date is required"),
    // student_ids:yup.array().required('Student is required')
    // student_ids: yup
    //   .array()
    //   .min(1, "At least one student is required") // Minimum 1 student is required
    //   .required("Student is required"),
  });

  const [myCourse, setMyCourse] = useState<any>([]);

  const [mystudent, setMyStudent] = useState<any>([]);
  // const [selectedStudent, setSelectedStudent] = React.useState<any>([
  //   mystudent,
  // ]);

  useEffect(() => {
    (async () => {
      const data1 = await Repo.courseDropDown();
      setMyCourse(data1);
      const data2 = await Repo.studentDropdown();
      setMyStudent(data2);
    })();
  }, []);

  const {
    register,
    getValues,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      batch_name: item?.batch_name || item?.batch?.batch_name,
      course_id: item?.course_id || course_id,
      start_time: item?.start_time || item?.batch?.start_time,
      start_date: item?.start_date || item?.batch?.start_date,
      end_time: item?.end_time,
      end_date: item?.end_date,
      // currency: "USD",
    },
  });

  const fixedOptions: any = [];
  const [value, setValueCustom] = React.useState([...fixedOptions]);
  const [isChecked, setIschecked] = useState<any>([]);

  const errorMsg: any = errors?.batch_name && errors?.batch_name?.message;
  const course_idMsg: any = errors?.course_id && "Select a course";

  const [student_idMsg, setStudent_idMsg] = useState(false);
  const eutc_timeMsg: any = errors?.end_time && errors?.end_time?.message;
  const ratepc_msg: any = errors?.ratepc && "Enter class price";
  const utc_timeMsg: any = errors?.start_time && errors?.start_time?.message;
  const start_dateMsg: any = errors?.start_date && errors?.start_date?.message;
  const end_dateMsg: any = errors?.end_date && errors?.end_date?.message;
  const [scheduleError, setScheduleError] = useState(false);
  const [scheduleData, setScheduleData] = useState<any>([]);

  const selectHandler = (i: any) => {
    if (isChecked?.includes(i?.id)) {
      let copy = [...isChecked];
      copy = copy.filter((item) => item !== i.id);
      setIschecked(copy);
    } else {
      setIschecked([...isChecked, i?.id]);
    }
    // touchSchedule();
  };
  console.log(scheduleData,"scheduleData")
  
  useEffect(() => {
    const values = getValues();
    console.log(values, "values1");
    if (values?.start_date != "" && values?.start_time != "") {
      console.log(
        values.start_date + " " + convertISO(values?.start_time),
        "values2"
      );
      const scheduleLength = getDatesForN(
        values.start_date + " " + convertISO(values?.start_time),
        item?.lead?.no_classes,
        values.start_time,
        isChecked
      );
      console.log(
        scheduleLength,
        "valuesscheduleLength"
      );
      // setValue("end_date", scheduleLength[scheduleLength.length - 1]);
      // values.enddate =
      setScheduleData(scheduleLength);
    }

   
  }, [isChecked]);


  function calculateDuration(startTime: any, endTime: any) {
    // Parse the start and end times
    const format = "HH:mm";
    const startMoment = moment(startTime, format);
    const endMoment = moment(endTime, format);

    // Calculate the duration in minutes
    const duration = moment.duration(endMoment.diff(startMoment)).asMinutes();

    return duration;
  }
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
    
    data.weekdays = isChecked || null;
    data.student_ids = [Number(item?.lead?.student_id? item?.lead?.student_id : item?.student?.id)];
    data.class_datetime = data.start_date + " " + convertISO(data?.start_time);
    data.class_edatetime =
      scheduleData[scheduleData.length - 1] + " " + convertISO(data?.end_time);
    data.duration = calculateDuration(data?.start_time, data?.end_time);
    data.utc_time = convertISO(data?.start_time);
    data.eutc_time = convertISO(data?.end_time);
    data.end_date = scheduleData[scheduleData.length - 1];
    data.lead_id = item?.lead_id;

    data.schedule = scheduleData;

    if (data.schedule?.length > 0 && data.student_ids?.length > 0) {
      console.log("test submit2");
      setScheduleError(false);
      setStudent_idMsg(false);
      const res = await Repo.scheduleBatchRequest(data);

      setRefresh(true);
      closeModal(true);
      if (res?.success) {
        toast.success("Batch scheduled successfully", {
          autoClose: 2000,
          position: "bottom-right",
        });
      } else {
        toast.error("Something went wrong. Try Again!", {
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } else {
      // Both conditions are checked here
      if (data.schedule?.length === 0) {
        setScheduleError(true);
      } else {
        setScheduleError(false);
      }

      if (data.student_ids?.length === 0) {
        setStudent_idMsg(true);
      } else {
        setStudent_idMsg(false);
      }
    }
  };

  const setDays = [
    {
      id: 0,
      day: "S",
    },
    {
      id: 1,
      day: "M",
    },
    {
      id: 2,
      day: "T",
    },
    {
      id: 3,
      day: "W",
    },
    {
      id: 4,
      day: "T",
    },
    {
      id: 5,
      day: "F",
    },
    {
      id: 6,
      day: "S",
    },
  ];

  return (
    <FormModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title="Schedule Batch"
    >
      <div className="mt-2">
        {/* <button onClick={notify}>Notify !</button> */}
        <form className=" my-4 p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <TextField
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
                    <MenuItem key={index} className=" text-xs" value={item?.id}>
                      {item?.course_name}
                    </MenuItem>
                  );
                })}
              </Select>
              {course_idMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {course_idMsg}
                </p>
              )}
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                No of Classes: {item?.lead?.no_classes}
              </InputLabel>
            </div>
            <div></div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
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
                {...register("start_date")}
              />
              {start_dateMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {start_dateMsg}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Class End Date
              </InputLabel>
              {/* <TextField
                id="standard-basic"
                variant="standard"
                type="date"
                disabled={true}
                className=" w-full"
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                  // max: maxDateFormatted,
                }}
                {...register("end_date")}
              /> */}
              <span>
                {moment(scheduleData[scheduleData?.length - 1]).format(
                  "DD MMM YYYY"
                ) ?? "Select a start date"}
              </span>
              {end_dateMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {end_dateMsg}
                </p>
              )}
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
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
                {...register("start_time")}
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
                {...register("end_time")}
              />
              {eutc_timeMsg && (
                <p className=" text-red-600 text-center text-xs">
                  {eutc_timeMsg}
                </p>
              )}
            </div>
          </div>

          <div className="my-3 flex ">
            <InputLabel
              id="demo-simple-select-standard-label"
              variant="standard"
              className="my-2"
            >
              Student:{" "}
            </InputLabel>
            <InputLabel
              id="demo-simple-select-standard-label"
              variant="standard"
              className="my-2"
            >
              {item?.student?.firstname}
            </InputLabel>
          </div>

          {student_idMsg && (
            <p className=" text-red-600 text-center text-xs">
              Please select at least one student
            </p>
          )}
          <InputLabel
            id="demo-simple-select-standard-label"
            variant="standard"
            className="my-2"
          >
            Class Occurs Every
          </InputLabel>
          <div className="flex justify-around">
            {setDays?.map((i: any) => {
              return (
                <p
                  key={i?.id}
                  className={`${
                    isChecked.indexOf(i?.id) > -1 ? "bg-black text-white" : " "
                  } rounded-full text px-2 mx-2 border cursor-pointer`}
                  onClick={() => selectHandler(i)}
                >
                  {i.day}
                </p>
              );
            })}
          </div>
          {scheduleError && (
            <p className=" text-red-600 text-center text-xs">
              No classes in the selected schedule
            </p>
          )}
          {/* {scheduleData?.length > 0 && (
            <div className="mt-2">
              Total Fees :{watch("currency")}{" "}
              {scheduleData?.length * watch("ratepc")}
            </div>
          )} */}
          Classes:
          <div className="flex flex-col overflow-x-hidden overflow-scroll h-32">
            {scheduleData?.map((item: any, key: any) => {
              return (
                <span key={key}>
                  Class {key + 1} :{" "}{moment(item).format("DD MMM YYYY")}
                </span>
              );
            })}
          </div>

          <div className="text-center">
            <button
              className="mt-5 bg-red-500 px-2 py-1 mx-3  text-white rounded-3xl"
              onClick={closeModal}
            >
              Discard
            </button>
            <button className="mt-5 bg-xcool-new-blue px-2 py-1  text-white rounded-3xl">
              Save & Schedule
            </button>
          </div>
        </form>

        {/* <TextField
              id="standard-basic"
              label="Fees ($)"
              variant="standard"
              {...register("DollarFee")}
            /> */}
        {/* <div>
              <InputLabel
                id="demo-simple-select-standard-label"
                variant="standard"
              >
                Choose Video Option
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={age}
                // onChange={handleChange}
                label=" Choose Video Option"
                className="w-full"
                variant="standard"
                {...register("video_option")}
              >
                <MenuItem value={"xcool"} selected={true}>
                  Xcool
                </MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
              {errors.video_option && <p className=" text-red-600 text-center text-xs">{errors.video_option.message}</p>}
           
            </div> */}
      </div>
      <ToastContainer />
    </FormModalBase>
  );
};
