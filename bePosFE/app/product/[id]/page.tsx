"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDetails } from "@/app/api/products";
import SideBarAdmin from "@/app/components/SideBarAdmin";

export default function page() {
  const [categoryData, setCategoryData] = useState<any>({});
  const [name, setName] = useState<string>("");

  const pathParam = usePathname();
  const id = pathParam.split("/")[2];
  const router = useRouter();

  useEffect(() => {
    getDetails({ prodId: id }).then((response: any) => {
      setCategoryData(response.data);
    });
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="flex flex-row h-screen">
        <div className="w-80 text-4xl h-full bg-emerald-green">
          <div className="max-sm:hidden z-30">
            <SideBarAdmin />
          </div>
        </div>
        <div className="flex-1 h-screen flex flex-col justify-start  bg-white">
          <div className="grid grid-cols-1 gap-y-2.5 w-2/3 mx-auto">
            <button
              className="w-full flex justify-start mt-10"
              type="button"
              onClick={() => router.push("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <h1 className="w-full text-5xl font-bold my-10">
              Chi tiết Product!
            </h1>
            <p className="w-full h-11 px-2.5 outline-none hover:border-dark-blue focus:border-dark-blue text-xl">
              Tên: {categoryData.name}
            </p>
            <p className="w-full h-11 px-2.5 outline-none hover:border-dark-blue focus:border-dark-blue text-xl">
              Mô tả: {categoryData.description}
            </p>
            <p className="w-full h-11 px-2.5 outline-none hover:border-dark-blue focus:border-dark-blue text-xl">
              Giá: {categoryData.price}
            </p>
            <p className="w-full h-11 px-2.5 outline-none hover:border-dark-blue focus:border-dark-blue text-xl">
              Thể loại: {categoryData.category}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
