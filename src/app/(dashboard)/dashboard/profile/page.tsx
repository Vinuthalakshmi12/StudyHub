"use client";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ProfileImage() {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex p-10 justify-center">
      <div className="bg-white shadow-md flex flex-col w-2/3">
        <div className="w-full px-10 flex border-b border-gray-300 py-4 items-center gap-3">
          <AiOutlineArrowLeft
            className="text-xl"
            onClick={() => router.back()}
          />{" "}
          <span className="text-xl">My Profile</span>
        </div>
        <div className={"flex flex-col items-center py-5 gap-2"}>
          <Avatar
            variant="circular"
            style={{ height: "128px", width: "128px" }}
            sizes="lg"
            className={"h-32 w-32 text-3xl"}
          />
          <span className="bg-green-300 text-green-600 px-2 py-1 rounded-full">
            {session.data?.user?.role}
          </span>
          <h1 className="text-xl">{session.data?.user?.name}</h1>
          <span className={"text-lg text-slate-600"}>
            {session.data?.user?.email}
          </span>
          <div className={"flex gap-2 items-center w-1/2 justify-between px-7"}>
            <label className="text-md flex-1">Branch</label>
            <TextField size="small" value={"Computer Sceince"} />
          </div>
          <div className={"flex gap-2 items-center w-1/2 justify-between px-7"}>
            <label className="text-md flex-1">Sem</label>
            <TextField size="small" value={"6"} />
          </div>
          <div className={"flex gap-2 items-center w-1/2 justify-between px-7"}>
            <label className="text-md flex-1">Phone No.</label>
            <TextField size="small" value={"+91 2738920 029383"} />
          </div>
        </div>
      </div>
    </div>
  );
}
