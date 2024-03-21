import { Button, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { HiMiniShoppingCart } from "react-icons/hi2";

export default function BuyTicketSummery({
  setTab,
  tab,
}: {
  setTab: Dispatch<SetStateAction<number>>;
  tab: number;
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
        <div className="w-full h-72 bg-white flex gap-4 flex-col items-center justify-center rounded-xl">
          <HiMiniShoppingCart size={80} className="text-accent/20" />
          <p className="text-center px-6">
            You haven&apos;t selected any ticket. Select a ticket to see the
            ticket summary.
          </p>
        </div>
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
