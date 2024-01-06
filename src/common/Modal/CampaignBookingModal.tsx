import Form from "@/components/Form/Form";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ModalBase } from "./ModalBase";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import Form1 from "@/components/Form/Form1";
import axios from "axios";
import { useRouter } from "next/router";

import * as yup from "yup";
import GoogleIcon from "@/assets/GoogleIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem, Select, TextField } from "@mui/material";
export const CampaignBookingModal = ({
  isOpen,
  closeModal,
  modalState,
  setSuccessState,
  allGenre,
}: any) => {
  const router = useRouter();

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      validation: yup.string().required("Enter your full name"),
    },

    {
      name: "email",
      label: "Email",
      type: "text",
      validation: yup
        .string()
        .email("Invalid email")
        .required("Enter your email address"),
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "number",

      validation: yup
        .string()
        .matches(/^[6-9]\d{9}$/, {
          message: "Please enter valid number.",
          excludeEmptyString: false,
        })
        .required("Enter your phone number"),
    },
  ];

  const onSubmit = (data: any) => {
    let fdata = new FormData();
    fdata.append("name", data.name);
    fdata.append("phone", data.phone);
    fdata.append("email", data.email);
    fdata.append("url", "/book-now");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/inquery`,
      headers: {
        "Content-Type": "multipart/form-data;",
      },
      data: fdata,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        closeModal({
          isOpen: false,
          type: "",
        });
        setSuccessState({
          isOpen: true,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const validationSchema = yup.object().shape(
    fields.reduce((schema: any, field: any) => {
      schema[field.name] = field.validation;
      return schema;
    }, {})
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data: any) => {
    onSubmit(data);
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title="Book your spot now!"
    >
      <div className="m-5 p-5">
        <form onSubmit={handleSubmit(onSubmitHandler)} className="text-center">
          <div className="">
            {fields.map((field: any, index: number) => {
              return (
                <div className="md:mt-4" key={index}>
                  <TextField
                    type={field.type}
                    id="standard-basic"
                    label={field.label}
                    variant="standard"
                    size="small"
                    {...register(field.name, {
                      required: field.required,
                    })}
                  />
                </div>
              );
            })}
            <div>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                variant="standard"
                label="Interested Course"
                className="mt-4 w-full border-white text-gray-500"
                defaultValue={"Interested Course"}
                {...register("subcategory")}
                MenuProps={{
                  style: { maxHeight: 200 },
                }}
                // InputLabelProps={{
                //   className:'text-white ',
                // }}
              >
                <MenuItem value={"Interested Course"}>
                  Interested Course
                </MenuItem>

                {[...allGenre]?.map(
                  (subc: any, index: React.Key | null | undefined) => {
                    // console.log(subc)
                    return (
                      <MenuItem
                        key={index}
                        className=" text-sm"
                        value={subc.slug}
                      >
                        {subc.subcategory}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-black py-2 px-5 text-sm font-bold rounded-full mx-auto my-4"
          >
            Book now
          </button>
        </form>
      </div>
    </ModalBase>
  );
};
