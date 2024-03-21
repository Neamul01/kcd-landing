import React from "react";
import { FaTicket } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { PiWalletFill } from "react-icons/pi";

export default function BuyTicketSideTracker({ tab }: { tab: number }) {
  return (
    <div className="max-w-full justify-center items-center border-r-2 flex gap-4 md:flex-col border-gray-400 py-8">
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-10 h-10 md:w-16 md:h-16 items-center justify-center border-2 rounded-full border-accent">
            <FaTicket className=" text-[18px] md:text-[32px] text-accent" />
          </div>
          <p className="capitalize text-xs md:text-sm text-wrap text-center max-w-20">
            Pick Ticket
          </p>
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-2">
        <div
          className={`h-2 md:h-[70px] md:w-2 w-[20px] border-l-4 flex justify-center ${tab >= 2 ? "border-accent" : " border-gray-400"} border-dotted`}
        />
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex w-10 h-10 md:w-16 md:h-16 items-center justify-center border-2 rounded-full ${tab >= 2 ? "border-accent" : "border-gray-400"}`}
          >
            <MdPeopleAlt
              className={` text-[18px] md:text-[32px] ${tab >= 2 ? "text-accent" : "text-gray-400"}`}
            />
          </div>
          <p className="capitalize text-xs md:text-sm text-wrap text-center max-w-16">
            Attendee Details
          </p>
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-2">
        <div
          className={`h-2 md:h-[70px] md:w-2 w-[20px] border-l-4 flex justify-center ${tab >= 3 ? "border-accent" : " border-gray-400"} border-dotted`}
        />
        <div className="flex flex-col justify-center items-center">
          <div
            className={`flex w-10 h-10 md:w-16 md:h-16 items-center justify-center border-2 rounded-full ${tab >= 3 ? "border-accent" : "border-gray-400"}`}
          >
            <PiWalletFill
              className={` text-[18px] md:text-[32px] ${tab >= 3 ? "text-accent" : "text-gray-400"}`}
            />
          </div>
          <p className="capitalize text-xs md:text-sm text-wrap text-center max-w-20">
            Payment
          </p>
        </div>
        {/* <div className="h-24 w-2 border-l-4 flex justify-center border-gray-400 border-dotted" /> */}
      </div>
    </div>
  );
}
