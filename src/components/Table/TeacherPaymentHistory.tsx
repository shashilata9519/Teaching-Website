import { Repo } from "@/services/Repo";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
export const TeacherPaymentHistory = ({
  paymentHistory,
  changeMonth,
  currentMonth,
  type,
  invoiceData,
  paymentPayout,
}: any) => {

  const generateInvoiceHandler = async () => {
    const data = await Repo.generateInvoice();
    console.log(data, "generated");
  };
  return (
    <>
      {type === "payin" && (
        <div>
          {paymentHistory?.length > 0 ? (
            <>
              {paymentHistory?.map((item: any, index: any) => {
                return (
                  <div
                    className={`bg-white my-5 rounded-2xl py-3 border px-1 md:px-4 md:text-base text-xs`}
                    key={index}
                  >
                    <div>
                      <div className=" flex justify-between flex-wrap">
                        <div>
                          <p>
                            <span className=" font-semibold">Course: </span>
                            {item?.course?.course_name}
                          </p>
                          <p>
                            <span className=" font-semibold">Batch: </span>
                            {item?.batch?.batch_name}
                          </p>
                          <p>
                            <span className=" font-semibold">Student: </span>
                            {item?.student?.firstname}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className=" font-semibold">Classes: </span>
                            {item?.class?.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {item?.class?.map((i: any, index: any) => {
                          return (
                            <div
                              className={`flex flex-col items-center border rounded-md border-orange-400 w-fit p-2 mt-4 ${
                                moment(i?.batchclass?.class_date).month() ==
                                currentMonth
                                  ? i?.batchclass?.status_t == "Completed"
                                    ? "bg-green-100"
                                    : ""
                                  : "bg-gray-300"
                              }`}
                              key={index}
                            >
                              <div>Class {index + 1}</div>
                              <div className=" text-xs">
                                {moment(i?.date_and_time + "Z").format(
                                  "MMM Do YYYY"
                                )}
                              </div>
                              {/* <div>
                              {moment(i?.date_and_time + "Z").format("h:mm A")}
                            </div> */}
                              {/* Class ID: {i?.class_id} */}
                              {/* {console.log(
                                moment(i?.batchclass?.class_date).month() ==
                                  currentMonth
                              )} */}
                              {moment(i?.batchclass?.class_date).isSame(
                                currentMonth,
                                "month"
                              ) ?? "Tue"}
                              {i?.batchclass?.is_cancelled ? (
                                <p className=" text-white bg-red-500 rounded-md text-xs p-1">
                                  Cancelled
                                </p>
                              ) : i?.batchclass?.status_t ? (
                                <p className=" text-white bg-green-500 rounded-md text-xs p-1">
                                  T-{i?.batchclass?.status_t}
                                </p>
                              ) : (
                                <p className=" text-white bg-slate-700 rounded-md text-xs p-1">
                                  Scheduled
                                </p>
                              )}
                              {i?.batchclass?.status_s && (
                                <p className=" text-white mt-2 bg-green-500 rounded-md text-xs p-1">
                                  S-{i?.batchclass?.status_s}
                                </p>
                              )}
                              {i?.batchclass?.status_t == "Completed" && (
                                <div className="text-xs p-1 ">
                                  {item?.currency == "USD" ? (
                                    <>
                                      <span className=" font-semibold">$</span>
                                      {item?.lead?.fee_pc}
                                    </>
                                  ) : (
                                    <>
                                      <span className=" font-semibold">Rs</span>
                                      {item?.lead?.fee_pc}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className=" text-center text-2xl mt-6">No data available</div>
          )}
        </div>
      )}
      {type === "payout" && (
        <>
          {paymentPayout?.length > 0 ? (
            <div>
              {paymentPayout?.map((item: any, index: any) => {
                return (
                  <div key={index} className=" flex justify-between flex-wrap gap-3">
                    <div>
                      <p>
                        <span className=" font-semibold text-blue-800">
                          {moment(item?.created_at).format("MMM Do YYYY")}
                        </span>
                      </p>
                      {/* <p>
                      <span className=" font-semibold">id : </span>
                      {item?.id}
                    </p> */}
                    </div>

                    <div>
                      <p>
                        <span className=" font-semibold">Status : </span>
                        {item?.status}
                      </p>
                      <p>
                        <span className=" font-semibold">Amount : </span>
                        {item?.currency} {item?.amount / 100}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className=" font-semibold">Payment Mode : </span>
                        {item?.mode}
                      </p>

                      <p>
                        <span className=" font-semibold">Fees : </span>
                        {item?.currency} {item?.fees}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className=" text-center text-xl mt-6 border rounded-2xl  py-4">
              No payout data available
            </div>
          )}
          <div className="mt-4">
            <div className=" text-center font-semibold text-blue-800">
              Invoice
            </div>
            <div className=" text-right mb-3">
              {" "}
              <button
              onClick={generateInvoiceHandler}
              className=" bg-xcool-new-blue border text-white   px-3 py-1 rounded-md ">
                Generate Invoice
              </button>
            </div>

            {invoiceData?.map((item: any, index: any) => {
              return (
                <div key={index} className=" flex justify-between flex-wrap gap-3 rounded-2xl border md:p-6">
                  <div>
                    <p>
                      <span className=" font-semibold text-blue-800">
                        Date:{moment(item?.invoice_date).format("MMM Do YYYY")}
                      </span>
                    </p>
                    <p>
                      <span className=" font-semibold">Invoice Id : </span>
                      {item?.id}
                    </p>
                    <p>
                      <span className=" font-semibold">Amount : </span>
                      {item?.invoice_total}
                    </p>
                    <p>
                      <span className=" font-semibold">Payment Status : </span>
                      {item?.paymeny_status}
                    </p>
                  </div>

                  <div>
                    <div className=" text-right">
                      {" "}
                      <Link href={`invoice/${item?.id}`} className=" bg-xcool-new-blue border text-white   px-3 py-1 rounded-md ">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      {paymentHistory?.length > 0 ? (
        <>
          <>
            {paymentHistory?.map((item: any, index: any) => {
              return (
                <div
                  className={`bg-white my-5 rounded-2xl py-3 border px-1 md:px-4 md:text-base text-xs`}
                  key={index}
                >
                  {" "}
                  {type === "payin" ? (
                    <div>
                      <div className=" flex justify-between flex-wrap">
                        <div>
                          <p>
                            <span className=" font-semibold">Course: </span>
                            {item?.course?.course_name}
                          </p>
                          <p>
                            <span className=" font-semibold">Batch: </span>
                            {item?.batch?.batch_name}
                          </p>
                          <p>
                            <span className=" font-semibold">Student: </span>
                            {item?.student?.firstname}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className=" font-semibold">Classes: </span>
                            {item?.class?.length}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center md:justify-start">
                        {item?.class?.map((i: any, index: any) => {
                          return (
                            <div
                              className={`flex flex-col items-center border rounded-md border-orange-400 w-fit p-2 mt-4 ${
                                moment(i?.batchclass?.class_date).month() ==
                                currentMonth
                                  ? i?.batchclass?.status_t == "Completed"
                                    ? "bg-green-100"
                                    : ""
                                  : "bg-gray-300"
                              }`}
                              key={index}
                            >
                              <div>Class {index + 1}</div>
                              <div className=" text-xs">
                                {moment(i?.date_and_time + "Z").format(
                                  "MMM Do YYYY"
                                )}
                              </div>
                              {/* <div>
                              {moment(i?.date_and_time + "Z").format("h:mm A")}
                            </div> */}
                              {/* Class ID: {i?.class_id} */}
                              {/* {console.log(
                                moment(i?.batchclass?.class_date).month() ==
                                  currentMonth
                              )} */}
                              {moment(i?.batchclass?.class_date).isSame(
                                currentMonth,
                                "month"
                              ) ?? "Tue"}
                              {i?.batchclass?.is_cancelled ? (
                                <p className=" text-white bg-red-500 rounded-md text-xs p-1">
                                  Cancelled
                                </p>
                              ) : i?.batchclass?.status_t ? (
                                <p className=" text-white bg-green-500 rounded-md text-xs p-1">
                                  {i?.batchclass?.status_t}
                                </p>
                              ) : (
                                <p className=" text-white bg-slate-700 rounded-md text-xs p-1">
                                  Scheduled
                                </p>
                              )}
                              {i?.batchclass?.status_t == "Completed" && (
                                <div className="text-xs p-1 ">
                                  {item?.currency == "USD" ? (
                                    <>
                                      <span className=" font-semibold">$</span>
                                      {item?.lead?.fee_pc}
                                    </>
                                  ) : (
                                    <>
                                      <span className=" font-semibold">Rs</span>
                                      {item?.lead?.fee_pc}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className=" flex justify-between flex-wrap gap-3">
                      <div>
                        <p>
                          <span className=" font-semibold text-blue-800">
                            {moment(item?.created_at).format("MMM Do YYYY")}
                          </span>
                        </p>
                        {/* <p>
                          <span className=" font-semibold">id : </span>
                          {item?.id}
                        </p> */}
                      </div>

                      <div>
                        <p>
                          <span className=" font-semibold">Status : </span>
                          {item?.status}
                        </p>
                        <p>
                          <span className=" font-semibold">Amount : </span>
                          {item?.currency} {item?.amount / 100}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className=" font-semibold">
                            Payment Mode :{" "}
                          </span>
                          {item?.mode}
                        </p>

                        <p>
                          <span className=" font-semibold">Fees : </span>
                          {item?.currency} {item?.fees}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        </>
      ) : (
        <div className=" text-center text-2xl mt-6">No data available</div>
      )}
    </>
  );
};
