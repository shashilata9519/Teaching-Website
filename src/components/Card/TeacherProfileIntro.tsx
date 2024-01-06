import { Header } from "@/common/Text/Header";
import { useState } from "react";

export const TeacherProfileIntro = ({
  bio,
  name,
  qualification,
  loading,
  award,
}: any) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <div className={`py-3 px-8 ${loading ? "blur-sm" : ""}`}>
      <Header title={`Hello! I am ${name}`} />

      <div
        dangerouslySetInnerHTML={{
          __html: showFullText ? bio : bio?.slice(0, 1500),
        }}
      />

      {qualification?.length > 0 && (
        <>
          <p className=" font-bold ">Degrees & Certifications</p>
          {qualification.map((data: any) => {
            return (
              <div
                key={data?.id}
                className="flex justify-between px-6 text-base"
              >
                <p className=" font-semibold">{data?.university}</p>
                <p>{data?.cert_id}</p>
              </div>
            );
          })}
        </>
      )}
      {award?.length > 0 && (
        <>
          <p className=" font-bold ">Other Achievement</p>
          {award?.map((data: any,index:any) => {
            return (
              <div
                key={data.id}
                className="flex justify-between px-6 text-base"
              >
                <p className=" font-semibold">Award {index+1}</p>
                <p>{data?.cert_id}</p>
              </div>
            );
          })}
        </>
      )}

      {bio?.length > 1500 && (
        <span
          onClick={toggleShowFullText}
          className=" text-blue-700 cursor-pointer"
        >
          {showFullText ? "" : "Show More"}
        </span>
      )}
    </div>
  );
};
