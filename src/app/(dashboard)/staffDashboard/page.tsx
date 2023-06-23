"use client";

import NotesCard from "@/components/notesCard";
import { useAppSelector } from "@/store";
import { NotesSelector } from "@/store/notes.slice";
import Link from "next/link";

export default function DashboardStaffPage() {
  const Notes = useAppSelector(NotesSelector.selectAll);
  return (
    <>
      <div className="p-10">
        <div className="py-5 flex justify-start">
        <h1 className="text-4xl py-3 font-extrabold bg-gradient-to-t from-green-600 to-blue-800/30 text-transparent bg-clip-text">
          Your Recently Uploads
        </h1>
        </div>
        <div className="grid lg:grid-cols-4 gap-8 grid-cols-2">
          {Notes.map((feed) => (
            <NotesCard key={feed.id} {...{ feed }} />
          ))}
        </div>
      </div>
    </>
  );
}
