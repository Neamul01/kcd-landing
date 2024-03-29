"use client";
import React, { useEffect, useState } from "react";
import SectionLayout from "./layout/SectionLayout";
import SpeakerCard from "@/MUI/SpeakerCard";
import Axios from "@/lib/Axios";

export default function Speakers() {
  const [speakers, setSpeakers] = useState();

  const getData = async () => {
    try {
      const response = await Axios.get("/participants?limit=10");

      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="speakers">
      <SectionLayout title={"Keynote Speakers"} className="bg-gray-200">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16 max-w-sectionLayout mx-auto ">
          {keynoteSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div> */}
        <p className="text-center text-primary w-full">
          Keynote Speakers update coming soon. Stay tuned to our website for
          details
        </p>
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="bg-gray-200"
      >
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 lg:gap-16 max-w-sectionLayout mx-auto">
          {keynoteSpeakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div> */}
        <p className="text-center text-primary w-full">
          Event Speakers update coming soon. Stay tuned to our website for
          details
        </p>
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
