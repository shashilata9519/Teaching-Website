import { useRouter } from "next/router";
import Head from "next/head";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const router = useRouter();
  const [teacherCalendar, setTeacherCalendar] = useState<any>([]);
  const [studentCalendar, setStudentCalendar] = useState<any>([]);
  const [AccountType, SetAccountType] = useState<any>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myClassesTeacher`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTeacherCalendar(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myClassesStudent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setStudentCalendar(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);
  }, []);

  // console.log(teacherCalendar, "teacher calendar");
  // console.log(studentCalendar,'stu calendar')
  const events: any = [
    {
      title: teacherCalendar[0]?.batch_name,
      start: teacherCalendar[0]?.start,
    },
  ];

  return (
    <>
      <Head>
        {" "}
        <title>Calendar</title>
      </Head>
      <div className="lg:p-11 p-6  lg:mx-28">
        {
          AccountType==="teacher"?(
            <div className="grid md:grid-cols-3 grid-cols-1">
            <div className=" md:col-span-2">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
              
              />
            </div>
            <div className="text-center ">
              <button className="text-center border border-xcool-green px-3 py-1 rounded-3xl text-xcool-new-blue hover:text-white hover:bg-xcool-new-blue">
                New batch
              </button>
            </div>
          </div>
          ):(
            <div className=" ">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              
            />
          </div>
          )
        }
      
      </div>
    </>
  );
};

