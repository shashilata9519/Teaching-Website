import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { OurTeacherCard } from "@/components/Card/OurTeacherCard";
import { Header } from "@/common/Text/Header";
import { OurTeacherFilter } from "@/components/Form/OurTeacherFilter";
import { FiFilter } from "react-icons/fi";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { Repo } from "@/services/Repo";
import { ModalBase } from "@/common/Modal/ModalBase";
import { useModal } from "@/context/ModalContext";
import { Skeleton } from "@mui/material";
export default () => {
  const [teachers, setTeachers] = useState<any>([]);
  const [showFilter, setShowFilter] = useState<any>(false);
  const [filteredData, setfilteredData] = useState<any>([]);
  const [priceRange, setPriceRange] = useState<any>([0, 5000]);
  const [videoLink, setVideoLink] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState<any>({
    keyword: "",
    genre: "",
    level: "",
    city: null,
    cert_id: "",
    sortby: "",
    gender: "",
    price: "",
  });

  const { setModalData }: any = useModal();

  useEffect(() => {
    setModalData({
      Courses: "",
      Fees: "",
      Genre: "",
      Teachers: "",
      Timeslot: "",
    });
  }, []);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllTeachersWF`, {
        genre: filterCategory?.genre,
      })
      .then((response) => {
        setTeachers(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filterCategory?.genre]);

  useEffect(() => {
    filterData({ ...filterCategory, price: priceRange });
  }, [filterCategory, priceRange, teachers]);

  const filterData: any = (filterCategory: any) => {
    const filteredData: any = teachers.filter((item: any) => {
      return Object.entries(filterCategory).every(([property, values]: any) => {
        // console.log(property, values, "property property");
        if (values === "" || values === null) return true;

        if (property === "keyword") {
          return (
            item.firstname
              .toLowerCase()
              .includes(filterCategory.keyword.toLowerCase()) ||
            item.city
              .toLowerCase()
              .includes(filterCategory.keyword.toLowerCase())
          );
        }

        if (property === "cert_id") {
          return (
            item.degrees &&
            item.degrees.some((degree: any) => degree.cert_id.includes(values))
          );
        }
        if (property === "price") {
          return (
            item.details &&
            item.details.rateph <= values[1] &&
            item.details.rateph > values[0]
          );
        }
        if (property === "genre") {
          return true;
        }

        return item[property] == values;
      });
    });
    console.log(filteredData, "filteredData");
    setfilteredData([...filteredData]);
    // setIsLoading(false);
  };

  // console.log(teachers, "teachers");
  useEffect(() => {
    if (filterCategory.sortby === "") return;
    if (filterCategory.sortby === "A to Z") {
      const dd = (filteredData.length ? filteredData : teachers).sort(
        (a: any, b: any) => a.firstname.localeCompare(b.firstname)
      );
      setfilteredData([...dd]);
    } else {
      const dd = (filteredData.length ? filteredData : teachers).sort(
        (a: any, b: any) => b.firstname.localeCompare(a.firstname)
      );
      setfilteredData([...dd]);
    }
  }, [filterCategory.sortby]);
  // console.log(filteredData, " filteredData2");

  return (
    <div className="container mx-auto">
      <Head>
        <title>Our Teachers</title>
      </Head>
      <div className="my-8 ms-3">
        <Breadcrumb category={"teacher"} />
        {/* <Header title="Our Teachers" /> */}
      </div>
      <div className="w-full grid  xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 mt-4 gap-4">
        <div className="block fixed bottom-3 right-3 md:hidden text-center z-50">
          <button
            className=" border bg-xcool-new-blue rounded flex text-white items-center mx-auto px-4 py-1 "
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close filter" : " filter"} <FiFilter />
          </button>
        </div>
        <div
          className={` relative ${showFilter ? "block" : "hidden"}  md:block`}
        >
          <div className=" md:sticky top-0">
            <OurTeacherFilter
              teachers={teachers}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>

        <div className="lg:col-span-4 xl:col-span-4  grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-3">
          {isLoading ? (
            <>
              <Skeleton
                variant="rectangular"
                width={320}
                height={180}
                className=" rounded-3xl"
              />
              <Skeleton
                variant="rectangular"
                width={320}
                height={180}
                className=" rounded-3xl"
              />
              <Skeleton
                variant="rectangular"
                width={320}
                height={180}
                className=" rounded-3xl"
              />
            </>
          ) : filteredData.length > 0 ? (
            filteredData?.map((item: any) => {
              // console.log(item?.slug,'item?.slug')
              return (
                <OurTeacherCard
                  getVideoUrl={(url: any) => {
                    if (!url) {
                      alert("video Link is not found!");
                    }
                    setVideoLink(url);
                  }}
                  key={item?.id}
                  priceIN={item?.details?.rateph}
                  priceUSD={item?.details?.usd_rateph}
                  firstname={item?.firstname}
                  dp={item?.dp}
                  teacherSlug={item?.slug}
                  para={item?.details?.bio}
                  item={item}
                  courseSlug={""}
                  courseName={""}
                  catSlug={""}
                  loading={false}
                />
              );
            })
          ) : (
            <div className="text-lg">
              No teachers found matching your criteria.
            </div>
          )}
        </div>
        {/* {filteredData.length > 0 ? (
          <div className="lg:col-span-4 xl:col-span-4  grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-5">
            {filteredData?.map((item: any) => {
              return (
                <OurTeacherCard
                  getVideoUrl={(url: any) => {
                    if (!url) {
                      alert("video Link is not found!");
                    }
                    setVideoLink(url);
                  }}
                  key={item?.id}
                  priceIN={item?.details?.rateph}
                  priceUSD={item?.details?.usd_rateph}
                  firstname={item?.firstname}
                  dp={item?.dp}
                  teacherSlug={item?.slug}
                  para={item?.details?.bio}
                  item={item}
                  courseSlug={""}
                  courseName={""}
                />
              );
            })}
          </div>
        ) : (
          <div className=" text-lg">No data found</div>
        )} */}
      </div>

      {videoLink?.length > 0 && (
        <ModalBase
          className="items-center"
          closeModal={() => setVideoLink("")}
          modalState={{
            isOpen: true,
            type: null,
          }}
        >
          <video width="500" height="500" autoPlay controls>
            <source src={videoLink} type="video/mp4" />
          </video>
        </ModalBase>
      )}
    </div>
  );
};
