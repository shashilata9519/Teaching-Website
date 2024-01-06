import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { OurTeacherCard } from "@/components/Card/OurTeacherCard";
import { CourseBanner } from "@/components/Banner/CourseBanner";
import { Filter } from "@/components/Form/Filter";
import { FeatureCard } from "@/components/Card/FeatureCard";
import { FiFilter } from "react-icons/fi";
import { CourseCardv2 } from "@/components/Card/CourseCardv2";
import { Breadcrumb } from "@/common/breadCrumb/Breadcrumb";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import { useModal } from "@/context/ModalContext";
import { Skeleton } from "@mui/material";

const Index = () => {
  const [teachers, setTeachers] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const router = useRouter();
  const slug = router?.query?.category;
  const [loading, setLoading] = useState(true);
  const [loadingSubCat, setLoadingSubCat] = useState(true);

  const { isModalOpen, setModalOpen, setModalData, modalData }: any =
    useModal();
  const [filterCriteria, setfilterCriteria] = useState<any>({
    level: "",
    age_group: "",
    certification: "",
  });

  const [filter, setfilter] = useState<any>({
    category: null,
    subcategory: null,
  });
  // console.log(filter, "filter");

  useEffect(() => {
    setfilter({ category: slug, subcategory: null });
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSubCatfromCat/${slug}`)
      .then((response) => {
        setsubCategory(response?.data?.data);
        setLoadingSubCat(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllCourses`, filter)
      .then((response) => {
        setTeachers(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filter]);

  const [filteredData, setfilteredData] = useState<any>([]);

  const [showFilter, setShowFilter] = useState(false);

  // console.log(teachers, "teachers courses");

  const [checkedItems, setCheckedItems] = useState<any>({});

  // const handleCheckboxChange = (property: any, value: any) => {
  //   setCheckedItems((prevCheckedItems: any) => ({
  //     ...prevCheckedItems,
  //     [property]: {
  //       ...prevCheckedItems[property],
  //       [value]: !prevCheckedItems[property]?.[value],
  //     },
  //   }));
  // };

  useEffect(() => {
    filterData(checkedItems);
  }, [checkedItems, teachers]);

  const filterData: any = (checkedItems: any) => {
    // console.log(checkedItems, "gg");
    const filteredData: any = teachers.filter((item: any) => {
      return Object.entries(checkedItems).every(([property, values]: any) => {
        if (!values) return true;
        return values[item[property]];
      });
    });

    setfilteredData([...filteredData]);
  };
  // const resetForm = (e: any) => {
  //   e.preventDefault();
  //   setCheckedItems({});
  // };
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCoursesByGenrev2/${slug}`
      )
      .then((response) => {
        // console.log(response?.data?.data)

        setTeachers(response?.data?.data);
        // setfilteredData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  const handleCheckboxChange = (property: any, value: any) => {
    value = ["Beginner", "Intermediate", "Advanced"].includes(value)
      ? ["Beginner", "Intermediate", "Advanced"].indexOf(value) + 1
      : value;
    setfilterCriteria({ ...filterCriteria, [property]: value });

    // setCheckedItems((prevCheckedItems: any) => ({
    //   ...prevCheckedItems,
    //   [property]: {
    //     ...prevCheckedItems[property],
    //     [value]: !prevCheckedItems[property]?.[value],
    //   },
    // }));
  };
  const resetForm = (e: any) => {
    e.preventDefault();
    setfilterCriteria({
      level: "",
      age_group: "",
      certification: "",
    });
  };

  const filterTeachers = teachers.filter((item: any) => {
    for (const key in filterCriteria) {
      if (filterCriteria[key] && item[key] !== filterCriteria[key]) {
        return false;
      }
    }

    return true;
  });
  // console.log(subCategory, "subCategory2");
  return (
    <>
      <Head>
        <title>{slug}</title>
      </Head>
      <div className="lg:p-11">
        <GlobalBreadcrumb category={router?.query?.category} />
        <CourseBanner
          courseName={slug}
          category={router?.query?.category}
          hideBread={true}
        />
        <div className="flex  text-gray-600 md:w-full w-full flex-wrap gap-1 py-1 mb-3">
          {
            loadingSubCat? (
              <>
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={50}
                  // className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={50}
                  // className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={50}
                  // className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={50}
                  // className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={50}
                  // className="rounded-3xl"
                />
              </>
            ):(
              <>
              {subCategory?.map((item: any) => (
            <>
              <Link
                key={item?.id}
                href={`/learn/${filter?.category}/${item?.slug}`}
                className="border cursor-pointer bg-white rounded-md p-3 mt-2 font-bold"
              >
                {item?.subcategory}
              </Link>
              {/* <div
                key={item?.id}
                onClick={() =>
                  setfilter({ ...filter, subcategory: item?.slug })
                }
                className="border cursor-pointer text-xcool-new-blue bg-gray-300 rounded-lg px-4 hover:text-white"
              >
                {item?.subcategory}
              </div> */}
            </>
          ))}
              
              </>
            )
          }
          
        </div>
        <div className="block md:hidden text-center fixed bottom-3 right-3 z-50 my-5">
          <button
            className=" border  bg-xcool-new-blue rounded flex text-white  items-center mx-auto px-4 py-1"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close filter" : " filter"} <FiFilter />
          </button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-5  gap-4">
          <div
            className={` w-full ${showFilter ? "block" : "hidden"}  md:block`}
          >
            <div className="md:sticky top-0">
              <Filter
                checkedItems={filterCriteria}
                handleCheckbox={(a: any, b: any) => handleCheckboxChange(a, b)}
                resetForm={resetForm}
              />
            </div>
          </div>
          <div className=" md:col-span-3 grid lg:grid-cols-3 md:grid-cols-2 w-full gap-5 h-fit">
            {loading ? (
              // Render the Skeleton component while data is loading
              <>
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={130}
                  className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={130}
                  className="rounded-3xl"
                />
                <Skeleton
                  variant="rectangular"
                  width={280}
                  height={130}
                  className="rounded-3xl"
                />
              </>
            ) : (
              <>
                {filterTeachers.length > 0 ? (
                  <>
                    {filterTeachers?.map((item: any) => {
                      return (
                        <CourseCardv2
                          key={item?.id}
                          courseName={item?.course_name}
                          slug={item?.slug}
                          img={item?.img}
                          cat={"Music"}
                          NoOfteacher={item?.teachers_count}
                          teacherImage={item?.image}
                          level={item?.level}
                          summary={item?.summary}
                          showTeacher={false}
                          item={item}
                          filter={modalData?.filter}
                          link={`/course/${item?.slug}`}
                          genreSlug={item?.subcat?.slug}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div className=" text-center text-xl mt-6">
                    no data found{" "}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {/* <div className="block md:hidden text-center my-5">
          <button
            className=" border border-xcool-green rounded flex text-xcool-new-blue items-center mx-auto px-4 py-1"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close filter" : " filter"} <FiFilter />
          </button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-5  gap-4">
          <div
            className={` w-full ${showFilter ? "block" : "hidden"}  md:block col-span-1`}
          >
            <Filter
              checkedItems={checkedItems}
              handleCheckbox={(a: any, b: any) => handleCheckboxChange(a, b)}
              resetForm={resetForm}
            />
          </div>
          <div className="col-span-3 grid lg:grid-cols-3 md:grid-cols-2 gap-5 h-fit">
            {(filteredData.length ? filteredData : teachers)?.map(
              (item: any) => {
                return (
                  <CourseCardv2
                    key={item?.id}
                    courseName={item?.course_name}
                    slug={item?.slug}
                    img={item?.img}
                    cat={router?.query?.category}
                    NoOfteacher={item?.teachers_count}
                    teacherImage={item?.image}
                    level={item?.level}
                    summary={item?.summary}
                    showTeacher={true}
                    link={item?.slug}
                    filter={modalData?.filter}
                    item={item}
                  />
                );
              }
            )}
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Index;
