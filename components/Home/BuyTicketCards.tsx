import { Ticket } from "@/types/types";
import React, { Dispatch, SetStateAction } from "react";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketCards({
  tickets,
  setSelectedTickets,
  selectedTickets,
  ticketQuantity,
  setTicketQuantity,
}: {
  tickets: Ticket[];
  setSelectedTickets: Dispatch<SetStateAction<Ticket | undefined>>;
  setTicketQuantity: Dispatch<SetStateAction<number>>;
  selectedTickets: Ticket | undefined;
  ticketQuantity: number;
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
              onClick={() => setSelectedTickets(ticket)}
              disabled={
                ticket._id === selectedTickets?._id || !ticket.availability
              }
              className="disabled:cursor-not-allowed disabled:text-black/30 bg-transparent hover:bg-gray-100 text-black border-gray-500 border rounded-lg mt-auto font-bold py-2 px-8 h-10"
            >
              Add
            </button>
            {/* )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
