"use client";
import { useAppDispatch } from "@/utils/hooks";
import { useAppSelector } from "@/store/index";
import { TestsSelector, getTestsWithQuestions } from "@/store/tests.slice";

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  const dispatch = useAppDispatch();

  return <div>{children}</div>;
}
