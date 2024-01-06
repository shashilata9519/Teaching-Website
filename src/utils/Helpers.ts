import moment from "moment";

export const statusStudent = (data: any) => {
  if (data?.is_accepted == 1) {
    return "Paid";
  }
  if (data?.batch == null) {
    return "Applied";
  } else {
    if (data?.is_demo_req == 1) {
      var status =
        (data?.is_accepted == 1 && "Accepted") ||
        (data?.is_cancelled == 1 && "Cancelled") ||
        (data?.is_rejected == 1 && "Rejected") ||
        "Pending confirmation";
    } else {
      var status =
        (data?.is_accepted == 1 && "Paid") ||
        (data?.is_demo_req == 1 && "Demo") ||
        (data?.is_cancelled == 1 && "Cancelled") ||
        (data?.is_rejected == 1 && "Rejected") ||
        "Payment Due";
    }
  }

  return status;
};

export const statusTeacher = (data: any) => {
  // var status =
  //   (data?.is_accepted == 1 && "Paid") ||
  //   (data?.is_demo_req == 1 && "Demo") ||
  //   (data?.is_cancelled == 1 && "Cancelled") ||
  //   (data?.is_rejected == 1 && "Rejected") ||
  //   "Pending";
  if (data?.is_demo_req == 1) {
    var status =
      (data?.is_accepted == 1 && "Paid") ||
      (data?.is_cancelled == 1 && "Cancelled") ||
      (data?.is_rejected == 1 && "Removed") ||
      (data?.is_pending == 1 && "Invited") ||
      "Applied";
  } else {
    var status =
      (data?.is_accepted == 1 && "Paid") ||
      (data?.is_cancelled == 1 && "Cancelled") ||
      (data?.is_rejected == 1 && "Removed") ||
      (data?.is_pending == 1 && "Payment Due") ||
      "Applied";
  }

  return status;
};

export const getDatesBetween = (
  startDate: any,
  endDate: any,
  utc_time: any,
  dayOfWeek: any
) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  // const current = moment(startDate).utc().valueOf()
  // const end = moment(endDate).utc().valueOf()
  // console.log(current, "fdata11122c");
  // console.log(startDate, "fdata11122c");
  // console.log(endDate, "fdata11122c");
  // Loop through all the dates between the start and end dates
  while (current <= end) {
    // Check if the current day is the desired day of the week (0-6, where Sunday is 0)
    if (dayOfWeek.includes(current.getDay())) {
      dates.push(moment(current.toISOString()).format("yyyy-MM-DD HH:mm:ss"));
    }
    // console.log(current, "fdata11122c");
    // Move to the next day
    current.setDate(current.getDate() + 1);
  }
  // console.log(dates.length, "dates");
  return dates;
};

export const getDatesForN = (
  startDate: any,
  no_of_dates: any,
  utc_time: any,
  dayOfWeek: any
) => {
  const dates = [];
  const current = new Date(startDate);
  let numDates = 0; // Number of dates found

  console.log(
    startDate,
    "**",
    no_of_dates,
    "**",
    utc_time,
    "**",
    dayOfWeek,
    current,
    "wwwww"
  );

  while (numDates < no_of_dates) {
    // Check if the current day is the desired day of the week (0-6, where Sunday is 0)
    if (dayOfWeek.includes(current.getDay())) {
      // console.log(dates,"*",current,'before')
      dates.push(moment(current.toISOString()).format("yyyy-MM-DD HH:mm:ss"));
      console.log(dates, "beforeafter");
      numDates++; // Increment the number of dates found
    }
    // console.log(no_of_dates, dayOfWeek, current, "dayOfWeek");
    // Move to the next day
    // console.log(current.setDate(current.getDate() + 1),'setdate')
    current.setDate(current.getDate() + 1);
  }
  // console.log(dates,'dates')
  return dates;
  const lastDate = dates.length > 0 ? dates[dates.length - 1] : null;
  console.log(lastDate, "last date");
  return lastDate;
};

export const calculateTeacherFee = (rateph: any, country: any) => {
  let newRate: any;

  if (country === "IN") {
    newRate = (rateph * 1.1).toFixed(1);

    const roundedValue = Math.ceil(parseFloat(newRate) / 25) * 25;
    const difference = roundedValue - parseFloat(newRate);
    newRate = (parseFloat(newRate) + difference).toFixed(1);
    // if (newRate <= 1200) {
    //   newRate = 1200;
    // }
  } else {
    let usdRate = (rateph / 83) * 1.25;
    if (usdRate <= 20) {
      usdRate = 20;
    }
    newRate = usdRate.toFixed(1);
  }

  const teacherFee = Math.ceil(parseFloat(newRate));
  console.log(teacherFee,"teacherFee")
  return teacherFee;
};
