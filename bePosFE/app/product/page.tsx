"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { create } from "@/app/api/products";
import SideBarAdmin from "@/app/components/SideBarAdmin";
import { notification } from "antd";
import Alert from "@/app/components/Alert";

export default function page() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isAccess, setIsAccess] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Boolean>(false);

  const router = useRouter();

  const handleCheckAccessData = (
    name: string,
    description: string,
    category: string,
    price: any
  ) => {
    if (name && description && category && price) {
      setIsAccess(true);
    } else setIsAccess(false);
  };

  useEffect(() => {
    handleCheckAccessData(name, description, category, price);
  }, [name, description, category, price]);

  const handleSubmit = async () => {
    if (isAccess === false) {
      return;
    } else {
      const data = {
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        price: price,
      };
      const dataResponse: any = await create(data);
      if (dataResponse.status === "SUCCESS") {
        router.push("/");
      } else {
        notification.warning({
          message: "Cảnh báo",
          description: dataResponse.error[0].msg,
        });
        setErrorMessage(true);
      }
    }
  };

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
            <h1 className="w-full text-5xl font-bold my-10">Tạo Prompt mới</h1>
            <input
              type="text"
              placeholder="Tiêu đề"
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <input
              type="number"
              placeholder="Giá"
              min={100}
              max={999999999}
              onChange={(e) => setPrice(parseInt(e.target.value, 10))}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Thể loại"
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />

            <button
              className={`w-full h-14 rounded-md font-semibold text-white ${
                isAccess ? "bg-pri-access" : "bg-gray-disable "
              } `}
              onClick={(e) => handleSubmit()}
              disabled={!isAccess}
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
