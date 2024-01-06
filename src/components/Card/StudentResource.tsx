import { Repo } from "@/services/Repo";
import React, { useEffect, useState } from "react";
import { GetAttachment } from "./GetAttachment";
import { Skeleton } from "@mui/material";

export const StudentResource = () => {
  const [data, setData] = useState<any>([]);
  const [isRefresh, setRefresh] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await Repo.studentResource();

      setData(data);
      setRefresh(false)
      setIsLoading(false);
    })();
  }, [isRefresh]);
  return (
    <div>
      <div>
        {/* {data} */}
        {
          isLoading?(
            <>
            <Skeleton
              variant="rectangular"
              height={100}
              className=" rounded-3xl mb-3"
            />
          </>
          ):(
            <>
            {data?.length > 0 ? (
              <>
                {data.map((item: any, index: any) => (
                  <div
                    className="bg-white my-10 rounded-3xl py-3 px-4 border "
                    key={index}
                  >
                    <div><span className=" font-semibold">Teacher:</span> {item?.firstname}</div>
    
                    <div>
                    <span className=" font-semibold">   Resource:</span>
                   
                      {item?.resource?.length > 0 ? (
                        <>
                          {item?.resource?.map((item: any, index: any) => (
                            <GetAttachment data={item} key={index} setRefresh={setRefresh} />
                          ))}
                        </>
                      ) : (
                        <span> None provided by the teacher</span>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className=" text-2xl mt-4 ">No requested data</div>
            )}
            </>

          )
        }
      
      </div>
    </div>
  );
};
