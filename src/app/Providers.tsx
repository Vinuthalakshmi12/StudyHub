"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </Provider>
  );
}
