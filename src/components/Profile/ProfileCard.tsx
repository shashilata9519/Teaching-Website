import { Repo } from "@/services/Repo";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GrEdit } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";

export const ProfileCard = ({
  user,
  AccountType,
  cardType,
  setIsRefresh,
}: any) => {
  const inputRef = useRef<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const ImageHandler = () => {
    inputRef.current.click();
  };

  const age = moment().diff(`${user?.dob}`, "years");
  // console.log(age,'age')

  const uploadFileHandler = async (event: any) => {
    // setSelectedImage(URL.createObjectURL(event.target.files[0]));
    const fdata = new FormData();
    fdata.append("profile_photo", event.target.files[0]);
    await Repo.updatePic(fdata);
    toast.success("Profile Photo updated", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setIsRefresh(true);
  };

  return (
    <div className=" flex gap-3 flex-wrap">
      <div onClick={ImageHandler} className="relative mt-4">
        <div
          className={` h-28 w-28 bg-cover rounded-full `}
          style={{
            backgroundImage: `url(${selectedImage ? selectedImage : user?.dp})`,
          }}
        ></div>
        {cardType !== "view" && (
          <span className=" p-3">
            <GrEdit
              className=" rounded-full border-xcool-new-blue text-xcool-new-blue"
              style={{
                position: "absolute",

                // top: "28%",
                right: "0px",
                bottom: "40px",
                cursor: "pointer",
                fontSize: "1rem",

                backgroundColor: "white",
                padding: "9px",
                width: "40px",
                height: "40px",
                borderWidth: "2px",
              }}
            />

            <input
              type="file"
              ref={inputRef}
              className="hidden "
              onChange={uploadFileHandler}
            />
          </span>
        )}
      </div>
      <div className="my-6 flex flex-col flex-wrap">
        <div className=" text-2xl  font-bold mb-2">{user?.firstname}</div>
        <div className="mb-2">
          <strong className=" text-xcool-new-brown">Age : </strong>

          <span>{age}</span>
        </div>
        {AccountType === "teacher" && (
          <div className="mb-2">
            <strong className=" text-xcool-new-brown">
              Years of Experience :{" "}
            </strong>

            <span>{user?.details?.yoe}</span>
          </div>
        )}

        <div className="mb-2">
          <strong className=" text-xcool-new-brown">Location : </strong>

          <span>{user?.city}</span>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
