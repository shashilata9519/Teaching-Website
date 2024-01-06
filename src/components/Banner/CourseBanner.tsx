import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { useModal } from "@/context/ModalContext";

import { AiFillYoutube } from "react-icons/ai";

export const CourseBanner = ({ courseName, category, hideBread, img,genre ,courseSlug}: any) => {
  const {
    setModalOpen,
    setModalData,
    modalData,
    setFilter,
    setSelectedOptions,
  }: any = useModal();
  



  const applyHandler = () => {
    setFilter({subcategory:genre})
    setModalData({
      ...modalData,
      Genre:genre,
      Courses:courseSlug,
      Fees: "",
      Teachers:"",
      Timeslot: "",
  
    });
    setModalOpen(true);
  };
  return (
    <div
      className="rounded-3xl px-8 py-4 flex justify-between  items-center flex-wrap mt-2"
      style={{
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 
          url(${img}), #C4C4C4`,
      }}
    >
      {!hideBread && <Breadcrumb courseName={courseName} category={category} />}

      {/* <div className="text-white font-bold text-4xl my-3">course</div> */}
      <div className="text-white font-bold my-3 text-lg md:text-3xl">
        {courseName}
      </div>
      <div className=" md:mx-0  mx-auto">
       
          <button className=" bg-white px-4 rounded-2xl" onClick={applyHandler}>
            Book Now
          </button>
       
      </div>
    </div>
  );
};
