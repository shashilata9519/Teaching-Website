import { ModalBase } from "./ModalBase";

import { useRouter } from "next/router";
import Link from "next/link";
import { useRef, useState } from "react";
import { TextField } from "@mui/material";
import { AiOutlineCamera } from "react-icons/ai";
import Upload from "@/assets/Upload";
import { Repo } from "@/services/Repo";
import { ToastContainer, toast } from "react-toastify";

export const UploadDataModal = ({
  isOpen,
  closeModal,
  modalState,
  setRefresh,
  setUploadData
}: any) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [shareLink, setshareLink] = useState("");
  const [documentName, setdocumentName] = useState("");

  const handleFileChange = (event: any) => {
    const files = event.target.files; // Get the selected files from the input element
    const allowedTypes = [
      "video/mp4",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    // Process the selected files
    const updatedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if the file type is allowed
      if (allowedTypes.includes(file.type)) {
        // Perform your desired operations with the file here
        console.log("Uploading file:", file.name);
        if (file.size < 50 * 1024 * 1024) {
          setFileSizeError(false);
          updatedFiles.push(file);
        } else {
          setFileSizeError(true);
        }
      } else {
        // Handle invalid file types
        console.log("Invalid file type:", file.name);
      }
    }

    // Update the selected files state
    setSelectedFile(updatedFiles);
    // setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e: any) => {
    // Logic to upload the file goes here

    const temp: any = {};
    let fdata = new FormData();

   
    if (modalState.type !== "uploadVideo") {
      fdata.append("type", "resource");
      if (selectedFile.length > 0) {
        // temp["degreeDocument"] = selectedFile[0];
        // temp["university"] = "selectedFile[0].type";
        fdata.append("name", documentName);
        fdata.append("pre_name", "file");

        fdata.append("degreeDocument", selectedFile[0]);
        // console.log(selectedFile[0].type, ",selectedFile[0].type");
        fdata.append("university", selectedFile[0].type);
      }
      if (shareLink.length) {
        fdata.append("name", documentName);
        // temp["details"] = "details";
        fdata.append("pre_name", "link");
        fdata.append("details", shareLink);
      }
    } else {
      fdata.append("type", "videofeature");
      fdata.append("name", 'videoFeature');
      fdata.append("degreeDocument", selectedFile[0]);
      console.log(selectedFile, "selectedFile");
     
    }
    // console.log(temp, "temp");
   const res= await Repo.addMeta(fdata);
  if(res?.success===true)
  {
    setRefresh(true);
    toast.success("Uploaded successfully", {
      autoClose: 2000,
      position: "bottom-right",
    });
  }else{
    toast.error("Something went wrong! try again", {
      autoClose: 2000,
      position: "bottom-right",
    });
  }
   
    if (modalState.type !== "uploadVideo") {
      setRefresh(true);
    }
    closeModal(false);
  };

  const removeHandler = (index: any) => {
    const updatedFiles = [...selectedFile];
    updatedFiles.splice(index, 1);
    setSelectedFile(updatedFiles);
  };

  return (
    <ModalBase
      isOpen={isOpen}
      closeModal={closeModal}
      modalState={modalState}
      title={` ${
        modalState.type === "uploadVideo" ? "Upload Video" : "Upload Files"
      }`}
    >
      <div className=" text-center  my-5 ">
        <div>
          {modalState.type !== "uploadVideo" && (
            <div className="my-4">
              <TextField
                type="text"
                id="standard-basic"
                label={"Document Name"}
                variant="standard"
                className="mx-2 w-full"
                value={documentName}
                onChange={(e) => setdocumentName(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-3 w-full items-center mt-5">
            <label className="flex flex-col items-center justify-center w-fit h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              {selectedFile.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-6">
                  <Upload />
                  {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p> */}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    upload <br />{" "}
                    {modalState.type !== "uploadVideo" ? (
                      <>(.pdf,mp4,jpg,jpeg,png,doc)</>
                    ) : (
                      <>(.mp4) video length must be 10-15 second</>
                    )}
                  </p>
                  {/* <p style={{ color: 'red' }}>File size exceeds 10MB limit</p> */}
                  {/* {fileSizeError && <p style={{ color: 'red' }}>File size exceeds 5MB limit</p>} */}
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".mp4,.jpeg,.jpg,.pdf,.png,.doc"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="flex">
                  {selectedFile.map((file: any, index: any) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="border border-black mx-3 px-2 py-1"
                        >
                          <p>{file.type}</p>
                          <div
                            className="bg-black text-white p-1"
                            onClick={() => removeHandler(index)}
                          >
                            <p>X</p>
                          </div>
                          {/* <p>Size: {file.size} bytes</p> */}
                        </div>
                      </>
                    );
                  })}
                  {/* <>
                        <div
                        onClick={handleFileChange}
                          className="border border-black mx-3 px-2 py-1"
                        >
                          <p>Add</p>
                      
                        </div>
                      </> */}
                </div>
              )}
            </label>
            {modalState.type !== "uploadVideo" && (
              <>
                <div>or</div>
                <div>
                  <TextField
                    type="text"
                    id="standard-basic"
                    label="Link"
                    variant="standard"
                    className="mx-2"
                    value={shareLink}
                    onChange={(e) => setshareLink(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {fileSizeError && (
          <p style={{ color: "red" }}> *File size exceeds 50MB limit</p>
        )}
        <div>
          <button
            onClick={handleUpload}
            className=" bg-black text-white px-2 py-1 rounded-xl my-5"
          >
            Submit
          </button>
        </div>
        <ToastContainer />
      </div>
    </ModalBase>
  );
};
