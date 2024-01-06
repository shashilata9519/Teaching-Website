import { useRouter } from "next/router";
import Head from "next/head";
import InvoiceCard from "@/components/Card/InvoiceCard";
import { useEffect, useState } from "react";
import { Repo } from "@/services/Repo";

export default () => {
  const card = [
    {
      event: "event1",
      des: "description",
      startdate: "6-10-2023",
      enddate: "7-10-2023",
      photo: "",
    },
    {
      event: "event1",
      des: "description",
      startdate: "6-10-2023",
      enddate: "7-10-2023",
      photo: "",
    },
  ];
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await Repo.getAllInvoices();
      console.log(data, "invoice");
      setInvoiceData(data);
    })();
  }, []);

  const generateInvoiceHandler = async () => {
    const data = await Repo.generateInvoice();
    console.log(data, "generated");
  };
  return (
    <>
      <Head>
        {" "}
        <title>Invoice</title>
      </Head>
      <div className="mt-10 md:mx-5">
        <div className=" text-right mb-6">
          {" "}
          <button
            onClick={generateInvoiceHandler}
            className=" bg-xcool-new-blue border text-white    px-3 py-1 rounded-md "
          >
            Generate Invoice
          </button>
        </div>

        <InvoiceCard invoiceData={invoiceData} />
      </div>
    </>
  );
};
