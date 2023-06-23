import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import { Database } from "../../types/supabase";
import { SupaClient } from "@/utils/supabase";

export const getTestsWithQuestions = createAsyncThunk<
  any,
  void,
  { rejectValue: any }
>(
  "/tests/getTestsWithQuestions",
  async (_payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("tests").select(
        "*,User(id,first_name,prof_image),questions(*)"
      );
      const data = response.data;
      if (response.error) return rejectWithValue(response.error);
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getTestsWithQuestionsAnswers = createAsyncThunk<
  any,
  { userId: string; testId: string },
  { rejectValue: any }
>(
  "/tests/getTestsWithQuestionsAnswers",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("questions")
        .select("*,answers(answer)")
        .eq("testsId", payload.testId)
        .eq("answers.userId", payload.userId);
      const data = response.data;
      if (response.error) return rejectWithValue(response.error);
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// export const postNotes = createAsyncThunk<
//   any,
//   {
//     title: string;
//     unitNo: string;
//     unitName: string;
//     subCode: string;
//     fileUrl: string;
//     semester: string;
//   },
//   { rejectValue: any }
// >(
//   "/notes/postNotes",
//   async (payload, { fulfillWithValue, rejectWithValue }) => {
//     try {
//       const response = await SupaClient.from("notes").insert({
//         title: payload.title,
//         unit_no: payload.unitNo,
//         unit_name: payload.unitNo,
//         branch_name: "CSE",
//         sem_no: payload.semester,
//         usersId: "b03f5fb9-7892-42dd-af35-e67af6f4b51e",
//         sub_code: payload.subCode,
//         file_url: payload.fileUrl,
//         dislikes: 0,
//         likes: 0,
//       });
//       if (response.error) return rejectWithValue(response.error);
//       return fulfillWithValue(true);
//     } catch (e) {
//       return rejectWithValue(e);
//     }
//   }
// );

export type Tests = Database["public"]["Tables"]["tests"]["Row"] & {
  User: Pick<
    Database["public"]["Tables"]["User"]["Row"],
    "id" | "first_name" | "prof_image"
  >;
  questions: Database["public"]["Tables"]["questions"]["Row"][];
};

export type TestsAnswers = Database["public"]["Tables"]["questions"]["Row"] & {
  answers: Pick<Database["public"]["Tables"]["answers"]["Row"], "answer">[];
};

const TestsAdapter = createEntityAdapter<Tests>({
  selectId: (test) => test.id,
});

const TestsAnswersAdapter = createEntityAdapter<TestsAnswers>({
  selectId: (test) => test.id,
});

export const TestsSlice = createSlice({
  name: "tests",
  initialState: {
    tests: TestsAdapter.getInitialState({
      isPending: false,
    }),
    answers: TestsAnswersAdapter.getInitialState({
      isPending: false,
    }),
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTestsWithQuestions.pending, (state, action) => {
        state.tests.isPending = true;
      })
      .addCase(getTestsWithQuestions.fulfilled, (state, action) => {
        state.tests.isPending = false;
        TestsAdapter.setAll(state.tests, action.payload);
      })
      .addCase(getTestsWithQuestionsAnswers.pending, (state, action) => {
        state.answers.isPending = true;
      })
      .addCase(getTestsWithQuestionsAnswers.fulfilled, (state, action) => {
        state.answers.isPending = false;
        TestsAnswersAdapter.setAll(state.answers, action.payload);
      });
  },
});

export const TestsSelector = TestsAdapter.getSelectors<RootState>(
  (state) => state.tests.tests
);

export const TestsAnswersSelector = TestsAnswersAdapter.getSelectors<RootState>(
  (state) => state.tests.answers
);
