import ScheduleTab from "@/MUI/ScheduleTab";
import React from "react";
import SectionLayout from "./layout/SectionLayout";

export default function Schedule() {
  return (
    <div id="schedule">
      <SectionLayout paddingBottom title={"Schedule"}>
        <div className="flex justify-start items-start w-full">
          <ScheduleTab />
        </div>
      </SectionLayout>
    </div>
  );
}
