import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
const CheckBoxInput = ({label1,label2,label3,title,name,value,handleInputChange}:any) => {

  return (
    <>
      <FormLabel id="demo-radio-buttons-group-label" className="my-2">{title}</FormLabel>

      <FormControlLabel
        value={value}
        control={<Checkbox size="small" />}
        name={name}
        label={label1}
        labelPlacement="end"
        onChange={handleInputChange}
      />
      <FormControlLabel
        value={value}
        control={<Checkbox size="small" />}
        label={label2}
         name={name}
        labelPlacement="end"
        onChange={handleInputChange}
      />
      <FormControlLabel
        value={value}
        control={<Checkbox size="small" />}
        label={label3}
        labelPlacement="end"
        name={name}
        onChange={handleInputChange}
      />
    </>
  );
};
export default CheckBoxInput