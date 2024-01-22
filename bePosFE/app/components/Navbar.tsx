"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../public/static/logo-sconnect.png";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="sticky top-0 z-20 flex w-full h-10 flex-row items-center justify-center border-t-[1px] px-4 bg-white">
        <div className="flex justify-center items-center h-fit gap-x-14 max-sm:hidden pr-20 cursor-pointer text-lg tracking-wider font-medium">
          <div className="hover:text-red-cherry">VỀ CHÚNG TÔI</div>
          <div className="hover:text-red-cherry">THƯƠNG HIỆU</div>
          <div className="hover:text-red-cherry">CÂU CHUYỆN</div>
          <div className="hover:text-red-cherry">ELITE CLUB</div>
          <div className="hover:text-red-cherry">LIÊN HỆ</div>
        </div>
        <div className="flex justify-center items-center relative">
          <div
            className="hidden max-sm:inline-block"
            onClick={() => handleOpen()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-white mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div
            className={`flex flex-col w-64 h-screen fixed top-14 shadow-md bg-light-bar ${
              isOpen ? "right-0" : "-right-64"
            }  z-10 transition-all text-base font-bold`}
          >
            <Link
              href="/"
              className="flex justify-start items-center text-mine-shaft hover:bg-black/2 p-3 w-full mt-8"
            >
              Home
            </Link>
            <Link
              href="/pages/editor"
              className="flex justify-start items-center text-mine-shaft hover:bg-black/2 p-3 w-full"
            >
              Editor
            </Link>
            <Link
              href="/pages/chat"
              className="flex justify-start items-center text-mine-shaft hover:bg-black/2 p-3 w-full"
            >
              Chat
            </Link>
            <Link
              href="/pages/profile"
              className="flex justify-start items-center text-mine-shaft hover:bg-black/2 p-3 w-full"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
