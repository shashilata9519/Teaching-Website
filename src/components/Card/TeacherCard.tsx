import Link from "next/link";

interface PropsType {
  teacherName: string;
  intro: string;
  courses: string;
  image: string;
  slug: string;
}
export const TeacherCard = ({
  teacherName,
  intro,
  courses,
  image,
  slug,
}: PropsType) => {
  return (
    <div className="bg-white px-2 py-4 md:p-4 w-full min-h-full rounded-sm flex flex-col">
      <div className="flex">
        <div className="w-1/4">
          <div className="p-4">
            <img
              src={`${image}`}
              width=""
              className="rounded-full aspect-square"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-3/4 flex-col">
          <h2 className=" text-2xl font-bold  flex-grow-0 text-black flex-none my-1">
            {teacherName}
          </h2>
          <div className="text-sm text=[#000000] flex-none my-1 flex-grow-0">
            <h6>{intro}</h6>
          </div>

          {/* <div className="hidden lg:block ">
            <h4 className=" text-sm text-[#000000] font-bold mt-6">
              Courses Offered
            </h4>
            <h4 className=" text-[#fa9b05] font-bold text-sm">{courses}</h4>
          </div> */}
          {/* <div className=" mt-6 hidden lg:block">
            <Link
              href={`/teacher/${slug}`}
              className="text-white bg-black py-2 px-5 text-sm font-bold rounded-full"
            >
              View Profile
            </Link>
          </div> */}
        </div>
      </div>
      <hr className=" mt-4" />

      <div className="">
        <div className=" mt-6 flex justify-between align-items-center">
          <p className=" text-sm text-[#000000] font-bold">
            Courses Offered
          </p>
          <Link href={`/teacher/${slug}`}>
            <p className="text-white bg-xcool-new-blue-dark text-base px-3 py-1 rounded-sm">
              {" "}
              View Profile
            </p>
          </Link>
        </div>
        <p className=" text-sm mt-3">{courses}</p>
      </div>
    </div>
  );
};
