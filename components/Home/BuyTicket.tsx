"use client";
import React, { useState } from "react";
import SectionLayout from "../layout/SectionLayout";
import BuyTicketSideTracker from "./BuyTicketSideTracker";
import BuyTicketCards from "./BuyTicketCards";
import BuyTicketSummery from "./BuyTicketSummery";
import BuyTicketDetails from "./BuyTicketDetails";
import { Button } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";

export default function BuyTicket() {
  const [tab, setTab] = useState(1);

  const handleBack = () => {
    if (tab > 1) {
      setTab(tab - 1);
    } else {
      setTab(tab);
    }
  };
  return (
    <div id="buy-ticket">
      <SectionLayout
        paddingBottom
        title={"Buy Tickets"}
        className="bg-gray-200"
      >
        <div className="w-layout  mx-auto p-16 pt-8 rounded-lg bg-white flex flex-col gap-3">
          <div className="">
            <Button
              variant="text"
              className="hover:bg-transparent"
              onClick={handleBack}
            >
              <IoIosArrowBack
                size={25}
                className="text-accent font-bold mr-2"
              />

              <span className="text-xl text-accent capitalize font-normal">
                Back
              </span>
            </Button>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-8 border-gray-400 border-2 rounded-lg grid grid-cols-12">
              {/* <TimelineComponent /> */}
              <div className="col-span-3 ">
                <BuyTicketSideTracker tab={tab} />
              </div>
              <div className="col-span-9 p-4">
                {tab === 2 ? <BuyTicketDetails /> : <BuyTicketCards />}
              </div>
            </div>
            <div className="col-span-4 border-gray-200 border-2 rounded-lg">
              <BuyTicketSummery setTab={setTab} tab={tab} />
            </div>
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
