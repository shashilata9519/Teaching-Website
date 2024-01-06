import Link from "next/link";
import { useState } from "react";

const MainDropdown = ({ showteachermenu,setShowteachermenu, showmenu }: any) => {
  
  const [showSubmenu, setShowSubmenu] = useState(false);
  const menudata = [
    {
      title: "Music",
      link: "/teacher",
    },
    {
      title: "Dance (Coming Soon)",
      link: "/",
    },
  ];
  return (
    <>
      <button
        aria-haspopup="true"
        aria-controls="menu"
        onClick={() => {
          if (!showmenu) {
            setShowteachermenu(!showteachermenu);

            setShowSubmenu(false);
            // setTeacherMenu(showteachermenu);
          }
        }}
        className="outline-none relative focus:outline-none md:flex px-3 py-1 bg-white text-base ms-4 rounded-sm hidden items-center min-w-32"
      >
        <span className="pr-1   flex-1">Our Teachers</span>
      </button>
      {showteachermenu && (
        <div className=" font-semibold absolute top-14 left-60">
          <div className=" flex flex-col justify-start bg-white border rounded-sm relative z-50">
            {menudata?.map((i: any, index: any) => {
              return (
                <Link
                  className=" text-md p-1 text-start text-xcool-new-blue"
                  href={`${i?.link}`}
                  key={index}
                >
                  {i?.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {/* {showSubmenu && (
        <div className="font-semibold absolute top-14 left-80">
          <div className=" flex flex-col justify-start bg-white border rounded-sm">
            {filterCourse?.map((i: any, index: any) => {
              return (
                <Link
                  className=" text-xs p-1 text-start text-xcool-new-blue relative"
                  href={`/course/${i?.slug}`}
                >
                  {i?.slug}
                </Link>
              );
            })}
          </div>
        </div>
      )} */}
    </>
  );
};

export default MainDropdown;
