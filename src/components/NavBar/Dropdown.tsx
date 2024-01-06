import Link from 'next/link';
import React from 'react'

export const Dropdown = ({filterCourse}:any) => {
  return (
    <ul
    id="menu-lang"
    aria-hidden="true"
    className="bg-white border rounded-sm absolute top-0 right-0 
transition duration-150 ease-in-out origin-top-left text-xs  w-full
"
  >
    {filterCourse?.map((i: any, index: any) => {
      return (
        <Link href={`/course/${i?.slug}`}  key={index}>
          <li className="px-3 py-1 hover:bg-gray-100">
            {i?.course_name}
            </li>
        </Link>
      );
    })}
  </ul>
  )
}
