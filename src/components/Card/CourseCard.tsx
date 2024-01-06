import { Repo } from "@/services/Repo";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

interface PropsType {
  title: string;
  image: string;
  slug: any;
  link: any;
  type: any;
  level: any;
  active: Boolean;
  teacher: any;
  designBy: any;
  myCourses: any;
  setIsRefresh: any;
}

export const CourseCard = ({
  title,
  image,
  slug,
  link,
  type,
  level,
  active,
  teacher,
  designBy,
  myCourses,
  setIsRefresh,
}: PropsType) => {
  const teacherImage = teacher?.splice(0, 3);
  const count = teacher?.length;
  // console.log(myCourses?.is_active, "myCourses?.is_active");

  // TODO: call api and show toast
  const addCourse = async () => {
    //call Api
    // console.log("hi 12345");
    await Repo.AddCourseAPI(myCourses?.id);
    toast.success("Course Added successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setIsRefresh(true);
  };
  const activateCourseHandler = async (id: any) => {
    // console.log(id, "activate");
    await Repo.ActivateCourse(id);
    toast.success("Updated successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
    setIsRefresh(true);

  };

  return (
    <Link href={link}>
      <div className="course-card">
        <div
          className=" rounded-3xl h-52 relative"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url("${image}")`,
            backgroundSize: "100%",
          }}
        >
          <div className="absolute bottom-0 flex px-3 py-4 items-center">
            <div className="text-white text-xs px-3">Music</div>
            {level === 1 && (
              <div className="text-white text-xs px-3 bg-xcool-new-blue rounded-full">
                Beginner
              </div>
            )}
            {level === 2 && (
              <div className="text-white text-xs px-3 bg-[#fa9b05] rounded-full">
                Intermediate
              </div>
            )}
            {level === 3 && (
              <div className="text-white text-xs px-3 bg-[#ca2c1b] rounded-full">
                Advanced
              </div>
            )}
          </div>
        </div>
        <div className="mt-7 mb-3 font-bold">
          <span>{title}</span>
        </div>
        {teacher?.length !== undefined && (
          <div className="flex flex-wrap">
            <div className="offered-by  text-sm font-bold">Offered By</div>
            <div className="offered-by-panel px-2 text-sm flex items-center text-xcool-new-blue">
              <div className="flex flex-wrap px-2 items-center relative">
                {teacher?.length ? (
                  <>
                    {teacherImage &&
                      teacherImage?.map((item: any) => {
                        return (
                          <img
                            key={item?.id}
                            src={item?.teacher?.dp}
                            className=" rounded-full w-7 h-7 border border-black"
                            style={{ marginLeft: "-8px" }}
                          />
                        );
                      })}
                  </>
                ) : (
                  <p>Not available</p>
                )}

                <div className="ml-2">{count > 3 ? count : ""}</div>
              </div>
            </div>
          </div>
        )}

        {active && (
          <div className="text-center flex flex-col">
            <p className=" opacity-50 text-sm mb-3">Designed by {designBy}</p>
            <div className="my-3 text-center">
              <Link
                href="/account/course"
                className="text-white rounded-sm bg-xcool-new-blue px-3  py-2"
              >
                View
              </Link>
            </div>
            <div>
            <button
              className=" text-center text-sm mb-3"
              onClick={() => activateCourseHandler(myCourses?.id)}
            >
              {myCourses?.is_active == 1 ? "Archive (Hide)" : "Make Active"}
            </button>
            </div>


            {/* <button
              className=" text-center text-sm mb-3"
              onClick={() => activateCourseHandler(myCourses?.id)}
            >
              {myCourses?.is_active == 1 ? "Archive (Hide)" : "Make Active"}
            </button>

            {/* <button className=" text-center text-red-600 text-sm mb-3"  onClick={() => alert("updated successfully")}>
              Remove (Permanent)
            </button> */}
          </div>
        )}
        {type == "addCourse" && (
          <div className=" flex justify-between">
            <button
              onClick={() => addCourse()}
              className="border rounded-full px-2 py-1 border-xcool-green text-xcool-new-blue hover:text-white hover:bg-xcool-new-blue"
            >
              + Add
            </button>
            <Link
              href={`/course/${slug}`}
              className="border rounded-full px-2 py-1 border-xcool-green text-xcool-new-blue hover:text-white hover:bg-xcool-new-blue"
            >
              View Detail
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </Link>
  );
};
