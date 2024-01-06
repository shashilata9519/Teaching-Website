import { StudentResource } from "@/components/Card/StudentResource";
import { UploadDocument } from "@/components/Card/UploadDocument";
import { useAccountType } from "@/hooks/useAccountType";
import React from "react";

const Resources = () => {
  const { AccountType } = useAccountType();

  return (
    <div className='p-5 mt-5'>
      {AccountType == "student" && <StudentResource />}
      {AccountType == "teacher" && <UploadDocument />}
    </div>
  );
};

export default Resources;
