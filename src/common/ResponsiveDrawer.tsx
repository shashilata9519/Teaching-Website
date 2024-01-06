import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Home } from "@/modules/Home/Home";
import Link from "next/link";
import { Footer } from "@/components/Footer/Footer";
import Logo from "@/assets/logo";
import { useRouter } from "next/router";
import { TbMenu2 } from "react-icons/tb";
import { useAccountType } from "@/hooks/useAccountType";
import { AlertModal } from "./Modal/AlertModal";
import Navbar2 from "../components/NavBar/Navbar";
import axios from "axios";
import { Repo } from "@/services/Repo";
import OpenArrow from "@/assets/OpenArrow";
// import Dropdown from "@/components/NavBar/Dropdown";
import CloseArrow from "@/assets/CloseArrow";
import { useModal } from "@/context/ModalContext";
import { Avatar, Collapse } from "@mui/material";
import { MdExpandLess, MdExpandMore, MdStarBorder } from "react-icons/md";
import { ListItem } from "@mui/joy";
import { Dropdown } from "@/components/NavBar/Dropdown";

// import {
// 	CollectionsBookmark,
// 	Edit,
// 	Feedback,
// 	Help,
// 	PermMedia,
// 	UploadFile,
// 	Work,
// } from "@mui/icons-material";

const drawWidth = 220;

