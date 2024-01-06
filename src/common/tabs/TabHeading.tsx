import React, { Fragment } from "react";
import { Tab } from "@headlessui/react";

export const TabHeading = ({ title }: any) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={
            selected
              ? " bg-blue-500 text-white md:py-2 md:px-3 px-1 py-1 md:mx-2 mx-1 rounded-lg text-sm md:text-base w-auto text-center"
              : " text-black md:py-2 md:px-3 px-1 py-1 rounded-lg md:mx-2  mx-1 text-sm md:text-base w-auto text-center"
          }
        >
          {title}
        </button>
      )}
    </Tab>
  );
};
