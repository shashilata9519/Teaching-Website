import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

import axios from "axios";

import { Controller, useForm } from "react-hook-form";
import { SuccessModal } from "@/common/Modal/SuccessModal";
import { LoginModal } from "@/common/Modal/LoginModal";
import { Repo } from "@/services/Repo";

export const BookingSlotCard = ({
  Booking,
  selectHandler,
  isChecked,
  course_id,
}: any) => {
  const [AccountType, SetAccountType] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  useEffect(() => {
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);
  }, []);

  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  const findDay = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function filterByday(index: any) {
    const fill = Booking.filter((item: any) => item.day == index);
    return [...fill];
  }

  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }

  const onClickHandler = (i: any) => {
    selectHandler(i);
  };

  const [value, setValue] = useState<any>('');

  const onChange = (e: any) => {
    setValue(e.value.target);
  };
  // console.log(value,'value')

  const RequestHandler = async (type: any) => {
    const token = localStorage.getItem("token");
    let fdata: any = new FormData();
    if (!token) {
      modalHandler({ type: "login" });
      return;
    }
    fdata.append("custom_timing", value || null);
    fdata.append("selected_slot_id", isChecked.toString() || null);
    fdata.append("course_id", course_id || null);

    switch (type) {
      case "demo":
        fdata.append("is_demo", 1);
        break;
      default:
        break;
    }
  

      await Repo.bookSlot(fdata);
      modalHandler({ type: "success" });
    
    // if(type=="demo"){
    // alert("demomodal")
    //   return
    // }
   
  };

  return (
    <div className="bg-[#ffffff] shadow-md shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] w-full mt-2 rounded-3xl p-5 h-max">
      <div className="text-left text-xcool-new-blue text-3xl font-bold">
        Select time slot(s)
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {Booking?.length === 0 ? (
        <div className="m-5">Not Available</div>
      ) : (
        <div className="text-base font-bold mt-3">
          {findDay?.map((item: any, index: any) => {
            return (
              <div key={index}>
                {filterByday(index)?.length ? (
                  <>
                    <div
                      key={index}
                      className="flex justify-between items-center  my-3 "
                    >
                      <div className="mx-3">{item}</div>
                      <div className=" flex flex-wrap align-baseline">
                        {filterByday(index).map((i: any, index: any) => {
                          return (
                            <div
                              onClick={() => onClickHandler(i)}
                              className={` ${
                                isChecked?.indexOf(i?.slot_id) > -1
                                  ? "bg-orange-400"
                                  : " bg-white "
                              } rounded-3xl   border border-orange-400 text-center px-3 mx-1 cursor-pointer  py-2`}
                              key={index}
                            >
                              {i?.timeslot}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
      {AccountType === "teacher" ? (
        <p className=" font-semibold my-3">Note - Only Student can Apply</p>
      ) : (
        <>
          <div className=" my-10">
            <p className=" text-xl font-semibold">
              Or request for a custom timing
            </p>
            <TextField
              onChange={onChange}
              value={value}
              label="eg: Monday at 3:00pm -4:00px"
              variant="standard"
              sx={{ width: "100%" }}
            />

            {/* <Controller
                name={"customslot"}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    label="eg: Monday at 3:00pm -4:00px"
                    variant="standard"
                    sx={{ width: "100%" }}
                  />
                )}
              /> */}
            <p className=" text-sm mt-5">
              Great! Now, send your application to the teacher. You shall
              receive an email with your application status.
            </p>
            <p className=" font-semibold my-3">
              Note - This is just an application and payment is not getting
              deducted at this stage.
            </p>
          </div>
          <div className="flex justify-around my-5">
            <button
              type="submit"
              className=" bg-xcool-new-blue rounded-3xl px-4 text-white font-semibold py-1 shadow-md"
              // onClick={() => modalHandler({ type: "success" })}
              onClick={() => RequestHandler("apply")}
            >
              Apply for Class
            </button>
            <button
              className=" rounded-3xl px-4 text-xcool-new-blue font-semibold py-1 shadow-md"
              type="submit"
              onClick={() => RequestHandler("demo")}
            >
              Request for Demo
            </button>
          </div>
        </>
      )}
      {/* </form> */}

      {modalState.type === "success" && (
        <SuccessModal modalState={modalState} closeModal={setmodalState} />
      )}
      {modalState.type === "login" && (
        <LoginModal modalState={modalState} closeModal={setmodalState} />
      )}
    </div>
  );
};
