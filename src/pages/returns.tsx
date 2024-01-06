import { Heading } from "@/common/Text/Heading";

const returns = () => {
  return (
    <div className="mx-auto lg:w-6/12 min-h-screen">
      <Heading title="Refund Policy" align="left" />
      <ol className=" px-5">
        <li className="flex items-start">
          <p>{"1. "}</p>
          <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100 ">
            Once a payment is made for booking classes, in case of exigencies students can place a cancellation and refund request. The decision to make the refund is at the discretion of Xcool. Xcool reserves the right to deduct any service charges, fees or expenses from any refunds. Such cancellation and refund requests can be made only within the time-period when the payment is valid as per Pricing policy.
          </p>
        </li>
        <li className="flex items-start">
          <p>{"2. "}</p>
          <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
            In case of any grievances such as non-availability of teacher, delay in joining, shortening of class, poor network connection resulting in class not being conducted properly, students may submit details of such grievances to Xcool via the system or email provided on the website. Such grievances must be submitted in the system upto the scheduled end of the class for which the grievance is being submitted. For example, if a class is scheduled from 10 am to 11 am, grievances relating to the class must be submitted by the scheduled end of the class at 11 am. Xcool will consider such grievances entirely at our sole discretion and if we find it suitable, we may process refund for such classes. Student agrees not to dispute Xcool findings in this matter in any forum.
          </p>
        </li>
        <li className="flex items-start">
          <p>{"3. "}</p>
          <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
            In case teacher cancels class for any reason, Xcool may make alternate arrangements or issue a full refund to the student at our discretion.
          </p>
        </li>
      </ol>
    </div>
  );
};
export default returns