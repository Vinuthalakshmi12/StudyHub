import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { NotesSlice } from "./notes.slice";
import { TestsSlice } from "./tests.slice";
import auth from "./auth.slice";

export const store = configureStore({
  reducer: {
    [NotesSlice.name]: NotesSlice.reducer,
    [TestsSlice.name]: TestsSlice.reducer,
    [auth.name]: auth.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;