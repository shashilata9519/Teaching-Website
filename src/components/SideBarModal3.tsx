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
  TextField,
} from "@mui/material";
import { Repo } from "@/services/Repo";
import axios from "axios";
import { ModalBase } from "@/common/Modal/ModalBase";
import { TabHeading } from "@/common/tabs/TabHeading";
import index from "@/pages/search";
import { ImCross } from "react-icons/im";
import { useAccountType } from "@/hooks/useAccountType";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

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
    setFilter,
    modalType,
    setModalType,
    activeTab,
    setActiveTab,
  }: any = useModal();
  const router = useRouter();
  const { AccountType } = useAccountType();
  const [genre, setGenre] = React.useState<any>([]);
  const [teacher, setTeachers] = React.useState<any>([]);
  const [course, setCourse] = React.useState<any>([]);
  const [allCourse, setAllCourse] = React.useState<any>([]);
  const [allteacher, setAllTeacher] = React.useState<any>([]);
  const [allGenre, setAllGenre] = React.useState<any>([]);
  const [isChecked, setIschecked] = React.useState<any>([]);
  const [teacherFeeData, setTeacherFeeData] = React.useState<any>([]);
  const [feesFeild, setFeeFeild] = React.useState(true);
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

  const getCategory = [
    {
      title: "Genre",
      property: "Genre",
      type: "input",
      subCategory: genre,
    },
    {
      title: "Courses",
      property: "Courses",
      type: "input",
      subCategory: course,
    },
    // {
    //   type: "selectionTab",
    //   property: "Teachers",
    //   subCategory: ["Xcool's Recommendation", "Myself"],
    // },

    {
      title: "Teacher:Let xcool recommend(or select)",
      // title: "Teachers",
      property: "Teachers",
      type: "input",
      subCategory: teacher,
    },
    {
      title: "Fee Range",
      property: "Fees",
      type: "input",
      subCategory: ["500-1000", "1000-2000", "2000-3000", "3000-above"],
    },
    {
      title: "Timeslot",
      property: "Timeslot",
      type: "input",
      subCategory: ["Morning", "Afternoon", "Evening", "Night"],
    },
  ];

  console.log(modalData, "modaldata");

  const handleOptionChange = (title: any, selectedValue: any) => {
    title =
      title === "Teacher:Let xcool recommend(or select)" ? "Teachers" : title;
    console.log({
      title,
      selectedValue,
    });
    setModalData((prevOptions: any) => ({
      ...prevOptions,
      [title]: selectedValue,
    }));
  };

  React.useEffect(() => {
    (async () => {
      const courseAccordingGenre = await Repo.getCourseByGenre({
        subcategory: modalData?.Genre,
      });
      setAllCourse(courseAccordingGenre);

      setCourse(courseAccordingGenre?.map((i: any) => i?.slug));
      const filterData = courseAccordingGenre.filter(
        (i: any) => i?.slug == modalData.Courses
      );
      if (filterData?.length === 0) {
        setModalData({
          ...modalData,
          Courses: "",
          // Teachers: "",
          Fees: "",
        });
      }
    })();
  }, [modalData?.Genre]);

  React.useEffect(() => {
    (async () => {
      const teacherAccordingGenreandCourse =
        await Repo.getTeacherByCourseAndGenre({
          subcategory: modalData?.Genre,
          course: modalData?.Courses,
        });

      setAllTeacher(teacherAccordingGenreandCourse);
      setTeachers(teacherAccordingGenreandCourse?.map((i: any) => i?.slug));
      const filterData = teacherAccordingGenreandCourse.filter(
        (i: any) => i?.slug == modalData.Teachers
      );
      // console.log(modalData.Teachers,'modaldatas')
      const res = await Repo?.getTeacher(modalData?.Teachers);
      setTeacherFeeData(res?.details?.rateph);
      if(teacherFeeData?.length!==0){

        setFeeFeild(!feesFeild);
      }

      if (filterData?.length === 0 && modalData?.Courses!=="" && modalData?.Genre!=="") {
        setModalData({
          ...modalData,

          Teachers: "",
          Fees: "",
        });
      }
    })();
  }, [modalData?.Genre, modalData?.Courses, modalData?.Teachers]);

  React.useEffect(() => {
    (async () => {
      const data = await Repo.getGenre();
      setAllGenre(data);
      const newListValues = data?.map((item: any) => item?.slug);
      setGenre(newListValues);
      // const teacherData=await Repo.getTeacherbyId()
      // console.log(teacherData,'teacherData')
    })();
  }, []);

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
        genre_id: allGenre.find((item: any) => item.slug === modalData?.Genre)
          ?.id,
        genre_name: modalData?.Genre,
        course_id: allCourse.find(
          (item: any) => item.slug === modalData?.Courses
        )?.id,
        course_name: modalData?.Courses,
        teacher_id: allteacher.find(
          (item: any) => item.slug === modalData?.Teachers
        )?.id,
        teacher_name: modalData?.Teachers,
        fee_pref: modalData.Fees,
        day_pref: isChecked.toString(),
        time_pref: modalData?.Timeslot,
      };
      // console.log(fdata, "fdata");
      await Repo.addLead(fdata);
      // toast.success("Request sent successfully", { autoClose: 2000 ,position: "bottom-right",});
      setModalOpen(!open);

      setRequestStatus({
        isOpen: true,
        type: "request",
      });
      setModalData({
        ...modalData,
        Courses: "",
        Fees: "",
        Teachers: "",
        Timeslot: "",
      });
    }
  };

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

  const closeHandler = () => {
    setModalOpen(false);
    setModalData({
      ...modalData,
      Courses: "",
      Fees: "",
      Teachers: "",
      TimeSlot: "",
    });
  };

  return (
    <div>
      <React.Fragment>
        {modalType === "sideBar" ? (
          <></>
        ) : (
          <ModalBase
            closeModal={closeHandler}
            modalState={{ isOpen: isModalOpen, type: null }}
            title={"Request for Courses"}
          >
            <div className=" md:p-10 p-2">
              {/* <p className=" font-semibold">Request for Courses</p> */}

              <form className="grid grid-cols-1 items-center gap-4 my-3">
                {getCategory?.map((category: any, index: any) => {
                  // category = {
                  //   ...category,
                  //   subCategory:modalData?.Fees !==""? [modalData?.Fees?.toString()]:category?.subCategory,
                  // };

                  // <form className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 my-3">
                  //   {getCategory()?.map((category: any, index: any) => {

                  return (
                    <InputField
                      // disabled={index == 3 && modalData?.Fees ? true : false}
                      key={index}
                      category={category}
                      // setSelection={setSelection}
                      // selection={selection}
                      handleOptionChange={(title: any, value: any) => {
                        console.log(value, "hhh");
                        // setFilter({
                        //   subcategory: value
                        // })
                        handleOptionChange(title, value);
                      }}
                      // selectedOptions={selectedOptions}
                      teacherFeeData={teacherFeeData}
                      feesFeild={feesFeild}
                      selectedOptions={{ ...modalData }}
                    />
                  );
                })}
                <div>
                  {teacherFeeData && (
                    <p>
                      <TextField
                        id="standard-basic"
                        disabled={true}
                        className="w-full"
                        value={teacherFeeData}
                        label="Fees"
                        variant="standard"
                      />
                    </p>
                  )}
                </div>
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
                  onClick={closeHandler}
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
      <ToastContainer />
    </div>
  );
}

const InputField = ({
  category,
  handleOptionChange,
  selectedOptions,
  feesFeild,
  disabled,
}: any) => {
  // console.log(category?.subCategory,'category?.subCategory')
  return category.type === "input" ? (
    <div className="mb-1">
      {/* <p>{modalData.course_name}</p> */}
     {
      feesFeild===true ?(
        <FormControl variant="standard" className="w-full">
          <InputLabel id="demo-simple-select-standard-label">
            {category?.title}
          </InputLabel>

          <Select
            disabled={disabled}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedOptions[category?.property]}
            onChange={(e: any) => {
              console.log(e.target.value, " e.target.value");

              handleOptionChange(category.property, e.target.value);
            }}
            label={category?.property}
            name="level"
            MenuProps={{
              style: { maxHeight: 200 },
            }}
          >
            {/* {category?.subCategory?.map( */}
            {category?.subCategory?.map(
              (subc: any, index: React.Key | null | undefined) => {
                return category?.property !== "Fees" ? (
                  <MenuItem key={index} className=" text-sm" value={subc}>
                    {subc?.split("-").join(" ")}
                  </MenuItem>
                ) : (
                  <MenuItem key={index} className=" text-sm" value={subc}>
                    {subc}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      ):(
        <>
        {category?.property !== "Fees" && (
        <FormControl variant="standard" className="w-full">
          <InputLabel id="demo-simple-select-standard-label">
            {category?.title}
          </InputLabel>

          <Select
            disabled={disabled}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedOptions[category?.property]}
            onChange={(e: any) => {
              console.log(e.target.value, " e.target.value");

              handleOptionChange(category.property, e.target.value);
            }}
            label={category?.property}
            name="level"
            MenuProps={{
              style: { maxHeight: 200 },
            }}
          >
            {/* {category?.subCategory?.map( */}
            {category?.subCategory?.map(
              (subc: any, index: React.Key | null | undefined) => {
                return category?.property !== "Fees" ? (
                  <MenuItem key={index} className=" text-sm" value={subc}>
                    {subc?.split("-").join(" ")}
                  </MenuItem>
                ) : (
                  <MenuItem key={index} className=" text-sm" value={subc}>
                    {subc}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
      )}
        </>

      )
     }
      
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
