import { Textarea } from "@mui/joy";
import { TextField } from "@mui/material";
import axios from "axios";

import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const ProfileUpdate = ({
  setEditAccountInfo,
  AccountType,
  user,
  setIsRefresh,
}: any) => {
  const {
    register,
    formState: { errors },
    handleSubmit,

    control,
  } = useForm({
    defaultValues: {
      bio: user?.details?.bio,
      firstname: user?.firstname,
      email: user?.email,
      phone_no: user?.phone_no,
      dob: user?.dob,
      yoe: user?.details?.yoe,
      country: user?.country,
      city: user?.city,
      rateph: user?.details?.rateph,
      usd_rateph: user?.details?.usd_rateph,
    },
  });
  // console.log(user,'user')
  const token = localStorage.getItem("token");

  const onSubmit = async (data: any) => {
    // console.log(data, "data");
    setEditAccountInfo(false);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateProfile`,
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
        setIsRefresh(true);
        toast.success("Profile updated successfully", {
          autoClose: 2000,
          position: "bottom-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-6 grid grid-cols-1 gap-4 px-2">
        {/* <div className=" grid grid-cols-1 gap-4"> */}
        <TextField
          id="standard-basic"
          label={`Full Name`}
          variant="standard"
          {...register("firstname")}
        />
        <TextField
          disabled
          type="email"
          id="standard-disabled"
          variant="standard"
          label={`Email`}
          {...register("email")}
        />

        <TextField
          type="number"
          id="standard-basic"
          variant="standard"
          label={`Phone Number`}
          {...register("phone_no")}
        />

        <TextField
          type="date"
          id="standard-basic"
          variant="standard"
          label={`DOB`}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("dob")}
        />

        {AccountType === "teacher" && (
          <TextField
            type="number"
            id="standard-basic"
            variant="standard"
            label={"Year of experience"}
            {...register("yoe")}
          />
        )}
        {/* {AccountType === "student" && (
          <>
            <TextField
              type="password"
              id="standard-basic"
              variant="standard"
              label={"password"}
              {...register("password")}
            />
            <TextField
              type="password"
              id="standard-basic"
              variant="standard"
              label={"Re-Enter Password"}
              {...register("reEnterPassword")}
            />
          </>
        )} */}

        <TextField
          id="standard-basic"
          label={`Country`}
          variant="standard"
          {...register("country")}
        />
        <TextField
          type="text"
          id="standard-basic"
          variant="standard"
          label={`City`}
          {...register("city")}
        />

        {AccountType === "teacher" && (
          <div className="grid md:grid-cols-2 gap-2 grid-cols-1 items-center">
            <TextField
              type="number"
              id="standard-basic"
              variant="standard"
              label={`Rate per hour (INR)`}
              {...register("rateph")}
            />
            <TextField
              type="number"
              id="standard-basic"
              variant="standard"
              label={`For international students (INR)`}
              {...register("usd_rateph")}
            />
          </div>
        )}
        <Textarea
          placeholder="Type Bio…"
          minRows={5}
          variant="outlined"
          sx={{ marginTop: "10px" }}
          {...register("bio")}
        />
        {/* </div> */}
        {/* {AccountType === "teacher" && (
          <div>
            <p className=" text-2xl font-bold opacity-50 my-6">
              Social Media Information
            </p>
            <div className="mb-6 grid grid-cols-1 gap-5">
              <TextField
                type="text"
                id="standard-basic"
                variant="standard"
                label="YouTube"
                {...register("details.yt")}
              />
              <TextField
                type="text"
                id="standard-basic"
                variant="standard"
                label="Linkedin"
                {...register("details.linkedin")}
              />
              <TextField
                type="text"
                id="standard-basic"
                variant="standard"
                label="Instagram"
                {...register("details.insta")}
              />
              <TextField
                type="text"
                id="standard-basic"
                variant="standard"
                label="Twitter"
                {...register("details.twitter")}
              />
            </div>
          </div>
        )} */}
      </div>
      <div className="my-10 text-center">
        <button
          className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer"
          type="submit"
          // onClick={() => setEditAccountInfo(false)}
        >
          Save Changes
        </button>
        <a
          className="text-white rounded-3xl bg-xcool-new-gray px-6  py-2 mx-1 cursor-pointer"
          onClick={() => setEditAccountInfo(false)}
        >
          Cancel
        </a>
      </div>
      <ToastContainer />
    </form>
  );
};
