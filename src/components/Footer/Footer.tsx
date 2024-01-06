import Linkedin from "@/assets/linkedin";
import Facebook from "@/assets/facebook";
import { BiLogoFacebook } from "react-icons/bi";

import Logo2 from "@/assets/logo2";
import Instagram from "@/assets/Instagram";
import Link from "next/link";
import Image from "next/image";
import {
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className="px-5 pt-10 bg-xcool-new-blue text-white text-xs">
      <div className=" flex max-[600px]:flex-col justify-evenly text-sm  leading-6 mb-10">
        <div className="w-auto mb-4 md:mb-1">
          <Logo2 />
        </div>
        <div className="w-auto">
          {/* <div className=" h-48 bg-white max-[600px]:hidden" style={{ width: "1px" }}></div> */}
          <div className="hidden">
            <p >
              <span className=" text-xl">Help and support</span>
            </p>
            <div className=" bg-white h-1 w-20 mt-4"></div>
            <div className="mt-5">
              <Link href="/about">About Us</Link>
              {/* <p>Email: xyz</p>
              <p>Regd Office: xyz</p> */}
            </div>
          </div>

          {/* <Link href="/about">
          <p>About Us</p>
        </Link> */}
          <Link href="/helpandsupport">
            <li className=" pb-1 text-xs">Help and support</li>
          </Link>
          <Link href="/about">
            <li className=" pb-1 text-xs">About Us</li>
          </Link>
          <Link href="/event">
            <li className=" pb-1 text-xs">Events</li>
          </Link>
        </div>
        <ul className="w-auto list-disc max-[600px]:my-10 max-[600px]:ms-3">
          <Link href="/terms">
            <li className=" pb-1 text-xs">Terms of use</li>
          </Link>
          <Link href="/teacherterms">
            <li className=" pb-1 text-xs">Teacher Terms</li>
          </Link>
          <Link href="/privacy">
            <li className=" pb-1 text-xs">Privacy Policy</li>
          </Link>
          <Link href="/pricingpolicy">
            <li className=" pb-1 text-xs">Pricing Policy</li>
          </Link>
          <Link href={`/returns`}>
            <li className=" pb-1 text-xs">Refund Policy</li>
          </Link>
        </ul>
        <div className="w-auto ">
          <p>
            <span className=" text-lg">Download Our App</span>
          </p>
          <div className=" bg-white h-1 w-20 my-4"></div>
          <Link
            href={
              "https://play.google.com/store/apps/details?id=com.xcool.mobileapp&pli=1"
            }
          >
            <Image
              width={130}
              height={70}
              alt="android"
              // className=" w-auto"
              src="/toppng-2.png"
            />
          </Link>
          {/* <Image
            width={130}
            height={70}
            alt="apple"
            className=" my-4"
            src="/toppng-1.png"
          /> */}
        </div>

        <div className=" w-auto">
          <p>
            <span className=" text-lg">Social Media</span>
          </p>
          <div className=" bg-white h-1 w-16 my-4"></div>
          <div className=" flex gap-2">
            <Link
              href={
                "https://www.facebook.com/people/Xcool/100089441030513/?mibextid=ZbWKwL"
              }
              className=" p-1 border border-white rounded-md"
            >
              <BiLogoFacebook className=" text-xl" />
            </Link>
            <Link
              href={"https://www.instagram.com/xcool.in/"}
              className=" p-1 border border-white rounded-md"
            >
              <AiFillInstagram className=" text-xl" />
            </Link>
            {/* <p className=" p-1 border border-white rounded-md">
              <AiOutlineTwitter className=" text-xl" />
            </p>
            <p className=" p-1 border border-white rounded-md">
              <AiFillLinkedin className=" text-xl" />
            </p> */}
          </div>
        </div>
      </div>
      <div className="">
        <hr className=" mx-4 max-[600px]:mx-auto" />
        <p className=" text-center py-4 max-[600px]:text-start">
          {" "}
          ©2022 xcool private limited
        </p>
      </div>
    </footer>
  );
};
