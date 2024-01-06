import { useModal } from "@/context/ModalContext";
import { calculateTeacherFee } from "@/utils/Helpers";
import React from "react";

export const TeacherBanner = ({
  level,
  courseName,
  teacherName,
  price,
  courseSlug,
  teacherSlug,
  dp,
  priceUSD,
}: any) => {
  const {
    setModalOpen,
    setModalData,
    modalData,
    filter,
    setFilter,
    setSelectedOptions,
  }: any = useModal();
  const [Location, SetLocation] = React.useState<any>([]);

  const applyHandler = () => {
    setModalData({
      ...modalData,
      Teachers: teacherSlug || "",
      Courses: courseSlug || "",
    });
    setModalOpen(true);
  };
  console.log(level);
  React.useEffect(() => {
    const location: any = localStorage.getItem("location");
    SetLocation(JSON.parse(location));
  }, []);
  return (
    <div
      className="rounded-3xl md:px-10 md:py-6 py-4 flex justify-between items-center flex-wrap mt-2"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(https://xcool.s3.ap-south-1.amazonaws.com/courseimg/hF3xUiUvEo7ztC9Uid3RfOAYd1ZR2ItXCCXBdBoI.png), #C4C4C4",
      }}
    >
      <div className="text-white flex flex-wrap gap-3 md:justify-start justify-center">
        <div
          className=" h-28 w-28 bg-cover rounded-full mx-auto"
          style={{
            backgroundImage: `url(${dp})`,
          }}
        ></div>
        <div>
          <div>
            <span className=" font-bold text-base">{courseName} - </span>

            {level === 1 && (
              <span className="text-white text-xs py-1 px-1 md:text-sm md:px-4 md:py-1 bg-xcool-new-blue rounded-3xl uppercase">
                Beginner
              </span>
            )}
            {level === 2 && (
              <span className="text-white text-xs py-1 px-1 md:text-sm md:px-4 md:py-1 bg-[#fa9b05] rounded-3xl uppercase">
                Intermediate
              </span>
            )}
            {level === 3 && (
              <span className="text-white text-xs py-1 px-1 md:text-sm md:px-4 md:py-1 bg-[#ca2c1b] rounded-3xl uppercase">
                Advanced
              </span>
            )}
          </div>
          <div className=" text-lg text-center md:text-left  md:text-3xl font-semibold my-2">
            {teacherName}
          </div>
          <div className="flex md:justify-start justify-center flex-wrap">
            <div>
              <p className=" text-xs ">Classes starting at</p>
              <p>
                <span className="text-sm md:text-2xl font-semibold">
                  {" "}
                  {Location?.countryCode === "IN" ? " Rs " : " $ "}{" "}
                  {Location?.countryCode === "IN" ? (
                    <>{calculateTeacherFee(price, Location?.countryCode)}</>
                  ) : (
                    <>{calculateTeacherFee(priceUSD, Location?.countryCode)}</>
                  )}
                </span>{" "}
                / hour
              </p>
            </div>
            {/* <ul className=" text-xs mx-8" style={{ listStyle: "disc" }}>
            <li>Currently Available</li>
            <li>Clases</li>
          </ul> */}
          </div>
        </div>
      </div>
      <div className=" mx-auto md:mx-0">
        <button className=" bg-white px-4 rounded-2xl" onClick={applyHandler}>
          Book Now
        </button>
      </div>
    </div>
  );
};
