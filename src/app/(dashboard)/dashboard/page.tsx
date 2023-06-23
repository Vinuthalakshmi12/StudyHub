"use client";
import Test from "@/components/Test";
import NotesCard from "@/components/notesCard";
import { useAppSelector } from "@/store";
import { NotesSelector } from "@/store/notes.slice";
import { TestsSelector } from "@/store/tests.slice";
import Link from "next/link";
import React from "react";

export default function Dashboard() {
  const Notes = useAppSelector(NotesSelector.selectAll);
  const Tests = useAppSelector(TestsSelector.selectAll);

  return (
    <div className="p-10">
      <div className="py-5 flex justify-start">
        <h1 className="text-xl font-semibold text-slate-700">
          Recently Uploaded Tests
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-8 px-10 grid-cols-2">
        {Tests.map((feed) => (
          <Link key={feed.id} href={`/dashboard/attendTest/t/${feed.id}`}>
            <Test key={feed.id} {...{ feed }} />
          </Link>
        ))}
      </div>
      <div className="py-5 flex justify-start">
        <h1 className="text-xl font-semibold text-slate-700">
          Recently Uploaded Notes
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-8 grid-cols-2">
        {Notes.map((feed) => (
          <NotesCard key={feed.id} {...{ feed }} />
        ))}
      </div>
    </div>
  );
}
