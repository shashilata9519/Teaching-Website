import { Home } from "@/modules/Home/Home";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

import { CourseBanner } from "@/components/Banner/CourseBanner";
import { FeatureCard } from "@/components/Card/FeatureCard";
import { Filter } from "@/components/Form/Filter";
import { FiFilter } from "react-icons/fi";
import { CourseCardv2 } from "@/components/Card/CourseCardv2";
import { GlobalBreadcrumb } from "@/common/breadCrumb/GlobalBreadcrumb";
import { useModal } from "@/context/ModalContext";
import { Skeleton } from "@mui/material";

export default () => {
  const [teachers, setTeachers] = useState<any>([]);

  const router = useRouter();
  const [filterCriteria, setfilterCriteria] = useState<any>({
    level: "",
    age_group: "",
    certification: "",
  });
  const slug = router?.query?.genre;
  // console.log(router,'slug')
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const { isModalOpen, setModalOpen, setModalData, modalData }: any =
    useModal();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCoursesByGenrev2/${slug}`
      )
      .then((response) => {
        // console.log(response?.data?.data)

        setTeachers(response?.data?.data);
        setLoading(false);
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

  // useEffect(() => {
  //   filterData(checkedItems);
  // }, [checkedItems]);

  // const filterData: any = (checkedItems: any) => {

  //   const filteredData: any = teachers.filter((item: any) => {
  //     return Object.entries(checkedItems).every(([property, values]: any) => {
  //       if (!values) return true;
  //       // console.log(values[item[property]],'values[item[property]]')
  //       return values[item[property]];
  //     });
  //   });

  //   setfilteredData([...filteredData]);
  // };
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
          genre={slug}
        />
        {/* <div className="block md:hidden text-center fixed bottom-3 right-3 z-50 my-5">
          <button
            className=" border  bg-xcool-new-blue rounded flex text-white  items-center mx-auto px-4 py-1"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close filter" : " filter"} <FiFilter />
          </button>
        </div> */}
        <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 my-5  gap-4 relative">
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
                {filterTeachers?.length > 0 ? (
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
      </div>
    </>
  );
};
