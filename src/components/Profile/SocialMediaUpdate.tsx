import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

export const SocialMediaUpdate = ({ setEditMedia, user }: any) => {
  const token = localStorage.getItem("token");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ defaultValues: user?.details });

  const onSubmit = async (data: any) => {
    // console.log(data, "data");
    setEditMedia(false)
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateMySocials`,
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
        toast.success("SocialMedia updated successfully", { autoClose: 2000 ,position: "bottom-right",});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-6 px-4">
        <div className="mb-6 grid grid-cols-1 gap-5">
          <TextField
            type="text"
            id="standard-basic"
            variant="standard"
            label="YouTube"
            {...register("yt")}
          />
          <TextField
            type="text"
            id="standard-basic"
            variant="standard"
            label="Linkedin"
            {...register("linkedin")}
          />
          <TextField
            type="text"
            id="standard-basic"
            variant="standard"
            label="Instagram"
            {...register("insta")}
          />
          <TextField
            type="text"
            id="standard-basic"
            variant="standard"
            label="Twitter"
            {...register("twitter")}
          />
        </div>
      </div>
      <ToastContainer />
      <div className="my-10 text-center">
        <button
          className="text-white rounded-3xl bg-xcool-new-blue px-6  py-2  cursor-pointer" type="submit"
          // onClick={() => setEditMedia(false)}
        >
          Save Changes
        </button>
        <button
          className="text-white rounded-3xl bg-xcool-new-gray px-6  py-2 mx-1 cursor-pointer"
          onClick={() => setEditMedia(false)}
        >
          Cancel
        </button>
      </div>
    </form>
    // <div>
    //   SocialMediaUpdate
    //   <div>

    //     <p className=" text-2xl font-bold opacity-50 my-6">
    //       Social Media Information
    //     </p>
    //     <div className="mb-6 grid grid-cols-1 gap-5">
    //       <TextField
    //         type="text"
    //         id="standard-basic"
    //         variant="standard"
    //         label="YouTube"
    //         {...register("details.yt")}
    //       />
    //       <TextField
    //         type="text"
    //         id="standard-basic"
    //         variant="standard"
    //         label="Linkedin"
    //         {...register("details.linkedin")}
    //       />
    //       <TextField
    //         type="text"
    //         id="standard-basic"
    //         variant="standard"
    //         label="Instagram"
    //         {...register("details.insta")}
    //       />
    //       <TextField
    //         type="text"
    //         id="standard-basic"
    //         variant="standard"
    //         label="Twitter"
    //         {...register("details.twitter")}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};
