"use client";

import { Yatra_One } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { HiHome } from "react-icons/hi";
import { BsBookHalf } from "react-icons/bs";
import { GiNotebook } from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useAppSelector } from "@/store/index";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/utils/hooks";
import { getNotes } from "@/store/notes.slice";
import { TestsSelector, getTestsWithQuestions } from "@/store/tests.slice";

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  const [selectButton, setSelectButton] = useState<number | null>(null);
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = (buttonIndex: number) => {
    setSelectButton(buttonIndex);
  };
  const dispatch = useAppDispatch();
  const notesIds = useAppSelector((state) => state.notes.ids);
  const testIds = useAppSelector(TestsSelector.selectIds);

  if (notesIds.length == 0) dispatch(getNotes());

  if (testIds.length == 0) dispatch(getTestsWithQuestions());

  useEffect(() => {
    if (user.role == "STAFF") router.replace("/staffDashboard");
    else if (user.role == "STUDENT") router.replace("/dashboard");
  }, [user.role]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <nav className="border-b border-gray-300 h-14 flex items-center justify-between pr-[10px] text-xl font-mono font-bold">
        <Image src="/logo.jpg" alt={"study hub"} width={160} height={100} />
        <ul className="flex flex-row gap-10">
          <Link href={"/dashboard/profile"}>
            <li>
              <FaRegUser size="1.7rem" color="#3EB489" />
            </li>
          </Link>
        </ul>
      </nav>
      <div className="w-full h-full flex">
        <div className="h-full w-[80px] border-r border-slate-300 flex flex-col items-center gap-7 pt-[20px] transition-all duration-200">
          <Link href={"/dashboard"}>
            <button
              onClick={() => handleButtonClick(1)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname == "/dashboard"
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <HiHome className="text-2xl"></HiHome>
            </button>
          </Link>
          <Link href={"/dashboard/notes"}>
            {" "}
            <button
              onClick={() => handleButtonClick(2)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname.startsWith("/dashboard/notes")
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <BsBookHalf className="text-2xl" />
            </button>
          </Link>

          <Link href={"/dashboard/attendTest"}>
            <button
              onClick={() => handleButtonClick(3)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname.startsWith("/dashboard/attendTest")
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <GiNotebook className="text-2xl" />
            </button>
          </Link>
          <Link href={"/dashboard/testHistory"}>
            {" "}
            <button
              onClick={() => handleButtonClick(4)}
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center  ${
                pathname.startsWith("/dashboard/testHistory")
                  ? "bg-green-100 text-green-500"
                  : "hover:bg-green-100 hover:text-green-500"
              }`}
            >
              <MdHistory className="text-2xl" />
            </button>
          </Link>
          {/* <Link href={"/dashboard/favourites"}>
            {" "}
            <button
              onClick={() => handleButtonClick(5)}
              className={`w-full pl-[20px] pr-[20px] border-r-4 ${
                selectButton === 5 ? "border-green-500" : "border-white"
              }`}
            >
              <AiFillHeart size="2rem" color="#3EB489" />
            </button>
          </Link> */}
          <Link href={"/api/auth/signout"}>
            <button
              className={`h-12 w-12 p-2 rounded-full flex items-center justify-center hover:bg-green-100 hover:text-green-500`}
            >
              <IoExitOutline className="text-2xl" />
            </button>
          </Link>
        </div>

        <main className="w-full h-full bg-gradient-to-t from-green-200 to-green-50  overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
