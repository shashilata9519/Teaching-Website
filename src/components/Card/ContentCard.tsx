import React from "react";

export const ContentCard = ({ para, title, loading }: any) => {
  const [showFullText, setShowFullText] = React.useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div
      className={`bg-[#ffffff] shadow-md shadow-[5px 10px 25px 2px rgba(252, 195, 105, 0.2)] w-full mt-2  p-5 h-max ${
        loading ? "blur-sm" : ""
      }`}
    >
      <div className="text-left  text-xl font-bold mb-3">
        {title}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: showFullText ? para : para?.slice(0, 500) || !showFullText ?  para?.slice(0, 500):para,
        }}
      />
      {para?.length > 500 && (
        <span
          onClick={toggleShowFullText}
          className=" text-blue-700 cursor-pointer "
        >
          {showFullText ? "Hide More" : "Show More"}
        </span>
      )}
      {/* <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div> */}
    </div>
  );
};
