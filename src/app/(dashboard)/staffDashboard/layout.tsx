"use client";

import { HiHome } from "react-icons/hi";
import { BsBookHalf } from "react-icons/bs";
import { SlNote } from "react-icons/sl";
import { MdHistory } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { BiUpload } from "react-icons/bi";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  const [selectButton, setSelectButton] = useState<number | null>(null);
  const pathname = usePathname();

  const handleButtonClick = (buttonIndex: number) => {
    setSelectButton(buttonIndex);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <nav className=" shadow-md  border-gray-400 h-14 flex items-center justify-between pr-[10px] text-xl font-mono font-bold">
        <div className="bg-[url('/logo.jpg')] bg-contain bg-no-repeat w-full h-[65px] mb-[7px] "></div>
        <ul className="flex flex-row gap-10">
          <li>
            <IoMdNotificationsOutline size="2rem" color="#3EB489" />
          </li>
          <Link href={"/staffDashboard/profile"}>
            <FaRegUser size="1.7rem" color="#3EB489" />
          </Link>
        </ul>
      </nav>
      <div className="w-full h-full flex">
        <div className="h-full w-[80px] flex flex-col items-center gap-7 mt-[20px]">
          <Link href={"/staffDashboard"}>
            <button
              onClick={() => handleButtonClick(1)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname == "/staffDashboard"
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <HiHome className="text-2xl"></HiHome>
            </button>
          </Link>
          <Link href={"/staffDashboard/notes"}>
            <button
              onClick={() => handleButtonClick(2)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname.startsWith("/staffDashboard/notes")
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <BsBookHalf className={"text-2xl"} />
            </button>
          </Link>

          <button
            onClick={() => handleButtonClick(4)}
            className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
              pathname.startsWith("/staffDashboard/history")
                ? "bg-green-100 text-green-500"
                : "hover:bg-green-100 hover:text-green-500"
            }`}
          >
            <MdHistory className={"text-2xl"} />
          </button>

          <button
            onClick={() => signOut()}
            className={`h-12 w-12 p-2 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-500"`}
          >
            <IoExitOutline className={"text-2xl"} />
          </button>
        </div>

        <main className="w-full h-full bg-gray-200  overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
