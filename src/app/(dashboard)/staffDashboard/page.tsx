"use client";

export default function DashboardStaffPage() {
  return (
    <>
      <div className="mt-[70px] mb-2 mx-[70px] ">
        <h1 className="font-bold mb-2 text-[22px]"> Your Recent uploads</h1>

        <div className="mt-[50px] ">
          <h1 className="font-bold mb-2 text-[22px]"> Available tests</h1>
          <div className="flex gap-40 items-start">
            <div className="flex flex-col  items-center">
              <div className="h-[310px] w-[1px] bg-gray-500"></div>
            </div>
            <div className="flex flex-col">
              <div className="text-black font-bold text-[22px] mb-2">
                Interactions
              </div>
              <div className=" bg-[url('/interaction.png')] bg-contain bg-no-repeat w-[280px] h-[280px]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
