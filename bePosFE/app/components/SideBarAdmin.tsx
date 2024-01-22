import React from "react";
import Link from "next/link";

interface Props {}

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
}

const SideBarAdmin: React.FC<Props> = ({}) => {
  return (
    <>
      <div className={`h-full pl-3 pb-3 text-mine-shaft`}>
        <div className="w-full flex justify-center mt-10 flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-end items-center">
            <h1
              // href="/admin"
              className="w-full text-center text-white font-bold"
            >
              <p>H</p>
            </h1>
          </div>
          <div>
            <span>Đoàn Quang Huy</span>
          </div>
          <div className="flex flex-col text-xl w-full justify-start mt-5">
            <span
              className={`w-full h-10 text-lg flex justify-between items-center p-2 rounded-lg hover:bg-black/30 hover:text-white mb-1 transition-all bg-gray-disable/50
              } `}
            >
              Bài kiểm tra
            </span>
            <span
              className={`w-full h-10 text-lg flex justify-between items-center p-2 rounded-lg hover:bg-black/30 hover:text-white mb-1 transition-all bg-gray-disable/50
              } `}
            >
              Full-Stack Dev bePos
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarAdmin;
