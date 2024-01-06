import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { SubHeading } from "@/common/Text/SubHeading";
import { category } from "@/utils/filterCategory";
import { Radio, FormControlLabel } from "@mui/material";

export const Filter = ({ resetForm, checkedItems, handleCheckbox }: any) => {
  const handleRadioChange: any = (a: any, b: any) => {
    handleCheckbox(a, b);
  };

  const checkedHandler = (item: any, level: any) => {
    const temp: any = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
    };

    const gg =
      temp[checkedItems[item.property]] !== undefined
        ? temp[checkedItems[item.property]]
        : checkedItems[item.property];

    if (gg === level) {
      return true;
    }
    return false;
  };

  return (
    <form className="px-3 bg-xcool-new-blue-bg ">
      <div className="flex justify-between items-center">
        <SubHeading title="Filter" align="left" />
        <button
          className="px-6 py-1 bg-xcool-new-gray text-white rounded-full font-bold"
          onClick={resetForm}
        >
          Reset
        </button>
      </div>

      <FormControl className="mx-3" size={"small"}>
        {category.map((item: any) => (
          <div key={item.title}>
            <p className=" font-semibold">{item.title}</p>
            {item.levelList.map((level: any, index: any) => (
              <div className="flex" key={index}>
                <FormControlLabel
                  key={index}
                  control={<Radio size="small" />}
                  labelPlacement="end"
                  label={level}
                  name={item.property}
                  value={level}
                  checked={checkedHandler(item, level)}
                  onChange={() => handleRadioChange(item.property, level)}
                />
              </div>
            ))}
          </div>
        ))}
      </FormControl>
    </form>
  );
};
