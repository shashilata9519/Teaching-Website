import React from "react";

import { useAccountType } from "@/hooks/useAccountType";

import { CourseRequest } from "@/components/Card/CourseRequest";

const Request = () => {
  const { AccountType } = useAccountType();
  return (
    <div className="p-5">
      <CourseRequest />
    </div>
  );
};

export default Request;
