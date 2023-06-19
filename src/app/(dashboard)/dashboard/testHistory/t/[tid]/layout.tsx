"use client";
import { useAppDispatch } from "@/utils/hooks";
import { useAppSelector } from "@/store/index";
import {
  TestsSelector,
  getTestsWithQuestions,
  getTestsWithQuestionsAnswers,
} from "@/store/tests.slice";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: props) {
  const dispatch = useAppDispatch();
  const tid = useParams().tid;
  const session = useSession();

  if (session.data)
    dispatch(
      getTestsWithQuestionsAnswers({
        testId: tid,
        userId: session.data.user?.id!,
      })
    );

  return <div>{children}</div>;
}
