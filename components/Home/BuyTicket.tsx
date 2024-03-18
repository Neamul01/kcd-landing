import React from "react";
import SectionLayout from "../layout/SectionLayout";

export default function BuyTicket() {
  return (
    <div id="buy-ticket">
      <SectionLayout
        paddingBottom
        title={"Buy Tickets"}
        className="bg-gray-200"
      >
        <div className="w-sectionLayout mx-auto p-8 rounded-lg bg-white grid grid-cols-12 gap-3">
          <div className="col-span-8 border-gray-400 border-2 rounded-lg">
            hello
          </div>
          <div className="col-span-4 border-gray-200 border-2 rounded-lg">
            hi
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
