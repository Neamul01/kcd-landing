import React from "react";

interface Schedule {
  scheduleTime: string;
  title: string;
  description: string;
  scheduleTrack: string;
  speaker: {
    _id: string;
    designation: string;
    name: string;
    organization: string;
    title: string;
  };
  _id: string;
  createdAt: string;
}
interface ListItemProps {
  item: Schedule;
}

export default function ListItem({item}: ListItemProps) {
  const {scheduleTime, title, description} = item;
console.log(item);
  return (
    <div className="px-4 py-3 border-b grid grid-cols-6">
      <div className=" col-span-2 flex items-center">
        <span className="">{scheduleTime}</span>{" "}
      </div>
      <div className=" col-span-4  flex flex-col gap-2 font-semibold">
        <p className="font-semibold">
          {title} {description}
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
