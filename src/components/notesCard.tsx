"use client";
import { Notes } from "@/store/notes.slice";
import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineUser,
} from "react-icons/ai";
import moment from "moment";
import { faker } from "@faker-js/faker";
import Link from "next/link";

export default function NotesCard({
  feed,
  isStaff,
}: {
  feed: Notes;
  isStaff?: boolean;
}) {
  if (!feed) return null;
  return (
    <div className="bg-white w-full h-full rounded-md overflow-hidden border border-slate-300 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md">
      <Link
        key={feed.id}
        href={`/${isStaff ? "staffDashboard" : "dashboard"}/notes/v/${feed.id}`}
      >
        <div className="relative w-full h-52">
          <Image
            src={faker.helpers.arrayElement([
              "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781440583810/math-geek-9781440583810_hr.jpg",
              "https://m.media-amazon.com/images/I/91JLJ+dZOUL._AC_UF1000,1000_QL80_.jpg",
              "https://i.pinimg.com/originals/17/23/89/1723894e4cd15ef0f972838e307b7830.jpg",
              "https://m.media-amazon.com/images/I/911IjI1tl2L._AC_UF1000,1000_QL80_.jpg",
            ])}
            fill
            alt="default-book-icon"
          />
        </div>
      </Link>

      <div className="p-3">
        <div className="flex gap-2 items-center">
          {feed.User.prof_image ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={feed.User.prof_image} fill alt="avatar" />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-300 p-2">
              <AiOutlineUser className="h-full w-full text-slate-500" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-sm whitespace-nowrap w-20 truncate text-slate-950 font-medium">
                {feed.title}
              </h1>{" "}
              <span className="text-slate-600">·</span>{" "}
              <span className="text-sm text-slate-500">
                {moment(new Date(feed.uploaded_date!)).fromNow()}
              </span>
            </div>
            <span className="text-sm text-slate-500">
              {feed.User.first_name}
            </span>
          </div>
        </div>
        <div className="flex justify-between py-3 px-2">
          <LikeButton />
          <DisLikeButton />
        </div>
      </div>
    </div>
  );
}

export const LikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex gap-1 items-center">
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="flex justify-center items-center h-8 w-8 transition-all duration-300 hover:bg-slate-200 rounded-full"
      >
        {isLiked ? (
          <AiFillLike className="text-xl text-slate-800" />
        ) : (
          <AiOutlineLike className="text-xl text-slate-800" />
        )}
      </button>
      <span className="font-medium text-slate-500">{isLiked ? 1 : null}</span>
    </div>
  );
};

export const DisLikeButton = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex gap-1 items-center">
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="flex justify-center items-center h-8 w-8 transition-all duration-300 hover:bg-slate-200 rounded-full"
      >
        {isLiked ? (
          <AiFillDislike className="text-xl text-slate-800" />
        ) : (
          <AiOutlineDislike className="text-xl text-slate-800" />
        )}
      </button>
    </div>
  );
};
