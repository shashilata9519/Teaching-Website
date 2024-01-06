import { useModal } from "@/context/ModalContext";
import { Footer } from "./Footer/Footer";
import Navbar2 from "./NavBar/Navbar";
import SwipeableTemporaryDrawer from "./SideBarModal";
import { LoginModal } from "@/common/Modal/LoginModal";
import React, { useState } from "react";
import OpenArrow from "@/assets/OpenArrow";
import axios from "axios";
import { Repo } from "@/services/Repo";
// import Dropdown from "./NavBar/MainDropdown";
import CloseArrow from "@/assets/CloseArrow";
import Link from "next/link";
import { ModalBase } from "@/common/Modal/ModalBase";
import { useRouter } from "next/router";
import ResponsiveDrawer from "@/common/ResponsiveDrawer";
import { useAccountType } from "@/hooks/useAccountType";
import { AlertModal } from "@/common/Modal/AlertModal";
import { ToastContainer } from "react-toastify";
import SideBarBookNow from "./SideBarBookNow";
import { Dropdown } from "./NavBar/Dropdown";
const Layout = ({ children }: any) => {
  const router = useRouter();
  const {
    isModalOpen,
    activeTab,
    setActiveTab,
    setlinkupdatemodal,
    setModalType,
    modalType,
    linkupdatemodal,
  }: any = useModal();
  let [loginState, setLoginState] = useState<any>({
    isOpen: false,
    type: null,
  });
  const { AccountType } = useAccountType();
  const [auth, setAuth] = useState("");
  const [filterCourse, setFilterCourse] = useState([]);
  const [course, setCourse] = React.useState<any>([]);
  const [genre, setGenre] = React.useState<any>([]);
  const [requestStatus, setRequestStatus] = useState<any>({
    isOpen: false,
    type: null,
  });
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setAuth(token ? token : "");
    (async () => {
      const data = await Repo.getGenre();
      // const newListValues = data?.map((item: any) => item?.subcategory);
      setGenre(data);
    })();
  }, []);
  React.useEffect(() => {
    (() => {
      axios
        .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCourses`)
        .then((response: any) => {
          // console.log(response?.data?.data, "hh");
          setCourse(response?.data?.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  const openBookNowSidebar = () => {
    setModalType("bookNowSidebar"); // Set modalType to "bookNowSidebar"
  };

  const handleMouseEnter = (id: any) => {
    const filteredData = course.filter((item: any) => item?.subcategory === id);

    setFilterCourse(filteredData);
  };

  const handleMouseLeave = () => {
    setFilterCourse([]);
  };

  const navigateHandler = () => {
    setRequestStatus({
      isOpen: false,
      type: null,
    });

    router.push(`/account/dashboards/request`, undefined, {
      shallow: true,
    });
  };
  // console.log(activeTab,'activetab')

  const selectedTabs = () => {
    return null;
  };

  //   return (
  //     <>
  //       <div id="">
  //       <ResponsiveDrawer children={children} />
  //       </div>

  //       <div id="content">
  //         <div id="header"></div>
  // {
  //   selectedTabs()
  // }
  //         <div id="footer"></div>
  //       </div>
  //     </>
  //   );

  const { modalData }: any = useModal();

  // console.log(modalData,'modalData')
  return (
    <div>
      <div className="font-dm bg-white ">
        {auth ? (
          <ResponsiveDrawer>{children}</ResponsiveDrawer>
        ) : (
          <>
            <Navbar2 />
            <div className=" md:hidden block mt-4">
              <div className="group inline-block genre text-xcool-new-blue text-base ms-4 font-semibold  ">
                <button
                  aria-haspopup="true"
                  aria-controls="menu"
                  className="outline-none focus:outline-none  px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
                >
                  <span className="pr-1 font-semibold flex-1 text-xs">
                    Learn
                  </span>
                  <span>
                    <OpenArrow />
                  </span>
                </button>
                <ul
                  id="menu"
                  aria-hidden="true"
                  className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
 transition duration-150 ease-in-out origin-top w-40 z-50"
                >
                  {genre?.map((i: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                        onMouseEnter={() => handleMouseEnter(i?.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          aria-haspopup="true"
                          aria-controls="menu-lang"
                          className="w-full text-xs truncate text-left flex items-center outline-none focus:outline-none"
                        >
                          <span className="pr-1 flex-1">{i?.subcategory}</span>
                          <span className="mr-auto">
                            <CloseArrow />
                          </span>
                        </button>
                        <Dropdown filterCourse={filterCourse} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="group inline-block genre text-xcool-new-blue text-base ms-2 font-semibold ">
                <button
                  aria-haspopup="true"
                  aria-controls="menu"
                  className="outline-none focus:outline-none  px-3 py-1 bg-white text-xs rounded-sm flex items-center min-w-32"
                >
                  <span className="pr-1 font-semibold flex-1">Our Teachers</span>
                  <span>
                    <OpenArrow />
                  </span>
                </button>
                <ul
                  id="menu"
                  aria-hidden="true"
                  className="bg-white border rounded-sm transform scale-0 text-xs group-hover:scale-100 absolute 
 transition duration-150 ease-in-out origin-top min-w-32 z-50"
                >
                  <li
                    className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                    // onMouseEnter={() => handleMouseEnter(i?.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={"/teacher"}
                      aria-haspopup="true"
                      aria-controls="menu-lang"
                      className="w-full text-left flex items-center outline-none focus:outline-none"
                    >
                      <span className="pr-1 flex-1">Music Teacher</span>
                      <span className="mr-auto">{/* <CloseArrow /> */}</span>
                    </Link>

                    {/* <Dropdown filterCourse={filterCourse} /> */}
                  </li>
                  <li
                    className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                    // onMouseEnter={() => handleMouseEnter(i?.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      aria-haspopup="true"
                      aria-controls="menu-lang"
                      className="w-full text-left flex items-center outline-none focus:outline-none"
                    >
                      <span className="pr-1 flex-1">
                        Dance Teacher (Coming Soon)
                      </span>
                      <span className="mr-auto">{/* <CloseArrow /> */}</span>
                    </button>

                    {/* <Dropdown filterCourse={filterCourse} /> */}
                  </li>
                </ul>
              </div>
            </div>
            <div className="min-h-[70vh] mx-auto" >{children}</div>
            <Footer />
          </>
        )}
         {modalType === "bookNowSidebar" && <SideBarBookNow />}
      </div>

      {isModalOpen && (
        
        <SwipeableTemporaryDrawer
          setLoginState={setLoginState}
          setRequestStatus={setRequestStatus}
        />)
      }
     
      
      {loginState.type === "login" && (
        <LoginModal loginState={loginState} setLoginState={setLoginState} />
      )}
      {requestStatus.type === "request" && (
        <ModalBase
          closeModal={setRequestStatus}
          modalState={requestStatus}
          title={"Booked Request Successfully"}
          className=""
        >
          <div className=" text-center  my-5 ">
            <p className=" font-semibold text-orange-400">
              Your booking request has been sent
            </p>
            <p className="mt-5 text-sm"> You shall receive a revert soon</p>
            <p className=" my-5 text-sm">
              Track your booked request in your profile
            </p>
            <button
              // href="/account/dashboard?tab=3"
              onClick={navigateHandler}
              className=" bg-black text-white rounded-3xl px-2 py-1"
            >
              Track Status
            </button>
          </div>
        </ModalBase>
      )}

      <AlertModal
        modalState={linkupdatemodal}
        title="Update class link:"
        content="URL:"
        closeModal={setlinkupdatemodal}
      />
      <ToastContainer />
    </div>
  );
};

export default Layout;
