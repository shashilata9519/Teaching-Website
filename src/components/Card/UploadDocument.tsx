import { UploadDataModal } from "@/common/Modal/UploadDataModal";
import { Repo } from "@/services/Repo";
import React, { useEffect, useState } from "react";
import { GetAttachment } from "./GetAttachment";
import { Skeleton } from "@mui/material";

export const UploadDocument = () => {
  let [uploadmodalState, setuploadmodalState] = useState<any>({
    isOpen: false,
    type: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [resourse, setResourse] = useState<any>([]);
  const [isRefresh, setRefresh] = useState<any>(false);

  function modalHandler({ type }: any) {
    setuploadmodalState({
      isOpen: !uploadmodalState.isOpen,
      type: type,
    });
  }
  console.log(resourse, "resourse");
  useEffect(() => {
    (async () => {
      const data = await Repo.getResourse();
      setResourse(data);
      setIsLoading(false);
      setRefresh(false);
    })();
  }, [isRefresh]);

  return (
    <>
      <div className="flex gap-1 justify-end">
        <div
          onClick={() => modalHandler({ type: "upload" })}
          className="border border-xcool-green cursor-pointer text-xcool-new-blue hover:bg-xcool-new-blue hover:text-white  w-fit rounded-full px-4"
        >
          Upload Document
        </div>
      </div>
      <div>
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              height={100}
              className=" rounded-3xl mb-3"
            />
          </>
        ) : (
          <>
            {resourse?.length > 0 ? (
              resourse?.map((i: any, index: any) => {
                return (
                  <GetAttachment data={i} key={index} setRefresh={setRefresh} />
                );
              })
            ) : (
              <div className=" text-2xl mt-4 ">No Resource available</div>
            )}
          </>
        )}
      </div>

      {uploadmodalState.type === "upload" && (
        <UploadDataModal
          modalState={uploadmodalState}
          closeModal={setuploadmodalState}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};
