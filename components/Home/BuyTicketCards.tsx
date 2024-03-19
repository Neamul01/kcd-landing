import React from "react";

export default function BuyTicketCards() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-full h-24 rounded-xl px-5 py-3 shadow-xl flex justify-between border-[1px] border-gray-200"
          >
            <div className="flex flex-col justify-between h-full">
              <p className="">Super Early Bird</p>
              <p className="font-semibold text-2xl">₹1199</p>
            </div>
            <button className="bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg mt-auto font-bold py-2 px-8 h-10">
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
