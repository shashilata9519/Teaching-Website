import { useRouter } from "next/router";
import Head from "next/head";
import { TeacherBanner } from "@/components/Banner/TeacherBanner";
import { useEffect, useState } from "react";
import axios from "axios";
import { QualificationCard } from "@/components/Profile/QualificationCard";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { ProfileCard } from "@/components/Profile/ProfileCard";

export default () => {
  const router = useRouter();
  const [user, setUser] = useState<any>("");
  const [course, setCourse] = useState<any>("");
  const [AccountType, SetAccountType] = useState<any>("");
  const [qual, setQual] = useState<any>([]);
  const [award,setAward]=useState<any>([])
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myself`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myDegrees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourse(response?.data?.data);
        setQual(response?.data?.data?.filter((i: any) => i?.type === "degree"));
        setAward(response?.data?.data?.filter((i: any) => i?.type === "award"));

      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);
  useEffect(()=>{
    const Type: any = localStorage.getItem("type");
    SetAccountType(Type);
  },[])

  return (
    <>
      <Head>
        {" "}
        <title>course</title>
      </Head>
      <div className="lg:p-11 my-6 p-5">
        <TeacherBanner
          level={course[0]?.level}
          courseName={course[0]?.course_name}
          teacherName={user?.firstname}
          price={user?.details?.rateph || 500}
          priceUSD={user?.details?.usd_rateph || 20}
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 my-9 ">
          <div
            className="bg-white col-span-1 text-center h-fit py-5 rounded-2xl"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <ProfileCard user={user} AccountType={AccountType} cardType='view' />
          </div>

          <div
            className="lg:col-span-3 md:col-span-2  gap-6 bg-white p-3 h-fit rounded-2xl"
            style={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <ProfileInfo setEditAccountInfo={null} user={user} />

            <hr />

            <QualificationCard
              setEditEditQualification={null}
              qual={qual}
              award={award}
              AccountType={AccountType}
            />

         
          </div>
        </div>
      </div>
    </>
  );
};
