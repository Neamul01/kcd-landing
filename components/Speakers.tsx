import React from "react";
import SectionLayout from "./layout/SectionLayout";
import SpeakerCard from "@/MUI/SpeakerCard";

export default function Speakers() {
  return (
    <div>
      <SectionLayout title={"Keynote Speakers"} className="bg-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16">
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
    name: "Susanth Kurunthil",
    industry: "Infopark, Kochi & Cyberpark Kozhikode",
    position: "CEO",
    imageUrl: "/speakers/susanth.jpg",
  },
  {
    id: 2,
    name: "Sudheesh C Sudhakaran",
    industry: "VMware by Broadcom",
    position: "Engineering Leader",
    imageUrl: "/speakers/sudheesh.jpg",
  },
  {
    id: 3,
    name: "Akash T.K",
    industry: "ZOHO",
    position: "Senior Presales Consultant",
    imageUrl: "/speakers/akash.jpg",
  },
  {
    id: 4,
    name: "Rahul Sreenivasan",
    industry: "Red Hat India and SA",
    position: "Solution Sales Specialist",
    imageUrl: "/speakers/rahuls.jpg",
  },
  {
    id: 5,
    name: "Mumshad Mannambeth",
    industry: "KodeKloud",
    position: "Founder & CEO",
    imageUrl: "/speakers/mumshad.jpg",
  },
  {
    id: 6,
    name: "Deepak Ranjan Mishra",
    industry: "Prodevans Technologies",
    position: "Founder,CEO",
    imageUrl: "/speakers/deepak.jpg",
  },
];
