import { Repo } from "@/services/Repo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  const { query } = useRouter();
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      const data = await Repo.getInvoice(query?.slug);
      console.log(data, "invoice");
      setData(data);
    })();
  }, []);
  return (
    <>
      <Head>
        {" "}
        <title>Invoice Details</title>
      </Head>
      <div className=" mt-3 md:mt-20 md:mx-10">
        <div className="border flex gap-2 justify-between bg-xcool-new-blue-bg flex-wrap p-3">
          <p>
            <span className=" font-semibold">Invoice Date : </span>
            {data?.invoice_date}
          </p>
          <p>
            <span className=" font-semibold">Invoice No : </span>
            {}
          </p>
          <p>
            <span className=" font-semibold">Teacher : </span>
            {data?.class[0]?.invitation?.name}
          </p>
          <p>
            <span className=" font-semibold">Total : </span>
            {data?.invoice_total || 0}
          </p>
        </div>
        <div className="my-4 border grid grid-cols-1 bg-xcool-new-blue-bg  md:grid-cols-4 gap-2">
          <p>
            <span className=" font-semibold">S.No: </span>
            {data?.id}
          </p>
          <p>
            <span className=" font-semibold">Class Number : </span>{" "}
            {data?.class[0]?.id}
          </p>
          <p>
            <span className=" font-semibold">Class Id : </span>{" "}
            {data?.class[0]?.class_id}
          </p>
          <p>
            <span className=" font-semibold">Student : </span>{" "}
            {data?.class[0]?.invitation?.lead?.student_name}
          </p>
          <p>
            <span className=" font-semibold">Fees : </span>{" "}
            {data?.class[0]?.invitation?.lead?.fee_pc}
          </p>
          <p>
            <span className=" font-semibold">Discount : </span>{" "}
            {data?.class[0]?.invitation?.lead?.discount}
          </p>
        </div>
        <div className="bg-xcool-new-blue-bg border p-2 text-right">
          Total : {data?.invoice_item?.fee_total || 0}
        </div>
      </div>
    </>
  );
};
