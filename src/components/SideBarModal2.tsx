import * as React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useModal } from "@/context/ModalContext";
import { Tab } from "@headlessui/react";

import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Repo } from "@/services/Repo";
import axios from "axios";
import { ModalBase } from "@/common/Modal/ModalBase";
import { TabHeading } from "@/common/tabs/TabHeading";
import index from "@/pages/search";
import { ImCross } from "react-icons/im";
import { useAccountType } from "@/hooks/useAccountType";
import { useRouter } from "next/router";

export default function SwipeableTemporaryDrawer({
  setLoginState,
  setRequestStatus,
}: any) {
  const {
    isModalOpen,
    setModalOpen,
    setModalData,
    modalData,
    filter,
    modalType,
    setModalType,
    activeTab,
    setActiveTab,
  }: any = useModal();
  const router = useRouter();
  // console.log(filter, "filter", modalData, "modaldata");
  const [selectedOptions, setSelectedOptions] = React.useState<any>({
    Courses: "",
    Fees: "",
    Genre: "",
    Teachers: "",
    TimeSlot: "",
  });
  const [genre, setGenre] = React.useState<any>([]);
  const [teacher, setTeachers] = React.useState<any>([]);
  const [course, setCourse] = React.useState<any>([]);

  const [selection, setSelection] = React.useState(null);

  const { AccountType } = useAccountType();

  const toggleDrawer =
    (open: boolean, index: any = null) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setModalOpen(open);
      setModalType("");
      if (index) {
        setActiveTab(index);
      }
    };

  React.useEffect(() => {
    if (isModalOpen) {
      setSelectedOptions({
        Courses: modalData?.course_name,
        Fees: "",
        Genre: filter?.subcategory,
        Teachers: modalData?.Teachers,
        TimeSlot: "",
      });
    } else {
      setModalData({});
      setSelectedOptions({});
    }
  }, [isModalOpen, modalData]);

  const getCategory = () => {
    const temp = [
      {
        title: "Genre",
        property: "genre",
        type: "input",
        subCategory: genre,
      },
      {
        title: "Courses",
        property: "course",
        type: "input",
        subCategory: course,
      },
      // {
      //   type: "selectionTab",
      //   property: "Teachers",
      //   subCategory: ["Xcool's Recommendation", "Myself"],
      // },

      {
        // title: "Teacher:Let xcool recommend(or select)",
        title: "Teacher:Let xcool recommend(or select)",
        property: "Teachers",
        type: "input",
        subCategory: teacher,
      },
      {
        title: "Fees",
        property: "fees",
        type: "input",
        subCategory: [
          { label: "500-1000", value: "500-1000" },
          { label: "1000-2000", value: "1000-2000" },
          { label: "2000-3000", value: "2000-3000" },
          { label: "3000-above", value: "3000-above" },
        ],
      },
      {
        title: "Timeslot",
        property: "timeslot",
        type: "input",
        subCategory: [
          { label: "Morning", value: "Morning" },
          { label: "Afternoon", value: "Afternoon" },
          { label: "Evening", value: "Evening" },
          { label: "Night", value: "Night" },
        ],
      },
    ];

    return temp;
  };

  // console.log(selection,"selection");

  const handleOptionChange = (title: any, selectedValue: any, label: any) => {
    console.log(selectedOptions);
    console.log(selectedValue,"selectedValue")
    title =
      title === "Teacher:Let xcool recommend(or select)" ? "Teachers" : title;

    setSelectedOptions((prevOptions: any) => ({
      ...prevOptions,
      [title]: label,
    }));
  };

  React.useEffect(() => {
    (async () => {
      const data = await Repo.getGenre();
      const newListValues = data?.map((item: any) => ({
        label: item?.slug,
        value: item?.id,
      }));
      const data2 = await Repo.getAllTeachers();
      const newListValues2 = data2?.map((item: any) => item?.firstname);
      setGenre(newListValues);
      // setTeachers(newListValues2);
    })();
  }, []);

  React.useEffect(() => {
    (() => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCourses`, {
          subcategory: selectedOptions?.Genre,
        })
        .then((response: any) => {
          // console.log(
          //   response?.data?.data.map((i: any) => i.course_name),
          //   "hh"
          // );
          // {
          //   label: item?.firstName,
          //   value: item?.id,
          // }
          // setCourse(response?.data?.data.map((i: any) => i.slug));
          setCourse(response?.data?.data.map((item: any) => ({
            label: item?.slug,
            value: item?.id,
          })));
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [selectedOptions]);
  React.useEffect(() => {
    (() => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getDdTeachersWF`, {
          subcategory: selectedOptions?.Genre,
          course: selectedOptions?.Courses,
        })
        .then((response: any) => {
          // console.log(
          //   response?.data?.data.map((i: any) => i.course_name),
          //   "hh"
          // );
          setTeachers(
            response?.data?.data.map((item: any) => ({
              label: item?.firstName,
              value: item?.id,
            }))
          );
          // setCourse(response?.data?.data.map((i: any) => i.course_name));
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [selectedOptions]);

  const sendRequestHandler = async () => {
    // console.log(selectedOptions, isChecked, "options");
    const token = localStorage.getItem("token");
    if (!token || token == "") {
      setModalOpen(!open);

      setLoginState({
        isOpen: true,
        type: "login",
      });
    } else {
      const fdata = {
        genre_id: "",
        genre_name: selectedOptions?.Genre,
        course_id: "",
        course_name: selectedOptions?.Courses,
        teacher_id: "",
        teacher_name: selectedOptions?.Teachers,
        fee_pref: selectedOptions.Fees,
        day_pref: isChecked.toString(),
        time_pref: selectedOptions?.TimeSlot,
      };
      // console.log(fdata, "fdata");
      await Repo.addLead(fdata);
      setModalOpen(!open);
      setRequestStatus({
        isOpen: true,
        type: "request",
      });
    }
  };
  const [isChecked, setIschecked] = React.useState<any>([]);
  const setDays = [
    {
      id: 1,
      day: "S",
    },
    {
      id: 2,
      day: "M",
    },
    {
      id: 3,
      day: "T",
    },
    {
      id: 4,
      day: "W",
    },
    {
      id: 5,
      day: "T",
    },
    {
      id: 6,
      day: "F",
    },
    {
      id: 7,
      day: "S",
    },
  ];
  const selectHandler = (i: any) => {
    if (isChecked?.includes(i?.id)) {
      let copy = [...isChecked];
      copy = copy?.filter((item) => item !== i?.id);
      // .map((i: any) => i?.day);
      // console.log(copy, "copy");
      setIschecked(copy);
    } else {
      setIschecked([...isChecked, i?.id]);
    }
  };

  // console.log(selectedOptions,"[so]")

  return (
    <div>
      <React.Fragment>
        {modalType === "sideBar" ? (
          <></>
        ) : (
          <ModalBase
            closeModal={() => setModalOpen(false)}
            modalState={{ isOpen: isModalOpen, type: null }}
            title={"Request for Courses"}
          >
            <div className=" md:p-10 p-2">
              {/* <p className=" font-semibold">Request for Courses</p> */}

              <form className="grid grid-cols-1 items-center gap-4 my-3">
                {getCategory()?.map((category: any, index: any) => {
                  return (
                    <InputField
                      disabled={
                        index == 3 && selectedOptions?.Teachers ? true : false
                      }
                      key={index}
                      category={category}
                      // setSelection={setSelection}
                      // selection={selection}
                      handleOptionChange={(title: any, value: any) => {
                        // console.log(title,'[title')
                        // handleOptionChange(title, value);
                      }}
                      selectedOptions={selectedOptions}
                    />
                  );
                })}
                <div>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    variant="standard"
                    className="my-2"
                  >
                    Class Occurs Every
                  </InputLabel>
                  <div className="flex gap-2">
                    {setDays?.map((i: any) => {
                      return (
                        <p
                          key={i?.id}
                          className={`${
                            isChecked.indexOf(i?.id) > -1
                              ? "bg-black text-white"
                              : " "
                          } rounded-full px-2 text-sm border cursor-pointer`}
                          onClick={() => selectHandler(i)}
                        >
                          {i.day}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </form>
              <div className=" flex flex-wrap justify-between mt-7">
                <button
                  className=" text-white bg-red-500  px-3 py-1 rounded-md "
                  onClick={toggleDrawer(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={sendRequestHandler}
                  className={`bg-xcool-new-blue text-white px-3 py-1 rounded-md ${
                    AccountType === "teacher" ? "hidden" : "block"
                  }`}
                >
                  Book Now
                </button>
              </div>
              {AccountType === "teacher" && (
                <p className=" font-semibold my-3">
                  Note - Only Student can Apply
                </p>
              )}
            </div>
          </ModalBase>
        )}
      </React.Fragment>
    </div>
  );
}

const InputField = ({
  category,
  handleOptionChange,
  selectedOptions,
  selection,
  setSelection,
  disabled,
}: any) => {
  // console.log(selection, "selection");

  return category.type === "input" ? (
    <div className="mb-1">
      {/* <p>{modalData.course_name}</p> */}
      <FormControl variant="standard" className="w-full">
        <InputLabel id="demo-simple-select-standard-label">
          {category?.title}
        </InputLabel>
        <Select
          disabled={disabled}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          className=""
          value={selectedOptions[category?.title]}
          onChange={(e: any) =>
            handleOptionChange(category.title, e.target.value, e.target.label)
          }
          label={category?.title}
          name="level"
          MenuProps={{
            style: { maxHeight: 200 },
          }}
        >
          {category?.subCategory?.map(
            (subc: any, index: React.Key | null | undefined) => {
              return (
                <MenuItem key={index} className=" text-sm" value={subc?.value}>
                  {subc?.label?.split("-").join(" ")}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
    </div>
  ) : null;
  // <div className="flex mt-7 mb-0 gap-4">
  //   {category?.subCategory.map((item: any, index: any) => {
  //     return (
  //       <p
  //         key={index}
  //         onClick={() => setSelection(index)}
  //         className={`${
  //           selection === index ? " bg-xcool-new-blue text-white" : ""
  //         } cursor-pointer border border-black p-2 text-xs rounded-xl`}
  //       >
  //         {item}
  //       </p>
  //     );
  //   })}
  // </div>
};
