import Link from "next/link";
import React from "react";
import { AiFillFacebook, AiFillLinkedin } from "react-icons/ai";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

export const SocialMediaCard = ({ setEditMedia, user }: any) => {
  return (
    <div className=" min-h-[200px] p-2 relative">
      <p className=" text-sm md:text-xl font-bold opacity-50 ">
        Social Media Information
      </p>
      
      <div className="flex justify-start gap-4 mt-5">
        {user?.details?.yt && (
          <Link href={user?.details?.yt} className="youtube" target="__blank">
            <BsYoutube className="text-red-500  text-2xl mx-1  " />
          </Link>
        )}
        {user?.details?.linkedin && (
          <Link
            href={user?.details?.linkedin}
            className="linkedin"
            target="__blank"
          >
            <AiFillLinkedin className="text-[#0A66C2]  text-2xl mx-1  " />
          </Link>
        )}
        {user?.details?.fb && (
          <Link href={user?.details?.fb} className="fb" target="__blank">
            <AiFillFacebook className="text-[#4267B2]  text-2xl mx-1 " />
          </Link>
        )}
        {user?.details?.twitter && (
          <Link
            href={user?.details?.twitter}
            className="twitter"
            target="__blank"
          >
            <BsTwitter className="text-[#1DA1F2]  text-2xl mx-1 " />
          </Link>
        )}
        {user?.details?.insta && (
          <Link href={user?.details?.insta} className="insta" target="__blank">
            <BsInstagram className="text-[#E1306C]  text-2xl mx-1" />
          </Link>
        )}
      </div>

      {setEditMedia !== null && (
        <div className="text-center absolute bottom-3">
          <button
            className="text-white rounded-md bg-xcool-new-blue px-6  py-2  cursor-pointer"
            onClick={() => setEditMedia(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
