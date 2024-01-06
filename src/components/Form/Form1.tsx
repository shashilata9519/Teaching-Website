import { Input } from "@/common/Input/Input";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormLabel from "@mui/material/FormLabel";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function Form1({ fields, onSubmit, className, btn }: any) {
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
    // console.log(data, "registration data");
    onSubmit({ ...data,gender:selectedGender });
  };

  
  const [selectedGender, setSelectedGender] = useState("female");
  console.log(errors,'ddd')

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event);
    setSelectedGender(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="text-center">
      <div className={className}>
        {fields.map((field: any, index: number) => {
          return (
            <div className="md:mt-4" key={index}>
              {field.type !== "select" && field.type !== "select1" && (
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
              )}

              {field.type === "select" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      {field.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={field.label}
                      {...register(field.name, {
                        required: field.required,
                      })}
                    >
                      <MenuItem value={"music"}>Music</MenuItem>
                      <MenuItem value={"yoga"}>Yoga</MenuItem>
                      <MenuItem value={"dance"}>Dance</MenuItem>
                    </Select>
                    
                  </FormControl>
                </>
              )}
               {field.type === "select1" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      {field.label}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={field.label}
                      {...register(field.name, {
                        required: field.required,
                      })}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}

              {/* {field.type === "radio" && (
                <>
                  <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group">
                    Gender
                  </FormLabel>
                  <br />
                  <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      row
                      {...register(field.name, {
                        required: field.required,
                      })}
                    >
                      <FormControlLabel
                        value="female"
                        name="gender"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        name="gender"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                  Female
                  <Radio
                    checked={selectedGender === "female"}
                    onChange={handleGenderChange}
                    value="female"
                    name="gender"
                    inputProps={{ "aria-label": "Female" }}
                  />
                  Male
                  <Radio
                    checked={selectedGender === "male"}
                    onChange={handleGenderChange}
                    value="male"
                    name="gender"
                    inputProps={{ "aria-label": "Male" }}
                  />
                </>
              )} */}

              {errors[field?.name] && (
                <p className=" text-red-600 text-center text-sm">
                  {errors[field?.name]?.message?.toString()}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="submit"
        className="text-white bg-black my-4 py-2 px-5 text-sm font-bold rounded-full mx-auto"
      >
        {btn}
      </button>
    </form>
  );
}
export default Form1;
