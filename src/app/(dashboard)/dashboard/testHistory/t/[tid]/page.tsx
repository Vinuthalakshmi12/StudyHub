"use client";
import { useAppSelector } from "@/store";
import { TestsAnswersSelector, TestsSelector } from "@/store/tests.slice";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ViewTestHistoryPage() {
  const id = useParams().tid;
  const questionsAnswers = useAppSelector(TestsAnswersSelector.selectAll);
  const feed = useAppSelector((state) => TestsSelector.selectById(state, id));
  const router = useRouter();

  return (
    <div className="flex p-10 justify-center">
      <div className="bg-white shadow-md flex flex-col w-2/3">
        <div className="w-full px-10 flex border-b border-gray-300 py-4 items-center gap-3">
          <AiOutlineArrowLeft
            className="text-xl"
            onClick={() => router.back()}
          />{" "}
          <span className="text-xl">{feed?.test_title}</span>
        </div>
        <div>
          {questionsAnswers.map((question, index) => (
            <div key={question.id} className="px-10 py-5">
              <h2 className="text-lg font-medium block space-x-2">
                <span>{index + 1}.</span> {question.question}
              </h2>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={question.answers[0].answer}
                name="radio-buttons-group"
                aria-readonly
              >
                {question.choices?.map((choice) => (
                  <FormControlLabel
                    aria-readonly
                    disabled={choice !== question.answers[0].answer}
                    key={choice}
                    value={choice}
                    control={
                      <Radio
                        color={
                          question.answer == question.answers[0].answer
                            ? "success"
                            : "error"
                        }
                      />
                    }
                    label={choice}
                  />
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
