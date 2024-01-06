import { useRouter } from "next/router";
import Head from "next/head";
import { StudentBatchesCard } from "@/components/Card/StudentBatchesCard";
import { Heading } from "@/common/Text/Heading";
import { SubHeading } from "@/common/Text/SubHeading";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { Repo } from "@/services/Repo";
import moment from "moment";


export default () => {
  const router = useRouter();
  const slug=router?.query?.slug
  const [data,setData]=useState<any>({})
  useEffect(() => {
    (async () => {
    const data=await Repo.getInvitationDetails(slug)
    setData(data)
    })();
  }, []);
  
  return (
    <>
      <Head>
        {" "}
        <title>Purchase Details</title>
      </Head>
      <div className="lg:p-11 p-6  lg:mx-28">
      <Breadcrumb category={'Purchase Details'}/>
        <Heading title="Course Purchase Details" align="center" />
        {/* <StudentBatchesCard /> */}
        <SubHeading title="Transactions & Activity" align="left"/>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 p-5 rounded-3xl  bg-white">
          <div className=" col-span-1 md:col-span-2">
            <p>{moment(data?.created_at).format("MMM Do YYYY")}</p>
            <p className=" text-xl font-semibold">Payment for {data?.class?.length} classes</p>
            <p className=" font-semibold">Course name -{data?.course?.course_name}</p>
            <p>by {data?.teacher?.firstname}</p>
          </div>
          <div  className="flex justify-between md:block">
            <div>

            <p>Payment via</p>
            <p className=" font-semibold">UPI</p>
            </div>
            <div>

            <p>Status</p>
            <p className=" font-semibold">{data?.order?.payment_status}</p>
            </div>
          </div>
          <div>
            <p>Txn Id</p>
            <p className=" font-semibold">{data?.order?.payment_id || "Not available"}</p>
          </div>
          <div className=" text-right">
            <p>Payment Amount</p>
            <p className=" font-semibold text-right">{ data?.is_demo_req===1?"Free": (<>{data?.fees || data?.fees_usd}</>)}</p>
            <p className="text-xcool-new-blue">Invoice</p>
          </div>
        </div>
      </div>
    </>
  );
};
