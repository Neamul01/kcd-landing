import React from "react";

export default function ListItem() {
  return (
    <div className="px-4 py-3 border-b grid grid-cols-6">
      <div className=" col-span-2 flex items-center">
        <span className="">8:00 am IST</span>{" "}
      </div>
      <div className=" col-span-4  flex flex-col gap-2 font-semibold">
        <p className="font-semibold">
          Welcome Note/Short Introduction to KCD Kerala
        </p>
        <p className="text-sm tracking-wide">
          <span className="text-primary font-semibold">
            Humble Devassy Chirammal
          </span>
          <span className="text-accent font-semibold">
            {" "}
            (VMware by Broadcom)
          </span>
        </p>
      </div>
    </div>
  );
}
