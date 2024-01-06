import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const TimeSlotUpdate = ({ timeslots, setEditTime }: any) => {
  const token = localStorage.getItem("token");

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: timeslots
  });
  console.log(timeslots);

  const onSubmit = async (data: any) => {
    // console.log(data, "data");
    setEditTime(false);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateMyTimeSlots`,
      headers: {
        "Content-Type": "multipart/form-data;",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast.success("Timeslot updated successfully", { autoClose: 2000 ,position: "bottom-right",})
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className=" text-sm md:text-xl font-bold opacity-50 my-6">Time Slots</p>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Monday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_1")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_1")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_1")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_1")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Tuesday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_2")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_2")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_2")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_2")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Wednesday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_3")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_3")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_3")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_3")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Thursday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_4")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_4")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_4")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_4")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Friday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_5")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_5")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_5")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_5")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Saturday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_6")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_6")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_6")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_6")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-7 items-center gap-3 mb-5">
        <p>Sunday</p>
        <div className="mx-3 lg:col-span-6  grid md:grid-cols-5 gap-2">
          <TextField
            {...register("range_1_start_7")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_1_end_7")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <span className="text-center font-bold text-base">&</span>
          <TextField
            {...register("range_2_start_7")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
          <TextField
            {...register("range_2_end_7")}
            type="time"
            id="standard-basic"
            variant="standard"
          />
        </div>
      </div>
      <ToastContainer />
      <div className="my-10 text-center">
        <button
          className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer"
          type="submit"
        >
          Save Changes
        </button>
        
      </div>
    </form>
  );
};
