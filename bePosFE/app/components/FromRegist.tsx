"use client";

import React, { useState, useEffect } from "react";
import LazyShow from "./LazyShow";
import { notification } from "antd";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

export default function FormRegist() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmailName] = useState<string>("");
  const [isAccess, setIsAccess] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<Boolean>(false);

  const handleCheckAccessData = (
    firstName: string,
    lastName: string,
    email: string
  ) => {
    if (firstName && lastName && email) {
      setIsAccess(true);
    } else setIsAccess(false);
  };

  useEffect(() => {
    handleCheckAccessData(firstName, lastName, email);
  }, [firstName, lastName, email]);

  const handleSubmit = async () => {
    if (isAccess === false) {
      return;
    } else {
      const data = {
        firstName,
        lastName,
        email,
      };
      notification.success({
        message: "Thành công",
        description: "Đăng ký nhận thông tin thàng công!",
      });
      // const dataResponse: any = await Register(data);
      // if (dataResponse.status === "SUCCESS") {
      //   router.push("/");
      // } else {
      //   setErrorMessage(true);
      // }
    }
  };

  return (
    <>
      <div className="max-w-5xl m-auto mb-20">
        <LazyShow>
          <div className="w-fit m-auto grid grid-cols-1 gap-y-2.5 p-10 border rounded-lg">
            <h1 className="w-full text-4xl font-bold my-2">
              Đăng ký nhận thông tin
            </h1>
            <input
              type="text"
              placeholder="Tên của bạn"
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <input
              type="text"
              placeholder="Địa chỉ email"
              onChange={(e) => setEmailName(e.target.value)}
              className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
            />
            <p
              className={`${
                errorMessage ? "inline-block" : "hidden"
              } text-red-500 text-xs text-right`}
            >
              Vui lòng nhập đúng tài khoản email
            </p>
            <button
              className={`w-full h-14 rounded-md font-semibold text-white ${
                isAccess ? "bg-pri-access" : "bg-gray-disable "
              } `}
              onClick={(e) => handleSubmit()}
              disabled={!isAccess}
            >
              Đăng ký ngay
            </button>
          </div>
        </LazyShow>
      </div>
    </>
  );
}
