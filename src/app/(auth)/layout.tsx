import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  const session = await getServerSession(NextAuthOptions);

  if (session?.user?.role == "STAFF") redirect("/staffDashboard");
  if (session?.user?.role == "STUDENT") redirect("/dashboard");
  return (
    <main className="w-full h-full flex gap-0">
      <section className=" flex flex-1 bg-[url('/leftsection.png')] bg-cover bg-no-repeat h-full w-1/2 shadow-sm"></section>
      <section className="flex flex-1 bg-[url('/rightsection.png')] bg-cover bg-no-repeat h-full w-full   justify-center overflow-y-scroll py-16">
        {children}
      </section>
    </main>
  );
}
