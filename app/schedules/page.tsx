import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="max-w-layout mx-auto my-[150px]">
      <div className="flex items-center flex-col justify-center mb-10 gap-2">
        <h2 className="text-center text-4xl font-playfair font-semibold text-primary">
          Schedules
        </h2>
        <span className="w-24 h-[5px] rounded-xl bg-secondary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-5">
        {scheduleImages.map((image) => (
          <div
            key={image.id}
            className="col-span-1 rounded-lg overflow-hidden w-[600px]"
          >
            <Image src={image.image} alt="schedule" height={1600} width={600} />
          </div>
        ))}
      </div>
    </div>
  );
}

const scheduleImages = [
  {
    id: 0,
    image: "/schedules/schedule-1.jpeg",
  },
  {
    id: 1,
    image: "/schedules/schedule-2.jpeg",
  },
  {
    id: 2,
    image: "/schedules/schedule-3.jpeg",
  },
  {
    id: 3,
    image: "/schedules/schedule-4.jpeg",
  },
];
