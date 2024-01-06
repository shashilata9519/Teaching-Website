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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SideBarBookNow({
  setLoginState,
  setRequestStatus,
  setOpenModal,
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
  const [selectedClass, setSelectedClass] = React.useState<any>(2);
  // const [email, setEmail] = React.useState<any>("");
  // const [phone_no, setPhoneNo] = React.useState<any>("");
  const [teacherFeeData, setTeacherFeeData] = React.useState<any>(null);
  const [feesFeild, setFeeFeild] = React.useState(false);
  // console.log(teacherFeeData, feesFeild, "teacherFeeData");
  const [Location, SetLocation] = React.useState<any>([]);
  const [finalAmt, setFinalAmt] = React.useState<any>("");
  const [token, setToken] = React.useState<any>(null);
  const [genreError, setGenreError] = React.useState(false);

  React.useEffect(() => {
    const dd = localStorage.getItem("token");
    setToken(dd);
  }, []);

  const schema = yup.object().shape({
    email:
      token === null
        ? yup
            .string()
            .email("Invalid email")
            .required("Please enter your email address")
        : yup.string(),
    phone_no:
      token === null
        ? yup
            .string()
            .matches(/^[0-9]+$/, "Please enter your phone number")
            .required("Please enter your phone number")
        : yup.string(),
    // Genre:yup.object().required('Genre is required')
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log("category", register);
  const setDays = [
    {
      id: 1,
      day: "Sun",
    },
    {
      id: 2,
      day: "Mon",
    },
    {
      id: 3,
      day: "Tue",
    },
    {
      id: 4,
      day: "Wed",
    },
    {
      id: 5,
      day: "Thu",
    },
    {
      id: 6,
      day: "Fri",
    },
    {
      id: 7,
      day: "Sat",
    },
  ];
  const NoOfClasses = [
    {
      id: 4,
      class: 4,
      discount: "0%",
      month: 1,
    },
    {
      id: 8,
      class: 8,
      discount: "5%",
      month: 2,
    },
    {
      id: 16,
      class: 16,
      discount: "10%",
      month: 4,
    },
    {
      id: 24,
      class: 24,
      discount: "20%",
      month: 6,
    },
  ];

  React.useEffect(() => {
    // const location: any = localStorage.getItem("location");
    // SetLocation(JSON.parse(location))
    const getFees = () => {
      if (Location?.countryCode === "IN") {
        setTeacherFeeData(600);
      } else {
        setTeacherFeeData(20);
      }
    };
    getFees();
  }, [Location]);

  const getCategory = [
    {
      title: "Genre",
      property: "Genre",
      type: "input",
      subCategory: genre,
    },

    {
      title: "Preferred Timeslot",
      property: "Timeslot",
      type: "input",
      subCategory: ["Morning", "Afternoon", "Evening", "Night"],
    },
  ];

  // console.log(modalData, "modaldata");

  const handleOptionChange = (title: any, selectedValue: any) => {
    title =
      title === "Teacher:Let xcool recommend(or select)" ? "Teachers" : title;

    setModalData((prevOptions: any) => ({
      ...prevOptions,
      [title]: selectedValue,
    }));
  };

  // React.useEffect(() => {
  //   (async () => {
  //     const courseAccordingGenre = await Repo.getCourseByGenre({
  //       subcategory: modalData?.Genre,
  //     });
  //     setAllCourse(courseAccordingGenre);

  //     setCourse(courseAccordingGenre?.map((i: any) => i?.slug));
  //     const filterData = courseAccordingGenre.filter(
  //       (i: any) => i?.slug == modalData.Courses
  //     );
  //     if (filterData?.length === 0) {
  //       setModalData({
  //         ...modalData,
  //         Courses: "",
  //         // Teachers: "",
  //         Fees: "",
  //       });
  //     }
  //   })();
  // }, [modalData?.Genre]);

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

  React.useEffect(() => {
    const location: any = localStorage.getItem("location");
    SetLocation(JSON.parse(location));
  }, []);
  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // console.log(modalData, "modaldata");
  function calculateFinalFees(initialFee: any, selectedClass: any) {
    // Ensure the discount percentage is a valid number between 0 and 100
    let discountPercentage: any;
    const selectedClassInfo: any = NoOfClasses.find(
      (classInfo: any) => classInfo?.id === selectedClass
    );

    if (selectedClass === 4) {
      return initialFee * 4;
    } else {
      if (selectedClass === 8) {
        discountPercentage = 5;
      } else if (selectedClass === 16) {
        discountPercentage = 10;
      } else if (selectedClass === 24) {
        discountPercentage = 20;
      } else {
        discountPercentage = 0;
      }
    }

    // Calculate the discount amount
    const discountAmount = (initialFee * discountPercentage) / 100;
    // console.log(discountAmount, "discountAmount");
    // Calculate the final fee after applying the discount
    const finalFee = (initialFee - discountAmount) * selectedClassInfo?.class;
    const roundAmt = finalFee.toFixed(1);
    // setFinalAmt(finalFee);
    const amt = parseFloat(roundAmt);
    return amt;
  }

  const sendRequestHandler = async () => {
    // console.log(selectedOptions, isChecked, "options");
    // alert("send");
    if (!token || token == "") {
      setModalOpen(!open);

      setLoginState({
        isOpen: true,
        type: "login",
      });
    } else {
      const email = localStorage.getItem("email");
      const phone_no = localStorage.getItem("phone_no");

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
        email: email,
        phone: phone_no,
        currency: Location?.countryCode === "IN" ? "INR" : "USD",
        source_url: router?.asPath,
        // discount: Number(finalFee - updatedAmt?.discounted_value) || null,
      };
      await Repo.addLead(fdata);

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
  // const token = localStorage.getItem("token");
  const purchaseRequestHandler = async (data: any) => {
    console.log(data, "data");
    // const finalFee = calculateFinalFees(teacherFeeData, selectedClass); // Calculate the final fee
    const finalFee = Location?.countryCode === "IN" ? 98 : 4; // Calculate the final fee
    // router.push("/booking-confirmation");
    if (modalData?.Genre === "") {
      setGenreError(true);
    } else {
      if (!token || token == "") {
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
          email: data?.email,
          phone: data?.phone_no,
          no_of_classes: selectedClass,
          fee_pc: teacherFeeData,
          fee_total: finalFee,
          currency: Location?.countryCode === "IN" ? "INR" : "USD",
          discount: Number(teacherFeeData*2 - finalFee) || null,
          source_url: router?.asPath,
        };
        const lead = await Repo.addLead(fdata);
        console.log(lead, "lead");

        if (lead?.success) {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
          if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
          }
          const result = await Repo.createAnonOrder({
            amount: finalFee,
            currency: Location?.countryCode === "IN" ? "INR" : "USD",
            user_email: data?.email,
            user_phone: data?.phone_no,
          });
          console.log(result, "result");

          const options = {
            // key: "rzp_test_bELNQVu6cqbl9r", // Development
            // key: "rzp_live_T3DOeCymNflq6a", // Prod
            key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
            amount: finalFee,
            currency: Location?.countryCode === "IN" ? "INR" : "USD",
            name: "xcool",
            description: "Payment by student",
            image: "",
            order_id: result?.payment_order_id,

            handler: async function (response: any) {
              const data: any = {
                order_id: result?.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                // user_id: item?.registered_stud,
                lead_id: lead?.data?.id,
              };
              console.log(data, "data");
              const res = await Repo.savePayment(data);
              // setRefresh(true);
              // console.log(res, "payment");
              if (res?.success) {
                toast.success("Transation Successfull !", { autoClose: 2000 });
                setTimeout(() => {
                  router.push(`/booking-confirmation?id=${lead?.data?.id}`);
                }, 1000);
              } else {
                toast.error("failed try again !", {
                  autoClose: 2000,
                  position: "bottom-right",
                });
              }
            },
            prefill: {
              // name: e?.fullName,
              email: data?.email,
              contact: data?.phone_no,
            },
            notes: {
              order_id: result?.order_id,
              lead_id: lead?.data?.id,
              // user_id: userData?.user_id,
            },
            theme: {
              color: "#528FF0",
            },
          };
          console.log(options);
          const paymentObject: any = new window.Razorpay(options);

          paymentObject.open();
        } else {
          toast.error("Something went wrong try again !", {
            autoClose: 2000,
            position: "bottom-right",
          });
        }
      } else {
        const email = localStorage.getItem("email");
        const phone_no = localStorage.getItem("phone_no");

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
          email: email,
          phone: phone_no,
          no_of_classes: selectedClass,
          fee_pc: teacherFeeData,
          fee_total: finalFee,
          currency: Location?.countryCode === "IN" ? "INR" : "USD",
        };
        const lead = await Repo.addLead(fdata);
        console.log(lead, "lead");

        if (lead?.success) {
          const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
          );
          if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
          }
          const result = await Repo.createAnonOrder({
            amount: finalFee,
            currency: Location?.countryCode === "IN" ? "INR" : "USD",
            user_email: email,
            user_phone: phone_no,
          });
          console.log(result, "result");

          const options = {
            // key: "rzp_test_bELNQVu6cqbl9r", // Development
            key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
            amount: finalFee,
            currency: Location?.countryCode === "IN" ? "INR" : "USD",
            name: "xcool",
            description: "Payment by student",
            image: "",
            order_id: result?.payment_order_id,

            handler: async function (response: any) {
              const data: any = {
                order_id: result?.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                // user_id: item?.registered_stud,
                lead_id: lead?.data?.id,
              };
              console.log(data, "data");
              const res = await Repo.savePayment(data);
              // setRefresh(true);
              // console.log(res, "payment");
              if (res?.success) {
                toast.success("Transation Successfull !", { autoClose: 2000 });
                setTimeout(() => {
                  router.push("/booking-confirmation");
                }, 1000);
              } else {
                toast.error("failed try again !", {
                  autoClose: 2000,
                  position: "bottom-right",
                });
              }
            },
            prefill: {
              // name: e?.fullName,
              email: email,
              contact: phone_no,
            },
            notes: {
              order_id: result?.order_id,
              lead_id: lead?.data?.id,
              // user_id: userData?.user_id,
            },
            theme: {
              color: "#528FF0",
            },
          };
          console.log(options);
          const paymentObject: any = new window.Razorpay(options);

          paymentObject.open();
        } else {
          toast.error("Something went wrong try again !", {
            autoClose: 2000,
            position: "bottom-right",
          });
        }
      }

      setModalOpen(!open);

      // setRequestStatus({
      //   isOpen: true,
      //   type: "request",
      // });
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
  const selectClassHandler = (i: any) => {
    setSelectedClass(i.id);
  };

  const closeHandler = () => {
    setOpenModal(false);
    setModalData({
      ...modalData,
      Courses: "",
      Fees: "",
      Teachers: "",
      TimeSlot: "",
    });
  };
  // console.log(token, "token");

  return (
    <div>
      <React.Fragment>
        <ModalBase
          closeModal={closeHandler}
          modalState={{ isOpen: true, type: null }}
          title={"Book a course"}
        >
          <div className=" md:p-10 p-2">
            {/* <p className=" font-semibold">Request for Courses</p> */}

            <form
              className="grid grid-cols-1 items-center gap-2"
              onSubmit={handleSubmit(
                feesFeild ? sendRequestHandler : purchaseRequestHandler
              )}
            >
              {getCategory?.map((category: any, index: any) => {
                return (
                  <InputField
                    // disabled={index == 3 && modalData?.Fees ? true : false}
                    key={index}
                    category={category}
                    // setSelection={setSelection}
                    // selection={selection}
                    register={category?.title}
                    handleOptionChange={(title: any, value: any) => {
                      // console.log(value, "hhh");
                      // setFilter({
                      //   subcategory: value
                      // })
                      handleOptionChange(title, value);
                    }}
                    // selectedOptions={selectedOptions}
                    teacherFeeData={teacherFeeData}
                    feesFeild={feesFeild}
                    selectedOptions={{ ...modalData }}
                    genreError={genreError}
                  />
                );
              })}
              <div>
                {!feesFeild && (
                  <>
                    {/* <p>
                      <TextField
                        id="standard-basic"
                        disabled={true}
                        className="w-full"
                        value={teacherFeeData}
                        label="Fees per class"
                        variant="standard"
                      />
                    </p> */}
                    <div className="w-full pb-2">
                      <p className="  text-xcool-new-gray  ">
                        Fees
                      </p>
                      <p className="w-full bg-xcool-new-blue-bg text-xcool-new-blue font-semibold p-1 rounded-md">
                        {Location?.countryCode === "IN" ? " Rs " : " $ "}{" "}
                        {teacherFeeData}
                      </p>
                    </div>
                    {/* <div className="my-2">
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        variant="standard"
                        className=" text-xcool-new-gray font-semibold"
                      >
                        No of classes
                      </InputLabel>
                      <div className="flex gap-2 flex-wrap justify-around">
                        {NoOfClasses.map((i: any) => {
                          return (
                            <p
                              key={i.id}
                              className={`${
                                selectedClass === i.id
                                  ? "bg-black text-white"
                                  : " "
                              } border cursor-pointer text-center rounded-md `}
                              onClick={() => selectClassHandler(i)}
                            >
                              <p className="p-1">{`${i?.month} months`}</p>
                              <p className="p-1">{`${i?.class} classes`}</p>
                              <hr />
                              <p
                                className={`${
                                  selectedClass === i.id
                                    ? "bg-black text-white"
                                    : " bg-xcool-green"
                                }  text-white rounded-md`}
                              >
                                {i?.discount} off
                              </p>
                            </p>
                          );
                        })}
                      </div>
                    </div> */}
                    <div className="my-2">
                      <InputLabel
                        id="demo-simple-select-standard-label"
                        variant="standard"
                        className=" text-xcool-new-gray mb-2"
                      >
                        Introductory Classes
                      </InputLabel>
                      <div className="flex gap-2 flex-wrap justify-around text-center ">
                        <div className="border  flex justify-between gap-1 text-sm text-center rounded-md" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                          <p className="p-1">1 month </p>
                          <span
                            className=" h-5  bg-xcool-new-gray  mt-1"
                            style={{ width: "1px" }}
                          ></span>
                          <p className="p-1">2 classes</p>
                          <span
                            className=" h-5  bg-xcool-new-gray  mt-1"
                            style={{ width: "1px" }}
                          ></span>

                          <p className="p-1">
                            <span className="line-through">{Location?.countryCode === "IN"?'Rs 1200':'$ 40' }</span>{" "}
                            <span className=" font-semibold">{Location?.countryCode === "IN"?'Rs 98/-':'$ 4/-' }</span>
                          </p>
                        </div>
                        <div className="border px-1 py-1 rounded-md bg-[#D17468] text-white my-auto" style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",}}>
                          90% off
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div>
                <InputLabel
                  id="demo-simple-select-standard-label"
                  variant="standard"
                  className="my-2  text-xcool-new-gray "
                >
                  Day Preference
                </InputLabel>
                <div className="flex flex-wrap gap-2">
                  {setDays?.map((i: any) => {
                    return (
                      <p
                        key={i?.id}
                        className={`${
                          isChecked.indexOf(i?.id) > -1
                            ? " bg-xcool-new-blue text-white"
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
              {!feesFeild && (
                <div className="mt-2">
                  {/* <div className=" border border-xcool-new-gray font-semibold border-dashed text-center py-2 text-sm bg-xcool-new-blue-bg">
                    <span>
                      Total Fees: {`${selectedClass} x ${teacherFeeData} = `}{" "}
                      {Location?.countryCode === "IN" ? " Rs " : " $ "}
                    </span>
                    {selectedClass !== 4 && (
                      <span className="line-through">
                        {`${selectedClass * teacherFeeData}`}{" "}
                      </span>
                    )}
                    {calculateFinalFees(teacherFeeData, selectedClass)} /-
                  </div> */}
                  {token === null && (
                    <>
                      <div className="">
                        <TextField
                          type="text"
                          id="standard-basic"
                          label="Email"
                          variant="standard"
                          {...register("email")}
                          className={`w-full my-1 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Email"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <TextField
                          type="text"
                          id="standard-basic"
                          label="Contact Number"
                          variant="standard"
                          {...register("phone_no")}
                          className={`w-full my-1 ${
                            errors.phone_no ? "border-red-500" : ""
                          }`}
                          placeholder="Contact Number"
                        />
                        {errors.phone_no && (
                          <p className="text-red-500">
                            {errors.phone_no.message}
                          </p>
                        )}
                      </div>

                      {/* <p>
                          <TextField
                            id="standard-basic"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                            value={email}
                            label="Email"
                            variant="standard"
                          />
                        </p>
                        <p>
                          <TextField
                            id="standard-basic"
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="w-full"
                            value={phone_no}
                            label="Contact Number"
                            variant="standard"
                          />
                        </p> */}
                    </>
                  )}
                </div>
              )}
              <div className=" flex flex-wrap justify-between mt-7">
                <button
                  className=" text-white bg-xcool-new-gray  px-3 py-1 rounded-md "
                  onClick={closeHandler}
                >
                  Cancel
                </button>

                <button
                  // onClick={
                  //   feesFeild ? sendRequestHandler : purchaseRequestHandler
                  // }

                  className={`bg-xcool-new-blue text-white px-3 py-1 rounded-md ${
                    AccountType === "teacher" ? "hidden" : "block"
                  }`}
                >
                  {feesFeild ? "Request Class Now" : "Book Now"}
                </button>
              </div>
            </form>

            {AccountType === "teacher" && (
              <p className=" font-semibold my-3">
                Note - Only Student can Apply
              </p>
            )}
          </div>
        </ModalBase>
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
  register,
  disabled,
  genreError,
}: any) => {
  // console.log(genreError,'category?.subCategory')
  return category.type === "input" ? (
    <div>
      {/* <p>{modalData.course_name}</p> */}
      {feesFeild === true ? (
        <>
          <FormControl variant="standard" className="w-full my-2">
            {/* <InputLabel id="demo-simple-select-standard-label" className=" text-black font-semibold">
              {category?.title}
            </InputLabel> */}
            <label className=" text-sm text-xcool-new-gray ">
              {" "}
              {category?.title}
            </label>
            <Select
              disabled={disabled}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedOptions[category?.property]}
              onChange={(e: any) => {
                // console.log(e.target.value, " e.target.value");

                handleOptionChange(category.property, e.target.value);
              }}
              {...register(category?.title)}
              label={category?.property}
              style={{ marginTop: "0px" }}
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
        </>
      ) : (
        <>
          {category?.property !== "Fees" && (
            <>
              <FormControl variant="standard" className="w-full my-2">
                {/* <InputLabel
                  id="demo-simple-select-standard-label"
                  className=" text-black font-semibold"
                >
                  {category?.title}
                </InputLabel> */}
                <label className=" text-sm text-xcool-new-gray ">
                  {" "}
                  {category?.title}
                </label>

                <Select
                  disabled={disabled}
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedOptions[category?.property]}
                  onChange={(e: any) => {
                    // console.log(e.target.value, " e.target.value");

                    handleOptionChange(category.property, e.target.value);
                  }}
                  style={{ marginTop: "0px" }}
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
                {genreError && category?.title === "Genre" && (
                  <p className="text-red-500">Genre is required</p>
                )}
              </FormControl>
            </>
          )}
        </>
      )}
    </div>
  ) : null;
};
