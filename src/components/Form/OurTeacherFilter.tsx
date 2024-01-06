import CheckBoxInput from "@/common/Checkbox/CheckBoxInput";
import { SubHeading } from "@/common/Text/SubHeading";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

import { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { Repo } from "@/services/Repo";
import AutocompleteDropdown from "@/common/AutocompleteDropdown";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  categoryGenre: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      categoryGenre.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const OurTeacherFilter = ({
  teachers,
  setFilterCategory,
  filterCategory,
  priceRange,
  setPriceRange,
}: any) => {
  const [filterData, setFilterData] = useState<any>(teachers || null);

  const handleChange = (e: any) => {
    setFilterCategory((pre: any) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };
  // console.log(filterCategory, "ff");

  const [subCategory, setSubCategory] = useState<any>([]);
  const [allDegrees, setAllDegrees] = useState<string[]>([]);
  const [allLocation, setAllLocation] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const resetHandler = (e: any) => {
    e.preventDefault();
    setFilterCategory({
      keyword: "",
      genre: "",
      level: "",
      location: "",
      cert_id: "",
      degrees: "",
      gender: "",
      price: "",
      city:""
    });
    // setCategoryGenre([]);
    setPriceRange([0, 5000]);
    setSelectedCategory(null);
    setSelectedDegree(null)
    setSelectedLocation(null)
  };
  const handlePriceChange = (event: any, newPriceRange: any) => {
    console.log(newPriceRange, "newPriceRange");
    setPriceRange(newPriceRange);
  };
  const theme = useTheme();

  const handleCategoryChange = (event: any, newValue: any) => {
    console.log(newValue?.slug, "selected");
    setSelectedCategory(newValue);
    setFilterCategory((pre: any) => {
      return {
        ...pre,
        ["genre"]: newValue?.slug,
      };
    });
  };
  const handleDegreeChange=(event: any, newValue: any)=>{
    console.log(newValue, "selected");
    setSelectedDegree(newValue);
    setFilterCategory((pre: any) => {
      return {
        ...pre,
        ["cert_id"]: newValue,
      };
    });

  }
  const handleLocationChange=(event: any, newValue: any)=>{
    console.log(newValue, "selected");
    setSelectedLocation(newValue);
    setFilterCategory((pre: any) => {
      return {
        ...pre,
       
        ["city"]: newValue,
      };
    });

  }
  console.log(filterCategory, "selected cate");

  // const handleChange1 = (event: SelectChangeEvent<typeof categoryGenre>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   console.log(value, "value123");
  //   setCategoryGenre(typeof value === "string" ? value.split(",") : value);

  //   setFilterCategory((pre: any) => {
  //     return {
  //       ...pre,
  //       ["genre"]: selectedCategory,
  //     };
  //   });
  // };
  // console.log(categoryGenre);
  useEffect(() => {
    (async () => {
      const data = await Repo.getGenre();
      setSubCategory(data);
      const degree = await Repo.getAllDegrees();
      setAllDegrees(degree);
      const location = await Repo.getAllLocation();
      setAllLocation(location);
    })();
  }, []);

  return (
    <div className="p-5 md:px-3 md:relative  rounded-lg bg-xcool-new-blue-bg">
      <div className="flex justify-between items-center">
        <SubHeading title="Filter" align="left" />
        <button
          className="px-6 py-1 bg-xcool-new-gray text-white rounded-full font-bold "
          onClick={resetHandler}
        >
          Reset
        </button>
      </div>
      <form className="md:mx-3">
        <div className="flex items-center justify-between my-2">
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderBottom: "2px solid #bac4ca",
              width: "100%",
            }}
            className=" hover:border-black"
            placeholder="Search Teacher,course,city 🔍"
            inputProps={{ "aria-label": "search google maps" }}
            value={filterCategory.keyword}
            onChange={handleChange}
            name="keyword"
          />
        </div>
        <div className="my-5 ">
          <Autocomplete
            options={subCategory}
            getOptionLabel={(option: any) => option?.slug} // Use 'slug' as the label
            id="category-customized-option-demo"
            disableCloseOnSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Genre"
                variant="standard"
              />
            )}
          />
        </div>
        {/* <div className="mt-5 ">
          <InputLabel id="demo-simple-select-standard-label">Genre</InputLabel>
          <Select
            className=" w-full"
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            // multiple
            value={categoryGenre}
            onChange={handleChange1}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {subCategory?.map((item: any, index: any) => (
              <MenuItem
                key={index}
                value={item?.slug}
                style={getStyles(item?.subcategory, categoryGenre, theme)}
              >
                {item?.subcategory}
              </MenuItem>
            ))}
          </Select>
        </div> */}
        <div className="mt-3 px-5 md:px-2">
          <Typography gutterBottom>Price Range</Typography>

          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            aria-label="Custom marks"
            defaultValue={30}
            // getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={250}
            marks={[
              {
                value: 500,
                label: "500",
              },
              {
                value: 1000,
                label: "1000",
              },
              {
                value: 1500,
                label: "1500",
              },
              {
                value: 2000,
                label: "2000",
              },
            ]}
            min={0}
            max={2500}
          />
        </div>

        <div className="mb-2 hidden">
          <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filterCategory.level}
              onChange={handleChange}
              label="Level"
              name="level"
            >
              <MenuItem value={"beginner"}>Beginner</MenuItem>
              <MenuItem value={"intermdiate"}>Intermdiate</MenuItem>
              <MenuItem value={"advanced"}>Advanced</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="my-5 ">
        <Autocomplete
            options={allDegrees}
            getOptionLabel={(option: any) => option} // Use 'slug' as the label
            id="category-customized-option-demo"
            disableCloseOnSelect
            value={selectedDegree}
            onChange={handleDegreeChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Degree"
                variant="standard"
              />
            )}
          />
        </div>

        {/* <div className="my-2">
          <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Degree
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filterCategory.cert_id}
              onChange={handleChange}
              label="Degree"
              name="cert_id"
            >
              <MenuItem value={"MA Music"}>MA Music</MenuItem>
              <MenuItem value={"Art Master"}>Art Master</MenuItem>
              <MenuItem value={"MA  in Hindustani Vocal Music"}>
                MA in Hindustani Vocal Music
              </MenuItem>
              <MenuItem value={"Sangeet Visharad"}>Sangeet Visharad</MenuItem>
              <MenuItem value={"M.Mus Praveen"}>M.Mus Praveen</MenuItem>
              <MenuItem value={"B.com"}>B.com</MenuItem>
              <MenuItem value={"Tabla Alankar"}>Tabla Alankar</MenuItem>
              <MenuItem value={"Sound Engineering"}>Sound Engineering</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        {/* <div className="my-2">
          <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filterCategory.city}
              onChange={handleChange}
              label="Location"
              name="city"
            >
              <MenuItem value={"Puri"}>Puri</MenuItem>
              <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
              <MenuItem value={"Navi Mumbai"}>Navi Mumbai</MenuItem>
              <MenuItem value={"Raipur"}>Raipur</MenuItem>
              <MenuItem value={"Aurangabad"}>Aurangabad</MenuItem>
            </Select>
          </FormControl>
        </div> */}
        <div className="my-5 ">
        <Autocomplete
            options={allLocation}
            getOptionLabel={(option: any) => option} // Use 'slug' as the label
            id="category-customized-option-demo"
            disableCloseOnSelect
            value={selectedLocation}
            onChange={handleLocationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a Location"
                variant="standard"
              />
            )}
          />
          
        </div>
        <div className="my-2">
          <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Sort by
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={filterCategory.sortby}
              onChange={handleChange}
              label="Location"
              name="sortby"
            >
              <MenuItem value={"A to Z"}>A to Z</MenuItem>
              <MenuItem value={"Z to A"}>Z to A</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* <div className="my-2">
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>

          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="gender"
            value={filterCategory.gender}
            onChange={handleChange}
          >
           
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </div> */}
      </form>
    </div>
  );
};
