import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketPaymentCard() {
  return (
    <div className="">
      <div className="flex flex-col gap-6">
        {/* {tickets.map((ticket) => ( */}
        <div className="w-full  rounded-xl px-5 py-3 shadow-xl flex justify-between border-[1px] border-gray-200">
          <div className="flex  justify-between h-full">
            <p className="">AmarPay</p>
          </div>

          {/* {selectedTickets?._id === ticket._id ? (
          <div className="flex gap-2 items-center justify-center">
            <button
              onClick={() => {
                ticket.quantity + 1;
              }}
              className="disabled:cursor-not-allowed bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg mt-auto font-bold py-2 px-8 h-10"
            >
              +
            </button>
            <button className="disabled:cursor-not-allowed bg-transparent hover:bg-transparent text-accent  mt-auto font-bold py-2 px-3 h-10">
              {ticket.quantity}
            </button>
            <button
              onClick={() => {
                ticket.quantity + 1;
              }}
              disabled={!ticket._id}
              className="disabled:cursor-not-allowed bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg mt-auto font-bold py-2 px-8 h-10"
            >
              -
            </button>
          </div>
        ) : ( */}
          <button
            //   onClick={() => setSelectedTickets(ticket)}
            disabled
            className="disabled:cursor-not-allowed disabled:text-black/30 bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg font-bold py-2 px-8 h-10"
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
