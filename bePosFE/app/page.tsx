"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAll } from "@/app/api/products";
import { Pagination } from "antd";
import Link from "next/link";
import debounce from "lodash.debounce";

import SideBarAdmin from "@/app/components/SideBarAdmin";

export default function page() {
  const [page, setPage] = useState<number>(1);
  const [listCategoriesData, setListCategoriesData] = useState<any>();
  const [textSearch, setTextSearch] = useState<string>("");
  const router = useRouter();

  const handleChangePage = async (page: number) => {
    setPage(page);
    getAll({ page, limit: 20 }).then((response: any) =>
      setListCategoriesData(response.data)
    );
  };

  useEffect(() => {
    getAll({ page: 1, limit: 20 }).then((response: any) =>
      setListCategoriesData(response.data)
    );
  }, []);

  const inputChangeHandler = useCallback(
    debounce((inputValue: string) => {
      if (inputValue.trim() === "") {
        getAll({ page: 1, limit: 20 }).then((response: any) =>
          setListCategoriesData(response.data)
        );
      } else {
        getAll({ page: 1, limit: 20, searchValue: inputValue }).then(
          (response: any) => setListCategoriesData(response.data)
        );
      }
    }, 500),
    [listCategoriesData]
  );

  // Hàm xử lý thay đổi nội dung ô input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setTextSearch(inputValue);
    inputChangeHandler(inputValue);
  };

  return (
    <main className="min-h-screen min-w-full overflow-hidden">
      <div className="flex flex-row h-screen">
        <div className="w-80 text-4xl h-full bg-emerald-green">
          <div className="max-sm:hidden z-30">
            <SideBarAdmin />
          </div>
        </div>
        <div className="flex flex-1 justify-center h-full overflow-x-hidden overflow-y-auto">
          <div className="w-5/6 mt-10">
            <div className="flex justify-between ">
              <div className="text-4xl">Danh sách Products</div>
              <div
                onClick={() => {
                  router.push("/product");
                }}
                className="flex space-x-3 rounded-full bg-gray-disable/20 p-2 border-solid border-purple-mint border-2 hover:bg-pri-access/70 cursor-pointer "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Tạo Category
              </div>
            </div>

            <div className="w-440 mt-10 relative">
              <input
                type="text"
                placeholder="Tìm kiếm ..."
                value={textSearch}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                className="w-full h-11 px-2.5 outline-none border-solid border-2 hover:border-dark-blue rounded-md focus:border-dark-blue rounded-md text-sm"
              />
              <button
                type="submit"
                disabled={textSearch === ""}
                onClick={() => setTextSearch("")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 absolute right-3 top-3 text-gray-disable hover:text-greyish"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <table className="w-full mt-10 border-collapse border border-black...">
              <thead>
                <tr className="text-center">
                  <th className="border border-black ...">STT</th>
                  <th className="border border-black ...">Tên</th>
                  <th className="border border-black ...">Mô tả</th>
                  <th className="border border-black ...">Giá</th>
                  <th className="border border-black ...">Thể loại</th>
                  <th className="border border-black ...">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {listCategoriesData?.docs?.map((data: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-black ...">{+index + 1}</td>
                    <td className="border border-black ...">
                      <div className="mx-1">{data.name}</div>
                    </td>
                    <td className="border border-black ...">
                      <div className="mx-1">{data.description}</div>
                    </td>
                    <td className="border border-black ...">
                      <div className="mx-1">{data.price}</div>
                    </td>
                    <td className="border border-black ...">
                      <div className="mx-1">{data.category}</div>
                    </td>
                    <td
                      className={`border border-black text-center text-blue-500 ...`}
                    >
                      <Link
                        href={{
                          pathname: `/product/` + data._id,
                        }}
                        passHref
                        className="text-cyan cursor-pointer hover:text-pri-access"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <Pagination
                defaultCurrent={1}
                total={listCategoriesData?.totalDocs}
                // total={50}showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                showSizeChanger={false}
                defaultPageSize={20}
                onChange={(e) => handleChangePage(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
