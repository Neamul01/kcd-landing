import { Ticket } from "@/types/types";
import { Button, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { TbCurrencyTaka } from "react-icons/tb";

export default function BuyTicketSummery({
  setTab,
  tab,
  selectedTickets,
}: {
  setTab: Dispatch<SetStateAction<number>>;
  tab: number;
  selectedTickets: Ticket | undefined;
}) {
  const handleProceed = () => {
    if (tab < 3) {
      setTab(tab + 1);
    } else {
      setTab(tab);
    }
  };
  return (
    <div className="bg-gray-100 w-full h-full p-4">
      <div className="h-full w-full flex flex-col justify-between gap-3">
        {selectedTickets ? (
          <div className="w-full  bg-white flex gap-4 flex-col rounded-xl p-4">
            <h3 className="font-semibold text-xl tracking-wide">
              Ticket Summary
            </h3>
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex justify-between text-black/60">
                <p className="font-medium">
                  {selectedTickets.title.length > 20
                    ? selectedTickets.title.slice(0, 20) + "..."
                    : selectedTickets.title}
                </p>
                <p className="font-medium flex items-center justify-center">
                  <TbCurrencyTaka /> {selectedTickets.price}{" "}
                </p>
              </div>
              <div className="flex justify-between text-black/60">
                <p className="">Sub Total</p>
                <p className="font-medium flex items-center justify-center">
                  <TbCurrencyTaka /> {selectedTickets.price}{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-between text-black text-xl font-semibold py-3 border-y border-gray-200">
              <p className="">Total</p>
              <p className="font-medium flex items-center justify-center">
                <TbCurrencyTaka /> {selectedTickets.price}{" "}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-accent/80 text-center text-xs font-[300] tracking-wide px-5">
                Processing Fee will be added on selecting payment method*
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full h-72 bg-white flex gap-4 flex-col items-center justify-center rounded-xl">
            <HiMiniShoppingCart size={80} className="text-accent/20" />
            <p className="text-center px-6">
              You haven&apos;t selected any ticket. Select a ticket to see the
              ticket summary.
            </p>
          </div>
        )}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <div className="flex flex-col justify-center gap-1">
              <p className="font-medium">Apply Coupon</p>
              <TextField
                id="outlined-error"
                placeholder="Enter Code"
                size="small"
                className="bg-white border-none focus:ring-amber-600"
              />
            </div>
            <div className="mt-auto ">
              <Button
                variant="outlined"
                size="medium"
                className="border-accent/50 border-2"
              >
                <span className="text-accent/60 capitalize">Apply</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full mb-6">
          <Button
            onClick={handleProceed}
            // disabled
            variant="contained"
            size="large"
            className="w-full bg-accent/60 hover:bg-accent/80 disabled:bg-accent/40 !disabled:cursor-not-allowed  py-3 shadow-none"
          >
            <span className="text-lg capitalize font-bold text-white">
              Proceed
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
