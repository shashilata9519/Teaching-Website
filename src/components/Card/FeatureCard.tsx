import Link from "next/link";

export const FeatureCard = ({ courseName, img, slug, NoOfteacher,teacherImage, level }: any) => {
 


  return (
    <Link href={`/course/${slug}`}>
      <div className="flex flex-col p-3 bg-white rounded-xl h-max">
        <div className="flex ">
          <div
            className="mr-2"
            style={{
              minWidth: 100,
              borderRadius: 10,
              height: 100,
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${img})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="flex flex-col justify-between">
            <div className="course-title text-lg font-bold">
              <span>{courseName}</span>
            </div>
            <div>
              <div className="flex flex-wrap">
                <div className="offered-by  text-sm font-bold">Offered By</div>
                <div className="offered-by-panel px-2 text-sm flex items-center text-xcool-new-blue">
                  <div className="flex flex-wrap px-2 items-center relative">
                    {teacherImage?.length ? (
                      <>
                        {teacherImage &&
                          teacherImage?.map((item: any) => {
                            // console.log(item,'item1')
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

                    <div className="ml-2">{NoOfteacher > 3 ? NoOfteacher : ""}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="image-footer flex mt-2 items-center">
          <div className="category">Music</div>
          <div className="  mx-2 my-1">
            {level === "Beginner" && (
              <div className="text-white text-xs px-3 bg-xcool-new-blue rounded-full">
                Beginner
              </div>
            )}
            {level === "Intermediate" && (
              <div className="text-white text-xs px-3 bg-[#fa9b05] rounded-full">
                Intermediate
              </div>
            )}
            {level === "Advanced" && (
              <div className="text-white text-xs px-3 bg-[#ca2c1b] rounded-full">
                Advanced
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
