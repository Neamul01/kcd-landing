import React from "react";
import SectionLayout from "../layout/SectionLayout";
import BuyTicketSideTracker from "./BuyTicketSideTracker";
import BuyTicketCards from "./BuyTicketCards";
import BuyTicketSummery from "./BuyTicketSummery";

export default function BuyTicket() {
  return (
    <div id="buy-ticket">
      <SectionLayout
        paddingBottom
        title={"Buy Tickets"}
        className="bg-gray-200"
      >
        <div className="w-layout  mx-auto p-16 rounded-lg bg-white grid grid-cols-12 gap-3">
          <div className="col-span-8 border-gray-400 border-2 rounded-lg grid grid-cols-12">
            {/* <TimelineComponent /> */}
            <div className="col-span-3 ">
              <BuyTicketSideTracker />
            </div>
            <div className="col-span-9">
              <BuyTicketCards />
            </div>
          </div>
          <div className="col-span-4 border-gray-200 border-2 rounded-lg">
            <BuyTicketSummery />
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
