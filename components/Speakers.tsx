import React from "react";
import SectionLayout from "./layout/SectionLayout";
import SpeakerCard from "@/MUI/SpeakerCard";

export default function Speakers() {
  return (
    <div id="speakers">
      <SectionLayout title={"Keynote Speakers"} className="bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16 max-w-sectionLayout mx-auto ">
          {keynoteSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="bg-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16 max-w-sectionLayout mx-auto">
          {keynoteSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}

const keynoteSpeakers = [
  {
    id: 1,
    name: "MD Shahriyar Al Mustakim Mitul",
    industry: "Cloud Native Dhaka, CNCF Ambassador",
    position: "Lead Organizer",
    imageUrl: "/download.jpeg",
  },
  {
    id: 2,
    name: "Amir Hossain",
    industry: " BJIT Limited",
    position: "Head of DevSecOps & Cloud Engineering",
    imageUrl: "/download.jpeg",
  },
  {
    id: 3,
    name: "Md Arif Hossen",
    industry: "Banglalink",
    position: "Technical Cloud Architect Consultant",
    imageUrl: "/download.jpeg",
  },
];