function App({ children }: any) {
  const router = useRouter();
  const select = 0;

  const { activeTab, setActiveTab, setlinkupdatemodal }: any = useModal();
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
  // const {AccountType}=useAccountType()
  const [auth, setAuth] = useState("");
  const [force, setForce] = useState(0);

  const [AccountType, SetAccountType] = React.useState<any>(null);

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };
  let [modalState, setmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  function modalHandler({ type }: any) {
    setmodalState({
      isOpen: !modalState.isOpen,
      type: type,
    });
  }
  const [filterCourse, setFilterCourse] = useState([]);

  const handleMouseEnter = (id: any) => {
    const filteredData = course.filter((item: any) => item?.subcategory === id);

    setFilterCourse(filteredData);
  };

  const handleMouseLeave = () => {
    setFilterCourse([]);
  };
  const [user, setUser] = useState<any>("");
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
    if (user) {
      const Type = localStorage.getItem("type");
      SetAccountType(Type ? Type : "");
      // console.log("Type effect", Type);
    }
  }, [user]);
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
  console.log("token 12", auth, AccountType);
  useEffect(() => {
    const token = localStorage.getItem("token");

    setAuth(token ? token : "");
    const protectedroutes = ["account"];
    if (protectedroutes.includes(router.pathname.split("/")[1])) {
      // console.log("check auth");

      if (!token || token == "") {
        if (modalState.isOpen == false) {
          setmodalState({
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
  }, [router, modalState]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [selectedTab, setselectedTab] = React.useState(null);

  const handleDropdownClick = (title: any) => {
    if (title == "Dashboard") {
      setDropdownOpen(!dropdownOpen);
      return;
    }

    if (title == "Update Class Link") {
      setlinkupdatemodal({ type: "UpdateLink", isOpen: true });

      return;
    }

    setselectedTab(title);
  };

  const responsiveDrawer = (
    <div style={{ backgroundColor: "#fff", height: "100%" }}>
      <Toolbar sx={{ px: "0%", mx: "0%" }}>
        <Avatar
          src={`${user?.dp}`}
          sx={{
            width: 32,
            height: 32,
            // marginLeft: "10px",
            marginRight: "5px",
          }}
        />
        <Typography
          sx={{
            textAlign: "center",
            pt: 1,
            display: "flex",

            color: "black",
            fontSize: 16,
          }}
        >
          Hi {localStorage.getItem("name")}
        </Typography>
      </Toolbar>
      <Divider />
      {/* <Link href="/">
                <Logo />
              </Link> */}

      <List sx={{ backgroundColor: "#fff" }}>
        {[
          {
            title: "My Profile",
            link: "/account/profile",
            type: ["teacher", "student"],
          },
          {
            title: "Batches",
            link: "/account/dashboards/batches",
            type: ["teacher"],
          },
          {
            title: "Applications",
            link: "/account/dashboards/application",
            type: ["teacher"],
          },
          {
            title: "My Courses",
            link: "/account/dashboards/application",
            type: ["student"],
          },
          {
            title: "Resources",
            link: "/account/dashboards/resources",
            type: ["teacher", "student"],
          },
          {
            title: "Request",
            link: "/account/dashboards/request",
            type: ["student"],
          },
          // {
          //   title: "Dashboard",
          //   type: ["teacher", "student"],
          //   link: "",
          //   subTitle: [
          //     {
          //       title: "Batches",
          //       link: "/account/dashboards/batches",
          //       type: ["teacher", "student"],
          //     },
          //     {
          //       title: "Applications",
          //       link: "/account/dashboards/application",
          //       type: ["teacher", "student"],
          //     },
          //     {
          //       title: "Resources",
          //       link: "/account/dashboards/resources",
          //       type: ["teacher", "student"],
          //     },
          //     {
          //       title: "Request",
          //       link: "/account/dashboards/request",
          //       type: ["student"],
          //     },
          //   ],
          // },
          {
            title: "Courses",
            link: "/account/courses",
            type: ["teacher"],
          },
          {
            title: "Invoice",
            link: "/account/invoice",
            type: ["teacher"],
          },
          {
            title: "Join Class",
            link: `${localStorage.getItem("video_link")}`,
            type: ["teacher"],
          },
          {
            title: "Update Class Link",
            link: "/",
            type: ["teacher"],
          },
          {
            title: "Chat",
            link: "/account/chat",
            type: ["teacher", "student"],
          },
          // {
          //   title: "Purchase History",
          //   link: "/account/wallet",
          //   type: ["student"],
          // },
          {
            title: "Transactions",
            link: "/account/wallet",
            type: ["teacher"],
          },
        ].map((item, index) => {
          return (
            item?.type?.includes(AccountType) && (
              // <Link href={item?.link}>
              <>
                <Link href={item?.link}>
                  <ListItemButton
                    sx={{
                      
                      color:  "black",
                      backgroundColor:
                        selectedTab == item?.title ? "#2A87BB" : null,
                        margin:'10px'
                    }}
                    onClick={() => handleDropdownClick(item?.title)}
                  >
                    {/* <ListItemIcon sx={{ color: "white" }}>help</ListItemIcon> */}
                    <ListItemText primary={item?.title}  />
                  
                    {/* {index === 1 && (
                      <>{dropdownOpen ? <MdExpandLess /> : <MdExpandMore />}</>
                    )} */}
                  </ListItemButton>
                </Link>
                {/* <List component="div" disablePadding sx={{ color: "white" }}>
                  <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                    {item?.subTitle?.map((i) => {
                      return (
                        i?.type?.includes(AccountType) && (
                          <Link href={i?.link}>
                            <ListItemButton
                              onClick={() => handleDropdownClick(i?.title)}
                              sx={{
                                pl: 4,
                                backgroundColor:
                                  selectedTab == i?.title
                                    ? "rgb(19, 134, 149)"
                                    : null,
                              }}
                            >
                              <ListItemText primary={i?.title} />
                            </ListItemButton>
                          </Link>
                        )
                      );
                    })}
                  </Collapse>
                </List> */}
              </>
            )
          );
        })}
      </List>
      <Divider />

      <Typography
        sx={{
          backgroundColor: "#2A87BB",
          color: "white",
          borderRadius: 5,
          textAlign: "center",
          padding: 1,
          margin: 2,
          cursor: "pointer",
          fontSize: "12px",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("type");
          router.push("/");
          setTimeout(() => {
            window.location.reload();
          }, 300);
        }}
      >
        Logout
      </Typography>
    </div>
  );

  return (
    <div>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="absolute"
            sx={{
              zIndex: "1",
              width: { sm: `calc(100% - ${drawWidth}px)` },
              right: { sm: `${drawWidth}px` },
              left: 0,
              color: "black",
              backgroundColor: "white",
            }}
          >
            <Toolbar>
              {/* <Typography variant="h6"> */}
              {/* <Link href="/">
                  <Logo />
                </Link> */}
              <Navbar2 />
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleToggle}
                sx={{ display: { sm: "none" } }}
              >
                <TbMenu2 />
              </IconButton>
              {/* </Typography> */}
            </Toolbar>
          </AppBar>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              // p: 3,
              width: { sm: `calc(100% - ${drawWidth}px)` },
            }}
          >
            <Toolbar />
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
                      <span className="pr-1 flex-1">Music </span>
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
                        Dance  (Coming Soon)
                      </span>
                      <span className="mr-auto">{/* <CloseArrow /> */}</span>
                    </button>

                    {/* <Dropdown filterCourse={filterCourse} /> */}
                  </li>
                </ul>
              </div>
            </div>
            <Typography paragraph className="min-h-[70vh] mx-auto">
              {children}
            </Typography>
            <Footer />
          </Box>
          <Box
            component="nav"
            sx={{ width: { sm: drawWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              anchor="right"
              variant={"temporary"}
              open={mobileViewOpen}
              onClose={handleToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawWidth,
                },
              }}
            >
              {responsiveDrawer}
            </Drawer>
            <Drawer
              anchor="right"
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawWidth,
                },
              }}
              open
            >
              {responsiveDrawer}
            </Drawer>
          </Box>
        </Box>
      </div>

      {modalState.type === "UpdateLink" && (
        <AlertModal
          modalState={modalState}
          title="Update class link:"
          content="URL:"
          closeModal={setmodalState}
        />
      )}
    </div>
  );
}

export default App;
