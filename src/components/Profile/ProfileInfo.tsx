import React from "react";

export const ProfileInfo = ({ setEditAccountInfo, user }: any) => {
  console.log(user, "user");
  return (
    <>
      <div className=" bg-white p-2 relative min-h-[200px] ">
        <p className=" text-lg md:text-xl font-bold mb-2 opacity-50">
          Account Information
        </p>
        <div className="overflow-y-auto max-h-[100px]">
        <div className="mb-2 flex flex-wrap text-sm">
          <p className=" font-semibold">Email Address :</p>
          <p>{user?.email}</p>
        </div>
        <div className="mb-2 flex flex-wrap text-sm">
          <p className=" font-semibold">Phone Number : </p>

          <p>{user?.phone_no}</p>
        </div>
        {/* </div> */}
        {/* <div className=" grid md:grid-cols-2 gap-3"> */}
        <div className="mb-2 flex flex-wrap text-sm ">
          <p className=" font-semibold">Full Name : </p>

          <p>{user?.firstname}</p>
        </div>
        <div className="text-sm">
          
        {user?.is_teacher ? (
          <>
            <p>
              {" "}
              <strong>Rate per hour (INR)</strong>:
              {user?.details?.rateph || "Not Available"}
            </p>
            <p>
              {" "}
              <strong>For international students (INR)</strong>:
              {user?.details?.usd_rateph || "Not Available"}
            </p>
          </>
        ) : (
          <></>
        )}
        {user?.is_teacher && user?.details?.bio !== null ? (
          <>
            <strong>Bio </strong>

            <p
              dangerouslySetInnerHTML={{
                __html: user?.details?.bio,
              }}
            ></p>
          </>
        ) : (
          <></>
        )}
        </div>
        </div>

        {setEditAccountInfo !== null && (
          <div className="my-5 absolute bottom-0">
            <a
              className="text-white  rounded-md bg-xcool-new-blue  px-6  py-2  cursor-pointer"
              onClick={() => setEditAccountInfo(true)}
            >
              Edit
            </a>
          </div>
        )}
      </div>
    </>
  );
};
