import { useState, useEffect, Children } from "react";

export default function Carousel({ item }: any) {
  return (
    <div className="flex overflow-x-auto">
      <div className="flex-1 flex-no-wrap">
        <div className="flex flex-row">
          {/* Add your scrollable cards here */}
          {item?.map((i: any, index: any) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-4 mx-2"
                style={{ minWidth: "300px", maxWidth: "300px" }}
              >
                <h2 className="text-xl font-bold">
                  <span className="bg-black text-white flex flex-row justify-center w-fit rounded-3xl py-1 px-3 text-start text-xs">
                    Step {i?.step}
                  </span>
                  {i?.title}
                </h2>
                <p>{i?.intro}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
