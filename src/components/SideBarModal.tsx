import * as React from "react";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useModal } from "@/context/ModalContext";
import { Tab } from "@headlessui/react";

import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
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
import { calculateTeacherFee } from "@/utils/Helpers";
// import { setTimeout } from "timers/promises";

// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   phone_no: yup
//     .string()
//     .matches(/^[0-9]+$/, "Phone number must be numeric")
//     .required("Phone number is required"),
// });

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
  const [selectedClass, setSelectedClass] = React.useState<any>(4);
  // const [email, setEmail] = React.useState<any>("");
  // const [phone_no, setPhoneNo] = React.useState<any>("");
  const [teacherFeeData, setTeacherFeeData] = React.useState<any>(1000);
  const [feesFeild, setFeeFeild] = React.useState(true);
  const [showCoupon, setShowCoupon] = React.useState(false);

  const [Location, SetLocation] = React.useState<any>(JSON.parse(localStorage.getItem("location")??""));
  const [updatedAmt, setUpdatedAmt] = React.useState<any>("");
  const [couponCode, setCouponCode] = React.useState<any>("");
  const [couponError, setCouponError] = React.useState("");
  const token = localStorage.getItem("token");
  // console.log(couponCode, updatedAmt, "couponCode");
  const schema = yup.object().shape({
    email:
      token === null
        ? yup.string().email("Invalid email").required("Email is required")
        : yup.string(),
    phone_no:
      token === null
        ? yup
            .string()
            .matches(/^[0-9]+$/, "Phone number must be numeric")
            .required("Phone number is required")
        : yup.string(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log("errors", errors);
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
      discount: "15%",
      month: 6,
    },
  ];

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

    {
      title: "Teacher: Let xcool recommend (or select)",
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
      title === "Teacher: Let xcool recommend (or select)" ? "Teachers" : title;
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
    // setTeacherFeeData(0);
    (async () => {
      const teacherAccordingGenreandCourse =
        await Repo.getTeacherByCourseAndGenre({
          subcategory: modalData?.Genre,
          course: modalData?.Courses,
        });

      setAllTeacher(teacherAccordingGenreandCourse);
      setTeachers(teacherAccordingGenreandCourse?.map((i: any) => i?.slug));

      // if (modalData?.Teachers !== "") {
      //   const res = await Repo?.getTeacher(modalData?.Teachers);
      //   setTeacherFeeData(res?.details?.rateph);
      // } else {
      //   setTeacherFeeData(0);
      // }
    })();
  }, [modalData?.Genre, modalData?.Courses, modalData?.Teachers]);

  React.useEffect(() => {
    const filterData = allteacher.filter(
      (i: any) => i?.slug == modalData.Teachers
    );
    // console.log(modalData.Teachers,'modaldatas')

    if (
      filterData?.length === 0
      // && modalData?.Genre !== ""
    ) {
      setModalData({
        ...modalData,

        Fees: "",
      });
      setTeacherFeeData(0);
    }
  }, [allteacher]);

  React.useEffect(() => {
    (async () => {
      console.log(modalData?.Teachers, "modalData?.Teachers");
      if (modalData?.Teachers !== "") {
        const res = await Repo?.getTeacher(modalData?.Teachers);
        // if (Location?.countryCode === "IN") {
        //   // const newRate = ((res?.details?.rateph || 500) * 1.1).toFixed(1);
        //   // setTeacherFeeData(parseFloat(newRate));
        //   const rateph = res?.details?.rateph || 500;
        //   const newRate = (rateph * 1.1).toFixed(1);

        //   // Calculate the rounded value divisible by 25
        //   const roundedValue = Math.ceil(parseFloat(newRate) / 25) * 25;

        //   // Calculate the difference
        //   const difference = roundedValue - parseFloat(newRate);

        //   // Add the difference to the original rate
        //   const teacherFee = parseFloat(newRate) + difference;

        //   setTeacherFeeData(teacherFee);
        // } else {
        //   let usdRate = res?.details?.usd_rateph || 20;
        //   usdRate = (usdRate / 83) * 1.25;
        //   if (usdRate <= 20) {
        //     usdRate = 20;
        //   }
        //   const newRate = usdRate.toFixed(1);
        //   const num = parseFloat(newRate);
        //   setTeacherFeeData(Math.ceil(num));
        //   // setTeacherFeeData(res?.details?.usd_rateph || 20);
        // }

        if (Location?.countryCode === "IN") {
          let newRate = calculateTeacherFee(
            res?.details?.rateph,
            Location?.countryCode
          );
          setTeacherFeeData(newRate);
        } else {
          let newRate = calculateTeacherFee(
            res?.details?.usd_rateph,
            Location?.countryCode
          );
          setTeacherFeeData(newRate);
        }
      } else {
        setTeacherFeeData(0);
      }
    })();
  }, [modalData?.Teachers, Location]);

  React.useEffect(() => {
    console.log(teacherFeeData, "teacherFeeData");
    if (teacherFeeData !== 0) {
      setFeeFeild(false);
    } else {
      setFeeFeild(true);
    }
  }, [teacherFeeData]);

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
        discountPercentage = 15;
      } else {
        discountPercentage = 0;
      }
    }

    // Calculate the discount amount
    const discountAmount = (initialFee * discountPercentage) / 100;
    console.log(discountAmount, "discountAmount");
    // Calculate the final fee after applying the discount
    const finalFee = (initialFee - discountAmount) * selectedClassInfo?.class;
    const roundAmt = finalFee.toFixed(1);
    // setFinalAmt(finalFee);
    const amt = parseFloat(roundAmt);
    return amt;
  }

  const applyCoupon = async () => {
    if (couponCode === "") {
      setCouponError("Coupon is required");
    } else {
      setCouponError("");
      try {
        const finalFee = calculateFinalFees(teacherFeeData, selectedClass); // Calculate the final fee

        const data = await Repo.discount({ code: couponCode, value: finalFee });
        // console.log(data?.discounted_value);
        if (data?.success) {
          setUpdatedAmt(data?.data);
        } else {
          setCouponError(data?.response?.data?.message);
          console.log(data?.response?.data?.message, "discount");
        }
      } catch (error) {
        console.error("An error occurred while applying the coupon:", error);
        // You can add additional error handling code here if needed.
      }
    }
  };

  const sendRequestHandler = async (data: any) => {
    // console.log(selectedOptions, isChecked, "options");
    // alert("send");
    if (!token || token == "") {
      // setModalOpen(!open);

      // setLoginState({
      //   isOpen: true,
      //   type: "login",
      // });
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
        currency: Location?.countryCode === "IN" ? "INR" : "USD",
        source_url: router?.asPath,
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
    // alert("purchse");
    // console.log(updatedAmt, "updatedAmt");
    var finalFee = 0;
    if (updatedAmt?.coupon?.is_active) {
      finalFee = updatedAmt?.discounted_value; // Calculate the final fee
    } else {
      finalFee = calculateFinalFees(teacherFeeData, selectedClass); // Calculate the final fee
    }

    // console.log("finalFee", finalFee);

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
        currency:
          updatedAmt?.coupon?.currency || Location?.countryCode === "IN"
            ? "INR"
            : "USD",
        coupon_id: updatedAmt?.coupon?.id || null,
        discount: Number(finalFee - updatedAmt?.discounted_value) || null,
        source_url: router?.asPath,
      };

      const lead = await Repo.addLead(fdata);
      console.log(lead, "lead");

      if (updatedAmt?.coupon?.code == "AVNISH") {
        toast.success("Transation Successfull! Login to view details", {
          autoClose: 2000,
        });
        setModalOpen(!open);
        setModalData({
          ...modalData,
          Courses: "",
          Fees: "",
          Teachers: "",

          Timeslot: "",
        });
        return;
      }

      if (lead?.success) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        const result = await Repo.createAnonOrder({
          amount: updatedAmt?.discounted_value || finalFee,
          currency:
            updatedAmt?.coupon?.currency || Location?.countryCode === "IN"
              ? "INR"
              : "USD",
          user_email: data?.email,
          user_phone: data?.phone_no,
          lead_id: lead?.data?.lead?.id,
          invitation_id: lead?.data?.inv?.id,
        });
        console.log(result, "result");

        const options = {
          // key: "rzp_test_bELNQVu6cqbl9r", // Development
          key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
          amount: updatedAmt?.discounted_value || finalFee,
          currency:
            updatedAmt?.coupon?.currency || Location?.countryCode === "IN"
              ? "INR"
              : "USD",
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
              lead_id: lead?.data?.lead?.id,
            };
            console.log(data, "data");
            const res = await Repo.savePayment(data);
            // setRefresh(true);
            // console.log(res, "payment");
            if (res?.success) {
              toast.success("Transation Successfull !", { autoClose: 2000 });
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
            lead_id: lead?.data?.lead?.id,
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
        coupon_id: updatedAmt?.coupon?.id || null,
        source_url: router?.asPath,
      };
      const lead = await Repo.addLead(fdata);
      console.log(lead, "lead");

      if (updatedAmt?.coupon?.code == "AVNISH") {
        toast.success("Transation Successfull! Login to view details", {
          autoClose: 2000,
        });
        setModalOpen(!open);
        setModalData({
          ...modalData,
          Courses: "",
          Fees: "",
          Teachers: "",

          Timeslot: "",
        });
        return;
      }

      if (lead?.success) {
        const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
        }
        const result = await Repo.createAnonOrder({
          amount: updatedAmt?.discounted_value || finalFee,
          currency:
            updatedAmt?.coupon?.currency || Location?.countryCode === "IN"
              ? "INR"
              : "USD",
          user_email: email,
          user_phone: phone_no,
          lead_id: lead?.data?.lead?.id,
          invitation_id: lead?.data?.inv?.id,
        });
        console.log(result, "result");

        const options = {
          // key: "rzp_test_bELNQVu6cqbl9r", // Development
          key: `${process.env.NEXT_PUBLIC_RZP_KEY}`, // Prod
          amount: updatedAmt?.discounted_value || finalFee,
          currency:
            updatedAmt?.coupon?.currency || Location?.countryCode === "IN"
              ? "INR"
              : "USD",
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
              lead_id: lead?.data?.lead?.id,
            };
            console.log(data, "data");
            const res = await Repo.savePayment(data);
            // setRefresh(true);
            // console.log(res, "payment");
            if (res?.success) {
              toast.success(
                "Transation Successfull ! Our team will contact you shortly",
                { autoClose: 2000 }
              );
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
            lead_id: lead?.data?.lead?.id,
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
    // }
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
    setModalOpen(false);
    setModalData({
      ...modalData,
      Courses: "",
      Fees: "",
      Teachers: "",
      TimeSlot: "",
    });
  };
  console.log(modalData, "[modalData]");

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
            <div className=" md:p-10 p-1">
              {/* <p className=" font-semibold">Request for Courses</p> */}

              <form
                onSubmit={handleSubmit(
                  feesFeild ? sendRequestHandler : purchaseRequestHandler
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                  {getCategory?.map((category: any, index: any) => {
                    return (
                      <InputField
                        // disabled={index == 3 && modalData?.Fees ? true : false}
                        key={index}
                        category={category}
                        // setSelection={setSelection}
                        // selection={selection}
                        handleOptionChange={(title: any, value: any) => {
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
                </div>

                <div>
                  {!feesFeild && (
                    <>
                      <div className="w-full pb-2 mt-2">
                        <p className=" text-xcool-new-brown text-sm font-semibold">
                          Fees
                        </p>
                        <p className="w-full bg-xcool-new-blue-bg text-xcool-new-blue font-semibold p-1 rounded-md">
                          {Location?.countryCode === "IN" ? " Rs " : " $ "}{" "}
                          {teacherFeeData}
                        </p>
                      </div>

                      <div className=" my-3">
                        <InputLabel
                          id="demo-simple-select-standard-label"
                          variant="standard"
                          className=" text-xcool-new-brown text-sm font-semibold"
                        >
                          No of classes
                        </InputLabel>
                        <div className=" grid md:grid-cols-4 grid-cols-2 gap-1 text-sm mt-3">
                          {NoOfClasses.map((i: any) => {
                            return (
                              <div
                                key={i.id}
                                className={`${
                                  selectedClass === i.id
                                    ? " bg-xcool-new-blue text-white"
                                    : " bg-xcool-new-blue-button"
                                } border cursor-pointer text-center md:text-sm text-xs w-32 md:w-36 py-2`}
                                onClick={() => selectClassHandler(i)}
                              >
                                <p>
                                  {`${i?.class} classes`}{" "}
                                  <span className=" font-semibold">
                                    {i?.discount} off
                                  </span>{" "}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="my-2">
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    variant="standard"
                    className="my-2  text-xcool-new-brown text-sm font-semibold"
                  >
                    Day Preference
                  </InputLabel>
                  <div className="flex flex-wrap gap-2">
                    {setDays?.map((i: any) => {
                      return (
                        // <p key={i?.id} className="flex gap-2">
                        //   <p
                        //     className={`rounded-full text-sm border border-xcool-new-blue w-5 h-5 cursor-pointer`}
                        //     onClick={() => selectHandler(i)}
                        //   >
                        //     <span
                        //       className={`${
                        //         isChecked.indexOf(i?.id) > -1
                        //           ? " bg-xcool-new-blue text-white"
                        //           : " "
                        //       } p-1 w-5 h-5  rounded-full
                        // ` }
                        //     ></span>
                        //   </p>{" "}
                        //   <span>{i.day}</span>
                        // </p>
                        <p
                          key={i?.id}
                          className="flex md:gap-2 gap-1 items-center md:mx-2"
                        >
                          <div
                            id={`radio-${i?.id}`}
                            className={`rounded-full text-sm border border-xcool-new-blue w-5 h-5 cursor-pointer flex items-center justify-center custom-radio-button ${
                              isChecked.indexOf(i?.id) > -1 ? " bg-white" : ""
                            }`}
                            onClick={() => selectHandler(i)}
                          >
                            {isChecked.indexOf(i?.id) > -1 && (
                              <div className="w-3 h-3  bg-xcool-new-blue rounded-full"></div>
                            )}
                          </div>
                          <span className=" md:text-sm text-xs">{i.day}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
                {!feesFeild && (
                  <>
                    <div className=" mt-5">
                      <div className=" border border-xcool-new-gray font-semibold border-dashed text-center py-2 text-sm bg-xcool-new-blue-bg">
                        <span>
                          Total Fees:{" "}
                          {`${selectedClass} x ${teacherFeeData} = `}{" "}
                          {Location?.countryCode === "IN" ? " Rs " : " $ "}
                        </span>
                        {selectedClass !== 4 && (
                          <span className="line-through">
                            {`${selectedClass * teacherFeeData}`}{" "}
                          </span>
                        )}
                        {calculateFinalFees(teacherFeeData, selectedClass)} /-
                      </div>
                      <div className="text-sm">
                        <div
                          className={`${
                            showCoupon ? "hidden" : "block"
                          } cursor-pointer  bg-xcool-new-blue text-white px-3 py-1 rounded-md w-fit mt-3`}
                          onClick={() => setShowCoupon(!showCoupon)}
                        >
                          Add Coupon
                        </div>
                        {showCoupon && (
                          <>
                            <div className="flex justify-between flex-wrap gap-2 items-center align-items-center mt-3">
                              <TextField
                                type="text"
                                id="standard-basic"
                                label="Coupon code"
                                variant="standard"
                                className={`w-full md:w-1/2 ${
                                  errors.email ? "border-red-500" : ""
                                }`}
                                onChange={(e) => {
                                  setCouponError("");
                                  setCouponCode(e.target.value);
                                }}
                                placeholder="Coupon code"
                              />
                              <div>
                                <button
                                  className={`  bg-xcool-new-blue text-white px-3 py-1 mx-1 rounded-md w-fit mt-3`}
                                  type="button"
                                  onClick={applyCoupon}
                                >
                                  Apply
                                </button>
                                <button
                                  className={`  bg-red-500 text-white px-3 py-1 rounded-md w-fit mt-3 mx-1`}
                                  type="button"
                                  onClick={() => {
                                    setShowCoupon(!showCoupon);
                                    setUpdatedAmt(null);
                                  }}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            {couponError && (
                              <div className=" text-red-500 ms-2 mt-1">
                                {couponError}
                              </div>
                            )}
                            {updatedAmt && (
                              <div className="mt-4 border border-xcool-new-gray font-semibold border-dashed text-center py-2 text-sm bg-xcool-new-blue-bg">
                                <span>
                                  {" "}
                                  Updated Amount :
                                  {Location?.countryCode === "IN"
                                    ? " Rs "
                                    : " $ "}{" "}
                                  {updatedAmt?.discounted_value}
                                </span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div>
                  {token === null && (
                    <>
                      <div className=" my-3">
                        <label className=" text-sm  font-semibold text-xcool-new-brown">
                          {" "}
                          Email
                        </label>
                        <TextField
                          type="text"
                          id="standard-basic"
                          // label="Email"
                          variant="standard"
                          {...register("email")}
                          className={`w-full ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                      <div className="my-3">
                        <label className=" text-sm  font-semibold text-xcool-new-brown">
                          {" "}
                          Contact Number
                        </label>
                        <TextField
                          type="text"
                          id="standard-basic"
                          // label="Contact Number"
                          variant="standard"
                          {...register("phone_no")}
                          className={`w-full ${
                            errors.phone_no ? "border-red-500" : ""
                          }`}
                          placeholder="Enter your contact number"
                        />
                        {errors.phone_no && (
                          <p className="text-red-500">
                            {errors.phone_no.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className=" flex gap-1 justify-center mt-7">
                  <button
                    className=" text-white bg-xcool-new-gray   px-3 py-1 rounded-2xl"
                    onClick={closeHandler}
                  >
                    Cancel
                  </button>

                  <button
                    // onClick={
                    //   feesFeild ? sendRequestHandler : purchaseRequestHandler
                    // }

                    className={` bg-xcool-new-blue text-white  px-3 py-1 rounded-2xl ${
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
    <>
      {/* <p>{modalData.course_name}</p> */}
      {feesFeild === true ? (
        <FormControl variant="standard" className=" my-2">
          {/* <InputLabel
            id="demo-simple-select-standard-label"
            className=" text-black font-semibold"
          >
            {category?.title}
          </InputLabel> */}
          <label className=" text-sm text-xcool-new-brown font-semibold">
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
        </FormControl>
      ) : (
        <>
          {category?.property !== "Fees" && (
            <FormControl variant="standard" className="my-2">
              {/* <InputLabel
                id="demo-simple-select-standard-label"
                className=" text-black font-semibold"
              >
                {category?.title}
              </InputLabel> */}
              <label className=" text-sm text-xcool-new-brown font-semibold">
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
            </FormControl>
          )}
        </>
      )}
    </>
  ) : null;
};
