import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function AutocompleteDropdown({ data, label, onValueChange ,setFilterCategory,setvalue}: any) {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (event: any, newValue: any) => {
    // setvalue(newValue ? newValue : null);
    onValueChange(newValue);
    setFilterCategory((pre: any) => {
        return {
          ...pre,
          ["cert_id"]: newValue,
        };
      });
  };
  

  return (
    <div>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => option} // Use 'slug' as the label
        id={`${label.toLowerCase()}-autocomplete`}
        disableCloseOnSelect
        value={data.find((item: any) => item === setvalue)} // Find the item object based on the selected slug
        onChange={handleValueChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Choose a ${label}`}
            variant="standard"
          />
        )}
      />
    </div>
  );
}

export default AutocompleteDropdown;
