import { useRouter } from "next/router";
import Head from "next/head";
import { Heading } from "@/common/Text/Heading";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { StudentPaymentHistory } from "@/components/Table/StudentPaymentHistory";
import { TeacherPaymentHistory } from "@/components/Table/TeacherPaymentHistory";
import { Repo } from "@/services/Repo";
import moment from "moment";
import { Tab } from "@headlessui/react";
import { TabHeading } from "@/common/tabs/TabHeading";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

export default () => {
  const router = useRouter();
  const [AccountType, SetAccountType] = useState<any>("");
  const [currentMonth, setCurrentMonth] = useState<any>(new Date().getMonth());
  const [paymentHistory, setPaymentHistory] = useState<any>([]);
  const [paymentpayout, setPaymentpayout] = useState<any>([]);
  const [studentData, setStudentData] = useState<any>([]);
  const [invoiceData,setInvoiceData]=useState([])

  useEffect(() => {
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);

    (async () => {
      if (Type === "teacher") {
        var current_year = moment().get("year");
        const data1 = await Repo.teacherPayins(currentMonth, current_year);
        setPaymentHistory(data1);
        const data3 = await Repo.teacherPayouts(currentMonth, current_year);
        setInvoiceData(data3[1]);
        setPaymentpayout(data3[0]);
      } else {
        const data2 = await Repo.studentPayment();
        setStudentData(data2);
      }
    })();
  }, [currentMonth]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const [currentMonth, setCurrentMonth] = useState<any>(new Date().getMonth());
  console.log(currentMonth, "current");
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth: any) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };

  // Function to handle the previous button click
  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth: any) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };

  // useEffect(() => {
  //   setCurrentMonth(currentMonth + 1);
  // }, [currentMonth]);



  return (
    <>
      <Head>
        {" "}
        <title>wallet</title>
      </Head>
      <div className=" md:p-6 container mx-auto">
        <Breadcrumb category={"Payments"} />
        {/* <div className=" flex flex-wrap justify-start gap-3 items-center">
          <p className=" text-lg md:text-3xl font-bold  py-3">My Wallet</p>
          <p className=" bg-orange-400 text-white rounded-3xl text-sm md:text-lg  px-2 py-1 ">
            Received Payments
          </p>
        </div> */}
        <div className=" px-3   mb-3">
          {AccountType == "student" ? (
            <StudentPaymentHistory studentData={studentData} />
          ) : (
            <>
              <div className=" flex justify-between mt-3">
                <button
                  className="  px-2  rounded-md md:text-4xl text-2xl"
                  onClick={handlePreviousMonth}
                >
                  <IoIosArrowDropleftCircle />
                </button>
                <div className="text-sm md:text-lg text-red-600">
                  Month: {monthNames[currentMonth]}
                </div>
                <button
                  className="  px-2  rounded-md md:text-4xl text-2xl"
                  onClick={handleNextMonth}
                >
                  <IoIosArrowDroprightCircle />
                </button>
              </div>
              <div className=" grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                <div className=" text-center font-semibold text-blue-700">Payins</div>
                <TeacherPaymentHistory
                  paymentHistory={paymentHistory}
                  // changeMonth={changeMonth}
                  currentMonth={currentMonth}
                  type={"payin"}
                />
                </div>
                <div>
                <div className=" text-center font-semibold text-blue-700">Payouts</div>

                <TeacherPaymentHistory
                  paymentPayout={paymentpayout}
                  // changeMonth={changeMonth}
                  currentMonth={currentMonth}
                  invoiceData={invoiceData}
                  type={"payout"}
                />
                </div>
              </div>
              {/* <Tab.Group onChange={handleTabChange} selectedIndex={activeTabs}>
                <Tab.List
                  className={" flex flex-wrap justify-center gap-2 mt-5"}
                >
                
                  <TabHeading title="Payins" />
                  <TabHeading title="Payouts" />
                </Tab.List>
                <Tab.Panels className={"my-7"}>
                  <Tab.Panel>
                    {" "}
                   {" "}
                  </Tab.Panel>
                  <Tab.Panel>
                   
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};
