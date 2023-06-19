"use client";

import Button from "@/components/Button";
import { AiOutlineUser } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import { useState } from "react";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const session = useSession();
  const onsubmit = async () => {
    signIn("credentials", {
      userId:email,
      password
    });
  };

  return (
    <div className="block w-4/5 items-center">
      <div className=" items-center ">
        <h1 className="flex justify-center text-3xl font-bold py-11">
          SIGN IN
        </h1>
      </div>
      {/* <pre>{JSON.stringify(session)}</pre> */}

      <div className=" h-fit w-full bg-white block justify-center border-0 rounded-md px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 pb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button
                onClick={() => onsubmit()}
                fullwidth
                LeftIcon={<AiOutlineUser className="text-xl" />}
                intent={"primary"}
              >
                Sign in
              </Button>

              <div className="text-sm flex items-center justify-center px-2 py-2 pt-3 pb-3">
                <Link href={"/forgotpw1"}>
                  {" "}
                  <a
                    href="#"
                    className="font-semibold  text-[#00E18F] hover:text-[#3EB489] "
                  >
                    Forgot password?
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
