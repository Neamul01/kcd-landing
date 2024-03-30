import React from "react";
import SectionLayout from "./layout/SectionLayout";

function Welcome() {
  return (
    <div id="about-us">
      <SectionLayout paddingBottom title={"Welcome to KCD Dhaka"}>
        <p className="max-w-sectionLayout text-center text-black/90 mx-auto">
          Join us at KCD Dhaka on May 11th, 2024, for a day of cutting-edge
          talks and networking. Whether you&apos;re a developer, operations
          expert, or IT professional, this is your chance to shape the future of
          cloud-native technology. Supported by the CNCF, mark your calendars
          and let&apos;s innovate together in Dhaka, Bangladesh!
        </p>
      </SectionLayout>
    </div>
  );
}

export default Welcome;
