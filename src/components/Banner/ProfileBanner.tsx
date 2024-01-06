import { ModalBase } from "@/common/Modal/ModalBase";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";
import { useState } from "react";
import { AiFillYoutube, AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
interface PropsType {
  teacher: any;
  fb: any;
  insta: any;
  linkedin: any;
  twitter: any;
  youtube: any;
  videoData: any;
}

export const ProfileBannerCard = ({
  teacher,
  fb,
  insta,
  twitter,
  linkedin,
  youtube,
  videoData,
}: PropsType) => {
  // console.log(insta);
  const {
    setModalOpen,
    setModalData,
    modalData,
    setFilter,
    setSelectedOptions,
  }: any = useModal();
  const applyHandler = () => {
    setModalData({
      ...modalData,
      Teachers: teacher?.slug,
    });
    setModalOpen(true);
  };
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });

  const modalActionHandler = ({ type }: any) => {
    setmodalState({
      isOpen: true,
      type: type,
    });
  };
  // console.log(teacher,)
  return (
    <div
      className="rounded-3xl md:p-10 p-3 flex md:justify-between flex-wrap gap-4 justify-center mt-2"
      style={{
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(https://xcool.s3.ap-south-1.amazonaws.com/courseimg/hF3xUiUvEo7ztC9Uid3RfOAYd1ZR2ItXCCXBdBoI.png), #C4C4C4",
      }}
    >
      <div className=" flex md:justify-start justify-center  flex-wrap">
        <div
          className=" h-28 w-28 bg-cover rounded-full mx-auto"
          style={{
            backgroundImage: `url(${teacher?.dp})`,
          }}
        ></div>
        <div className="md:mx-5">
          <div className="text-white font-bold sm:text-2xl text-lg md:text-left text-center">
            Hello ! I'm {teacher?.firstname}
          </div>
          <div className=" flex sm:gap-3 gap-1 flex-wrap justify-center md:justify-start">
            <p className=" font-bold text-white">
              Years of Experience: {teacher?.details?.yoe}
            </p>

            <p className=" font-bold text-white">Location: {teacher?.city}</p>
          </div>
          <div className="about_sm_icon flex items-center flex-wrap mt-3 gap-4 justify-center md:justify-start">
            {youtube && (
              <Link
                href={youtube}
                className=" bg-white px-4 rounded-2xl"
                target="__blank"
              >
                <BsYoutube className="text-red-500  text-2xl mx-1  " />
              </Link>
            )}
            {linkedin && (
              <Link
                href={linkedin}
                className="bg-white px-4 rounded-2xl"
                target="__blank"
              >
                <AiFillLinkedin className="text-[#0A66C2]  text-2xl mx-1  " />
              </Link>
            )}
            {fb && (
              <Link
                href={fb}
                className="bg-white px-4 rounded-2xl "
                target="__blank"
              >
                <AiFillFacebook className="text-[#4267B2]  text-2xl mx-1 " />
              </Link>
            )}
            {twitter && (
              <Link
                href={twitter}
                className="bg-white px-4 rounded-2xl"
                target="__blank"
              >
                <BsTwitter className="text-[#1DA1F2]  text-2xl mx-1 " />
              </Link>
            )}
            {insta && (
              <Link
                href={insta}
                className="bg-white px-4 rounded-2xl"
                target="__blank"
              >
                <BsInstagram className="text-[#E1306C]  text-2xl mx-1" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex">
        {videoData[0]?.file_name && (
          <div>
            <button
              className="text-white rounded-3xl bg-xcool-new-blue px-6  cursor-pointer mx-2"
              onClick={() =>
                modalActionHandler({
                  type: "video",
                })
              }
            >
              Play
            </button>
          </div>
        )}
        <div>
        <button className=" bg-white px-4 rounded-2xl" onClick={applyHandler}>
          Book Now
        </button>
          </div>
      </div>
      {modalState?.type === "video" && (
        <ModalBase
          closeModal={setmodalState}
          modalState={{
            isOpen: true,
            type: null,
          }}
          title={"Short Video"}
          className="items-center"
        >
          <div className="mt-3">
            <video width="500" height="500" autoPlay controls>
              <source src={videoData[0]?.file_name} type="video/mp4" />
            </video>
          </div>
        </ModalBase>
      )}
    </div>
  );
};
