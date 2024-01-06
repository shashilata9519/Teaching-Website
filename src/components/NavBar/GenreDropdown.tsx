import React, { useState } from 'react';
// import Dropdown from './MainDropdown';
import CloseArrow from '@/assets/CloseArrow';
import OpenArrow from '@/assets/OpenArrow';
import { Dropdown } from './Dropdown';

function GenreDropdown({ genre ,course,setFilterCourse,filterCourse}:any) {
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  const handleButtonClick = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };
  const handleMouseEnter = (id: any) => {
    const filteredData = course.filter((item: any) => item?.subcategory === id);

    setFilterCourse(filteredData);
  };

  const handleMouseLeave = () => {
    setFilterCourse([]);
  };

  return (
    <div className={`group md:inline-block genre text-xcool-new-blue text-base ms-4 font-semibold ${isSubmenuOpen ? '' : 'hidden'}`}>
      <button
        onClick={handleButtonClick}
        aria-haspopup="true"
        aria-controls="menu"
        className="outline-none focus:outline-none px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
      >
        <span className="pr-1 font-semibold flex-1">Learn</span>
        {/* <span>
          {isSubmenuOpen ? <CloseArrow /> : <OpenArrow />}
        </span> */}
      </button>
      <ul
        id="menu"
        aria-hidden="true"
        className={`bg-white border rounded-sm transform ${isSubmenuOpen ? 'scale-100' : 'scale-0'} text-sm absolute transition duration-150 ease-in-out origin-top min-w-32 z-50`}
      >
        {genre?.map((i:any, index:any) => (
          <li
            key={index}
            className="rounded-sm relative px-3 py-1 hover:bg-gray-100"
            onMouseEnter={() => handleMouseEnter(i?.id)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              // onClick={() => handleSubmenuButtonClick(i?.id)}
              aria-haspopup="true"
              aria-controls="menu-lang"
              className="w-full text-left flex items-center outline-none focus:outline-none"
            >
              <span className="pr-1 flex-1">{i?.subcategory}</span>
              {/* <span className="mr-auto">
                <CloseArrow />
              </span> */}
            </button>
            <Dropdown filterCourse={filterCourse} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreDropdown;
