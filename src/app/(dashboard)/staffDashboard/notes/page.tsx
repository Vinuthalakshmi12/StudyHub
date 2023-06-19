"use client";
import Button from "@/components/Button";
import NotesCard from "@/components/notesCard";
import { useAppSelector } from "@/store/index";
import { NotesSelector } from "@/store/notes.slice";
import Link from "next/link";
import React from "react";

export default function NotesPage() {
  const Notes = useAppSelector(NotesSelector.selectAll);

  return (
    <div className="h-full pb-14">
      <div className="py-5 px-10 flex justify-end">
        <Link href={"/staffDashboard/new-notes"}>
          <Button>New Notes</Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-4 gap-8 px-10 grid-cols-2">
        {Notes.map((feed) => (
          <Link key={feed.id} href={`/dashboard/notes/v/${feed.id}`}>
            <NotesCard key={feed.id} {...{ feed }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
