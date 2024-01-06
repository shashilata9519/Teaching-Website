import { Repo } from "@/services/Repo";
import moment from "moment";
import React, { useEffect } from "react";

export const StudentPaymentHistory = ({ studentData }: any) => {
  return (
    // <div className="bg-white my-10 rounded-2xl py-3 px-4 md:text-base text-xs">
    //   <div>
    //     <div className=" flex md:justify-between justify-left font-bold text-orange-400 flex-wrap">
    //       <div>Batch: test01</div>
    //       <div>Course: Gandharva Prarambhik Year 1</div>
    //       <div>Classes: 5</div>
    //     </div>

    //     <div className="grid grid-cols-4 font-bold">
    //       <div>Date</div>
    //       <div>Student</div>
    //       <div>Paid</div>
    //       <div>Type</div>
    //     </div>
    //     <div className="grid grid-cols-4">
    //       <div>2023-06-02</div>
    //       <div>Sambit Kumar</div>
    //       <div>500</div>
    //       <div>Demo</div>
    //     </div>
    //     <div className="grid grid-cols-4">
    //       <div>2023-06-02</div>
    //       <div>Sambit</div>
    //       <div>500</div>
    //       <div>Demo</div>
    //     </div>
    //   </div>
    // </div>
    <>
      {studentData?.length > 0 ? (
        <>
          {studentData?.map((i: any, index: any) => {
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-5 gap-3 p-5 rounded-3xl my-3 border bg-white"
                key={index}
              >
                <div className=" col-span-1 md:col-span-2">
                  <p>{ moment(i?.updated_at).format("MMM-Do-YYYY")}</p>
                  <p className=" text-xl font-semibold">
                    Payment for {i?.order_items_count} classes
                  </p>
                  <p className=" font-semibold">
                    Course name - {i?.invitation?.course?.course_name}
                  </p>
                  <p>by {i?.invitation?.teacher?.firstname}</p>
                </div>
                <div className="flex justify-between md:block">
                  {/* <div>
                    <p>Payment via</p>
                    <p className=" font-semibold">UPI</p>
                  </div> */}
                  <div>
                    <p>Status</p>
                    <p className=" font-semibold ">
                      <span className=" py-1 px-2 rounded-3xl">
                        {i?.payment_status}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <p>Txn Id</p>
                  <p className=" font-semibold">{i?.payment_id}</p>
                </div>
                <div className=" text-right">
                  <p>Payment Amount</p>
                  <p className=" font-semibold text-right">
                    {i?.currency} {i?.total_amount}
                  </p>
                  <p className="text-xcool-new-blue">Invoice</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className=" text-center text-2xl">no data available</div>
      )}
    </>
  );
};
