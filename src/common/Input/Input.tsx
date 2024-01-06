import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { Controller,useFormContext } from "react-hook-form";
interface PropsType {
  type: string;
  name: string;
  label: string;
  errors: any;
  register: any;
  control: any;
 
}

export const Input = ({
  type,
  name,
  label,
  errors,
  register,
  control,
 
}: PropsType) => {
  const formContext = useFormContext();
  return (
    <>
      {/* <label className=" text-xs  ps-6 py-4"></label> */}
      <div className="mb-7">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          // <TextField label={"Text Value"} />
          <TextField  onChange={onChange} value={value} id="standard-basic"  label={label} variant="standard" size="small" />
        )}
      />
      </div>
      
      {/* <input
        className=" border-solid border-b-2 border-black w-60 mx-auto focus:outline-none"
        type={type}
        name={name}
        {...register(name, {})}
      /> */}
      {errors[name] && (
        <p className=" text-red-600 text-center">{errors[name].message}</p>
      )}
    </>
  );
};
