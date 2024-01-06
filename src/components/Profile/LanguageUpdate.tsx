import { Lang } from "@/common/LangData";
import { Repo } from "@/services/Repo";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const LanguageUpdate = ({ setEditLang,setIsRefresh }: any) => {
  const [inputFields, setInputFields] = React.useState("");
  const AddFieldsHandler = async (e: any) => {
    e.preventDefault();
    let fdata = new FormData();

    fdata.append("type", "language");

    fdata.append("name", inputFields);

    const data = await Repo.addMeta(fdata);
    setIsRefresh(true);
    toast.success("Language updated successfully", { autoClose: 2000 ,position: "bottom-right",});
    setEditLang(false);
  };

  return (
    <>
      <>
        <div className="mb-6">
          <FormControl variant="standard" className=" w-full">
            <InputLabel id="demo-simple-select-standard-label">
              Spoken Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              className=""
              value={inputFields}
              onChange={(e: any) => setInputFields(e.target.value)}
              label={"Spoken Language"}
              name="language"
              MenuProps={{
                style: { maxHeight: 200 },
              }}
            >
              {Lang?.map((subc: any, index:any) => {
                return (
                  <MenuItem key={index} className=" text-sm" value={subc}>
                    {subc}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <ToastContainer />

        <button
          className="text-white rounded-3xl  bg-xcool-new-blue px-4  py-1 cursor-pointer mb-4 mx-1"
          type="submit"
          onClick={AddFieldsHandler}
        >
          Save
        </button>
        <button
          className="text-white rounded-3xl bg-xcool-new-gray px-4  py-1 cursor-pointer mb-4"
          type="submit"
          onClick={() => setEditLang(false)}
        >
          Cancel
        </button>
      </>
    </>
  );
};

export default LanguageUpdate;
