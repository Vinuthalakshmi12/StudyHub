"use client";
import { useAppDispatch } from "@/utils/hooks";
import { useAppSelector } from "@/store/index";
import { getNotes } from "@/store/notes.slice";

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  return <div>{children}</div>;
}
