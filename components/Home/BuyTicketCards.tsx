import { Ticket } from "@/types/types";
import React, { Dispatch, SetStateAction } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketCards({
  tickets,
  setSelectedTickets,
}: {
  tickets: Ticket[];
  setSelectedTickets: Dispatch<SetStateAction<Ticket | undefined>>;
}) {
  return (
    <div className="">
      <div className="flex flex-col gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="w-full h-24 rounded-xl px-5 py-3 shadow-xl flex justify-between border-[1px] border-gray-200"
          >
            <div className="flex flex-col justify-between h-full">
              <p className="">{ticket.title}</p>
              <p className="font-semibold text-2xl flex items-center">
                <TbCurrencyTaka /> {ticket.price}
              </p>
            </div>
            <button
              onClick={() => setSelectedTickets(ticket)}
              className="bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg mt-auto font-bold py-2 px-8 h-10"
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
