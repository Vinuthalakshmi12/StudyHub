import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SupaClient } from "@/utils/supabase";

export const fetchusers = createAsyncThunk<
  any,
  {
    email: string;
    password: string;
  },
  {
    rejectValue: {
      msg: string;
    };
  }
>(
  "/auth/fetchusers",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await SupaClient.from("User")
        .select("*")
        .eq("mail_id", payload.email)
        .eq("password", payload.password)
        .single();

      const data = response.data;
      console.log(data);
      return fulfillWithValue(data);
    } catch (e) {
      return rejectWithValue({ msg: "Something went wrong !" });
    }
  }
);
interface InitialStateProps {
  isLoading: boolean;
  error: null | string | undefined;
  id: string;
  email: string;
  name: string;
  role: "STAFF" | "STUDENT" | undefined;
}

const initialState: InitialStateProps = {
  id: "",
  email: "",
  name: "",
  role: undefined,
  isLoading: false,
  error: null,
};
export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchusers.fulfilled, (state, { payload }) => {
      state.id = payload.id;
      state.email = payload.mail_id;
      state.name = payload.first_name;
      state.role = payload.role;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchusers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchusers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload?.msg;
    });
  },
});
export default auth;
