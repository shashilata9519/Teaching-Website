import React, { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../../assets/logo";
import Form from "../Form/Form";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import { LoginModal } from "@/common/Modal/LoginModal";
import OpenIcon from "@/assets/OpenIcon";
import CloseIcon from "@/assets/CloseIcon";
import { RegisterModal } from "@/common/Modal/RegisterModal";
import { useRouter } from "next/router";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import {
  Autocomplete,
  Avatar,
  Divider,
  Input,
  InputBase,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { TextField, Paper, Popper, ClickAwayListener } from "@mui/material";
import axios from "axios";
import { HiOutlineLogout } from "react-icons/hi";
import { Repo } from "@/services/Repo";
import { Combobox, Transition } from "@headlessui/react";
import { TeacherRegisterModal } from "@/common/Modal/TeacherRegisterModal";
import { TextModal } from "@/common/Modal/TextModal";
import { SuccessModal } from "@/common/Modal/SuccessModal";
import { ForgotPasswordModal } from "@/common/Modal/ForgotPasswordModal";
import { AlertModal } from "@/common/Modal/AlertModal";
import { CiSearch } from "react-icons/ci";
import Dropdown from "./MainDropdown";

import OpenArrow from "@/assets/OpenArrow";
import CloseArrow from "@/assets/CloseArrow";
import { useModal } from "@/context/ModalContext";
import { ModalBase } from "@/common/Modal/ModalBase";
import { BsWhatsapp } from "react-icons/bs";
import { AiFillBell } from "react-icons/ai";
import GenreDropdown from "./GenreDropdown";
import MainDropdown from "./MainDropdown";
import moment from "moment";

export default function Nav() {
  const router = useRouter();
  const { activeTab }: any = useModal();

  const [navbar, setNavbar] = useState<boolean>(false);
  const [AccountType, SetAccountType] = useState("");
  const [notificationData, setNotificationData] = useState([]);

  const [auth, setAuth] = useState("");
  const [user, setUser] = useState<any>("");
  const [force, setForce] = useState(0);
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [loginState, setLoginState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [teacherModalState, setTeacherModalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [SuccessState, setSuccessState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [forgotPassState, setforgotPassState] = useState<any>({
    isOpen: false,
    type: null,
  });
  let [modal1State, setmodal1State] = useState<any>({
    isOpen: false,
    type: null,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(loginState, "loginState");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const Type = localStorage.getItem("type");
    SetAccountType(Type ? Type : "");
    setAuth(token ? token : "");
    const protectedroutes = ["account"];
    if (protectedroutes.includes(router.pathname.split("/")[1])) {
      console.log("check auth", loginState);

      if (!token || token == "") {
        if (loginState.isOpen == false || loginState.isOpen == undefined) {
          setLoginState({
            isOpen: true,
            type: "login",
          });
          console.log("hi force", force);
          if (force < 2) {
            setForce(force + 1);
          } else {
            router.push("/");
          }
        }
      }
    }
    console.log(process.env.NEXT_PUBLIC_BASE_URL);

    if (token && user == "") {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/myself`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response?.data?.data);

          localStorage.setItem(
            "type",
            Boolean(response?.data?.data?.is_teacher) ? "teacher" : "student"
          );
          if (Boolean(response?.data?.data?.is_teacher)) {
            if (Boolean(response?.data?.data?.details?.custom_link_use_xcool)) {
              localStorage.setItem(
                "video_link",
                `/account/joinclassroom/${response?.data?.data?.name}-${response?.data?.data?.jm_uuid}`
              );
            } else {
              localStorage.setItem(
                "video_link",
                response?.data?.data?.details?.custom_link
              );
            }
          }
          localStorage.setItem("name", response?.data?.data?.firstname);
          localStorage.setItem("user_id", response?.data?.data?.id);
          localStorage.setItem("email", response?.data?.data?.email);
          localStorage.setItem("phone_no", response?.data?.data?.phone_no);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [router, loginState]);

  const [searchData, setSearchData] = useState([]);
  const [query, setQuery] = useState("");

  let debounceTimeout = React.useRef<any>(null);

  const handleChange = (e: any) => {
    setQuery(e.target.value);

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const data = await Repo.searchRequest({ q: query });
      setSearchData(data);
    }, 300);
  };

  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });

    setTeacherModalState({
      isOpen: !teacherModalState.isOpen,
      type: type,
    });
    setSuccessState({
      isOpen: !SuccessState.isOpen,
      type: type,
    });
    setLoginState({
      isOpen: !loginState.isOpen,
      type: type,
    });
    setforgotPassState({
      isOpen: !forgotPassState.isOpen,
      type: type,
    });
    setmodal1State({
      isOpen: !modal1State.isOpen,
      type: type,
    });
  }
  // console.log(searchResults, "searchResults");

  const [selected, setSelected] = useState();
  // const [query, setQuery] = useState("");

  const filtered =
    query === ""
      ? searchData
      : searchData?.filter((person: any) =>
          person?.course_name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const [course, setCourse] = React.useState<any>([]);
  const [genre, setGenre] = React.useState<any>([]);
  React.useEffect(() => {
    (async () => {
      const data = await Repo.getGenre();
      // const newListValues = data?.map((item: any) => item?.subcategory);
      setGenre(data);
    })();
  }, []);
  // console.log(genre, "genre");

  const [showmenu, setShowmenu] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState(false);
  // const [teachermenu,setTeacherMenu]=useState(false)
  const [showteachermenu, setShowteachermenu] = useState(false);
  const [shownotify, setShowNotify] = useState(false);

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

  const notificationHandler=async()=>{
    const data = await Repo.getMyNotifications();
    // const newListValues = data?.map((item: any) => item?.subcategory);
    setNotificationData(data);
  }

  useEffect(() => {
    notificationHandler()
  }, []);

  // },[])
  const [filterCourse, setFilterCourse] = useState([]);

  const handleMouseEnter = (id: any) => {
    const filteredData = course.filter((item: any) => item?.subcategory === id);

    setFilterCourse(filteredData);
  };
  const handleFilterCourse = (id: any) => {
    setShowSubmenu(true);

    const filteredData = course.filter((item: any) => item?.subcategory === id);

    setFilterCourse(filteredData);
  };

  console.log(showmenu, "activetab", showteachermenu, "teachermenu");

  useEffect(() => {
    console.log(router?.query?.register, "register");
    if (Boolean(router?.query?.register) == true) {
      modalHandler({ type: "register" });
    }
    if (Boolean(router?.query?.teacher_register) == true) {
      modalHandler({ type: "teacher_register" });
    }
  }, [router]);

  return (
    <nav className="w-full bg-white z-0 drop-shadow-xcool-orange">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:pl-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-6 md:block">
            <div className="flex ">
              <Link href="/">
                <Logo />
              </Link>

              <button
                aria-haspopup="true"
                aria-controls="menu"
                onClick={() => {
                  if (!showteachermenu) {
                    setShowmenu(!showmenu);
                    setShowSubmenu(false);
                  }
                }}
                className="outline-none relative focus:outline-none md:flex px-3 py-1 bg-white  text-base ms-4 rounded-sm hidden items-center min-w-32"
              >
                <span className="pr-1   flex-1">Learn</span>
              </button>
              {showmenu && (
                <div className=" font-semibold absolute top-14 left-28">
                  <div className=" flex flex-col justify-start bg-white border rounded-sm">
                    {genre?.map((i: any, index: any) => {
                      return (
                        <div className="flex justify-between" key={index}>
                          <button
                            className=" text-md p-1 text-start text-xcool-new-blue relative"
                            onClick={() => handleFilterCourse(i?.id)}
                            key={index}
                          >
                            {i?.slug}
                          </button>
                          {/* <AiOutlineArrowsAlt/> */}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {showSubmenu && (
                <div className="font-semibold absolute top-14 left-80 ">
                  <div className=" flex flex-col justify-start bg-white border rounded-sm">
                    {filterCourse?.map((i: any, index: any) => {
                      return (
                        <Link
                          className=" text-md p-1 text-start text-xcool-new-blue relative"
                          href={`/course/${i?.slug}`}
                          key={index}
                        >
                          {i?.slug}
                        </Link>
                      );
                    })}
                  </div>{" "}
                </div>
              )}

              {/* teacher nav item */}
              <MainDropdown
                showteachermenu={showteachermenu}
                setShowteachermenu={setShowteachermenu}
                showmenu={showmenu}
              />
              {/* <div className="group md:inline-block genre text-xcool-new-blue text-base ms-4 font-semibold ">
                <button
                  aria-haspopup="true"
                  aria-controls="menu"
                  className="outline-none focus:outline-none  px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
                >
                  <span className="pr-1 font-semibold flex-1">Learn</span>
                  <span>
                    <OpenArrow />
                  </span>
                </button>
                <ul
                  id="menu"
                  aria-hidden="true"
                  className="bg-white border rounded-sm transform scale-0 text-sm group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32 z-50"
                >
                  {genre?.map((i: any, index: any) => {
                    return (
                      <li
                        key={index}
                        className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                        onMouseEnter={() => handleMouseEnter(i?.id)}
                        onMouseLeave={handleMouseLeave}
                        // onClick={() =>
                        //   router.push(
                        //     `/learn/${i?.parentcategory?.slug}/${i?.slug}`
                        //   )
                        // }
                      >
                        <button
                          aria-haspopup="true"
                          aria-controls="menu-lang"
                          className="w-full text-left flex items-center outline-none focus:outline-none"
                        >
                          <span
                            className="pr-1 flex-1"
                            onClick={() =>
                              router.push(
                                `/learn/${i?.parentcategory?.slug}/${i?.slug}`
                              )
                            }
                          >
                            {i?.subcategory}
                          </span>
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
              <div className="group md:inline-block genre text-xcool-new-blue text-base ms-2 font-semibold  hidden">
                <button
                  aria-haspopup="true"
                  aria-controls="menu"
                  className="outline-none focus:outline-none  px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
                >
                  <span className="pr-1 font-semibold flex-1">
                    Our Teachers
                  </span>
                  <span>
                    <OpenArrow />
                  </span>
                </button>
                <ul
                  id="menu"
                  aria-hidden="true"
                  className="bg-white border rounded-sm transform scale-0 text-sm group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32 z-50"
                >
                  <li
                    className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                    
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={"/teacher"}
                      aria-haspopup="true"
                      aria-controls="menu-lang"
                      className="w-full text-left flex items-center outline-none focus:outline-none"
                    >
                      <span className="pr-1 flex-1">Music </span>
                     
                    </Link>

                  </li>
                  <li
                    className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
                   
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      aria-haspopup="true"
                      aria-controls="menu-lang"
                      className="w-full text-left flex items-center outline-none focus:outline-none"
                    >
                      <span className="pr-1 flex-1">Dance (Coming Soon)</span>
                    </button>

                 
                  </li>
                </ul>
              </div> */}

              <Combobox value={selected} onChange={setSelected}>
                <div className="relative md:ms-2 ms-4">
                  <div className="relative w-full cursor-default overflow-hidden   text-left  focus:outline-none sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none md:py-1 pl-3 pr-10 text-sm leading-5 rounded-xl  bg-slate-100 focus:outline-none"
                      // displayValue={(person:any) => person.course_name}
                      onChange={handleChange}
                      placeholder="Search for a skill, teacher.."
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <CiSearch className=" text-xcool-new-blue text-lg" />
                      {/* <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              /> */}
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {searchData?.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filtered?.map((person: any, index: any) => (
                          <Combobox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={person.course_name}
                          >
                            {({ selected, active }) => (
                              <>
                                <Link
                                  href={`course/${person?.slug}`}
                                  className={`block ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.course_name}
                                </Link>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  ></span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            <div className="md:hidden">
              {/* <div > */}
              {!auth && (
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? <CloseIcon /> : <OpenIcon />}
                </button>
              )}
              {/* {auth && (
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar src={`${user?.dp}`} sx={{ width: 32, height: 32 }} />
                </IconButton>
              )} */}
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              {
                auth && (
                  <div>
                  <button
                    aria-haspopup="true"
                    aria-controls="menu"
                    onClick={() => {
                      notificationHandler()
                      setShowNotify(!shownotify)
  
                      ;
                    }}
                    className="outline-none relative focus:outline-none md:flex px-3 py-1 bg-white text-base ms-4 rounded-sm hidden items-center min-w-32"
                  >
                    <span className="pr-1   flex-1">
                      {" "}
                      <AiFillBell />
                    </span>
                  </button>
                  {shownotify && (
                    <div className=" font-semibold absolute top-14">
                      <div className=" flex flex-col justify-start bg-white border rounded-sm relative z-50">
                        {notificationData?.length > 0 ? (
                          <>
                            {notificationData?.map((i: any, index: any) => {
                              return (
                                <div
                                  className=" text-base p-1 flex justify-between gap-4 text-start text-xcool-new-blue"
                                  key={index}
                                >
                                  <span>{i?.message}</span> <span className="mx-3">{moment(i?.created_at).format('DD-MM-YY')}</span>
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div className=" text-xs p-1 flex w-28 justify-between text-start text-xcool-new-blue">
                            No Data
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                )
              }
              {auth && AccountType == "teacher" && (
                <Link href={`${localStorage.getItem("video_link")}`}>
                  <li className="hover:bg-xcool-new-blue px-3 py-2 rounded-full  text-sm font-semibold text-xcool-new-blue border border-xcool-green hover:text-white">
                    Join Class{" "}
                  </li>
                </Link>
              )}

              {auth && AccountType == "teacher" && (
                <button onClick={() => modalHandler({ type: "UpdateLink" })}>
                  <li className="hover:bg-xcool-new-blue px-3 py-2 rounded-full text-sm font-semibold text-xcool-new-blue border border-xcool-green hover:text-white">
                    Update Class Link
                  </li>
                </button>
              )}
              {/* TODO: Notification feature */}
              {/* <li
                className="text-xcool-new-blue my-auto text-lg font-semibold pt-1"
                onClick={() =>
                  setmodalState({
                    isOpen: true,
                    type: "notify",
                  })
                }
              >
                <button>
                  <AiFillBell />
                </button>
              </li> */}
             
              <li className="text-xcool-new-blue my-auto text-sm font-semibold">
                <Link
                  href="https://api.whatsapp.com/send?phone=919730598200&text=Hi"
                  target="__blank"
                  className=" text-xl"
                >
                  <BsWhatsapp />
                </Link>
              </li>
              {!auth && (
                <li className=" text-sm" onClick={() => setNavbar(!navbar)}>
                  <button
                    onClick={() => modalHandler({ type: "teacher_register" })}
                  >
                    Become a Teacher
                  </button>
                </li>
              )}
              {/* {!auth && (
                <li className=" text-sm" onClick={() => setNavbar(!navbar)}>
                  <Link href="/book-free-demo">Book Free Demo</Link>
                </li>
              )} */}
              {!auth && (
                <li
                  className="text-black text-sm font-semibold"
                  onClick={() => setNavbar(!navbar)}
                >
                  <button
                    type="button"
                    onClick={() => modalHandler({ type: "login" })}
                    className=" text-xcool-new-blue border border-xcool-new-blue px-6 py-2 rounded-full text-sm font-semibold"
                  >
                    Login
                  </button>
                </li>
              )}
              {!auth && (
                <li className="text-white" onClick={() => setNavbar(!navbar)}>
                  <button
                    type="button"
                    onClick={() => modalHandler({ type: "register" })}
                    className=" bg-xcool-new-blue px-3 py-2 rounded-full text-sm font-semibold"
                  >
                    Register
                  </button>
                </li>
              )}
              {/* {auth && (
                <li className="text-xcool-new-blue  text-sm font-semibold">
                  <Link href={`/account/dashboard?tab=${activeTab}`}>
                    Dashboard
                  </Link>
                </li>
              )} */}

              {/* {auth && AccountType == "teacher" && (
                <li className="text-xcool-new-blue  text-sm font-semibold">
                  <Link href="/account/courses">Courses</Link>
                </li>
              )} */}
              {/* {auth && (
                <li className="text-xcool-new-blue  text-sm font-semibold">
                  <Link href="/account/chat">Chat</Link>
                </li>
              )} */}

              {/* {auth && (
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar src={`${user?.dp}`} sx={{ width: 32, height: 32 }} />
                </IconButton>
              )} */}
            </ul>
          </div>
        </div>
      </div>
      {modal1State.type === "UpdateLink" && (
        <AlertModal
          modalState={modal1State}
          title="Update class link:"
          content="URL:"
          closeModal={setmodal1State}
        />
      )}
      {modalState?.type === "notify" && (
        <ModalBase
          closeModal={setmodalState}
          modalState={{
            isOpen: true,
            type: null,
          }}
          title={"Coming Soon !"}
          className=""
        >
          <div></div>
        </ModalBase>
      )}

      {loginState.type === "login" && (
        <LoginModal
          loginState={loginState}
          setLoginState={setLoginState}
          setforgotPassState={setforgotPassState}
          setRegisterState={setmodalState}
        />
      )}
      {modalState.type === "register" && (
        <RegisterModal
          modalState={modalState}
          closeModal={setmodalState}
          setSuccessState={setSuccessState}
          setLoginState={setLoginState}
        />
      )}
      {teacherModalState.type === "teacher_register" && (
        <TeacherRegisterModal
          teacherModalState={teacherModalState}
          closeTeacherModal={setTeacherModalState}
          setSuccessState={setSuccessState}
          setLoginState={setLoginState}
        />
      )}
      {SuccessState.type === "success" && (
        <SuccessModal
          modalState={SuccessState}
          type="teacherRegister"
          closeModal={setSuccessState}
          setLoginState={setLoginState}
        />
      )}
      {forgotPassState.type === "forgot_pass" && (
        <ForgotPasswordModal
          forgotPassState={forgotPassState}
          setforgotPassState={setforgotPassState}
          setLoginState={setLoginState}
        />
      )}
      {/* <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
        >
          Hi {user?.firstname}
        </MenuItem>

        <Divider />
        <Link href="/account/profile">
          <MenuItem
            onClick={handleClose}
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            My Profile
          </MenuItem>
        </Link>
        {AccountType == "teacher" && (
          <Link href="/account/courses">
            <MenuItem
              onClick={handleClose}
              style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
            >
              Courses
            </MenuItem>
          </Link>
        )}
        <Link href="/account/dashboard?tab=0">
          <MenuItem
            onClick={handleClose}
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            Dashboard
          </MenuItem>
        </Link>
        {auth && AccountType == "teacher" && (
          <Link href={`/account/joinclassroom/${"0513JD6144"}`}>
            <MenuItem style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
              Join Class{" "}
            </MenuItem>
          </Link>
        )}
        {auth && AccountType == "teacher" && (
          <button onClick={() => modalHandler({ type: "UpdateLink" })}>
            <MenuItem style={{ paddingLeft: "3rem", paddingRight: "3rem" }}>
              {" "}
              Update Class Link
            </MenuItem>
          </button>
        )}

        <Link href="/account/chat">
          <MenuItem
            onClick={handleClose}
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            Chat
          </MenuItem>
        </Link>
        <Link href="/account/wallet">
          <MenuItem
            onClick={handleClose}
            style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
          >
            Purchase History
          </MenuItem>
        </Link>
     
        <Divider />
        <div
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("type");
            router.push("/");
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <HiOutlineLogout className=" text-lg" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      </Menu> */}
    </nav>
  );
}
