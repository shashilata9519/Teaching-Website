import { Heading } from "@/common/Text/Heading";

const pricingpolicy= () => {
    return(

  <div className="mx-auto lg:w-6/12 min-h-screen">
    <Heading title="Pricing Policy" align="left" />
    <ol className=" px-5">
      <li className="flex items-start">
        <p>{"1. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Xcool will provide pricing for courses and teachers on a per class or per unit time basis.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"2. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Pricing will be indicated against genres, courses and / or teachers.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"3. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Pricing is determined by various factors and varies with teacher, location, number of classes booked, course, genre etc.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"4. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Students have to make upfront payment for classes based on available options.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"5. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Once payment is made, it is valid for 3 months from the date of payment.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"6. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        From time-to-time Xcool may, at holly our discretion, provide promotional offers including but not limited to discounts, coupons, one-time sales etc. to some of its new or existing customers.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"7. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Payments made under promotional offers, discounts, coupons etc. are valid for a period of 30 days.
        </p>
      </li>
      <li className="flex items-start">
        <p>{"8. "}</p>
        <p className="ms-2 mb-2 text-justify text-md-left text-14 w-100">
        Once a payment is made, refund is governed by Xcool refund policy.
        </p>
      </li>
    </ol>
  </div>
    )
};
export default pricingpolicy