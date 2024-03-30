import Image from "next/image";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketPaymentCard() {
  return (
    <div className="">
      <div className="flex flex-col gap-6 items-center">
        {/* {tickets.map((ticket) => ( */}
        <div className="w-full  rounded-xl px-5 py-3 shadow-xl flex justify-between border-[1px] border-gray-200">
          <div className="flex items-center">
            <Image
              src={"/aamarpay.png"}
              width={150}
              height={50}
              alt="aamarpay"
            />
            {/* <div className="flex  justify-between items-center h-full">
              <p className="">aamarPay</p>
            </div> */}
          </div>

          <button
            //   onClick={() => setSelectedTickets(ticket)}
            disabled
            className="disabled:cursor-not-allowed disabled:text-white/60 bg-transparent hover:bg-green-400 hover:text-black/60 text-white border-gray-500 rounded-lg font-bold py-2 px-8 h-10 bg-green-500 disabled:bg-green-500"
          >
            Selected
          </button>
          {/* )} */}
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
