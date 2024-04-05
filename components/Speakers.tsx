"use client";
import SpeakerCard from "@/MUI/SpeakerCard";
import axiosInstance from "@/lib/Axios";
import { useEffect, useState } from "react";
import Loader from "./Shared/Loader";
import SectionLayout from "./layout/SectionLayout";
import { Participant } from "./dashboard/speakers/ParticipantsTable";

export default function Speakers() {
  const [keynoteSpeakers, setKeyNoteSpeakers] = useState<Participant[]>([]);
  const [eventSpeakers, setEventSpeakers] = useState<Participant[]>([]);

  console.log(eventSpeakers);

  const getKeynoteSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        "/participants?role=key-note-speaker"
      );

      // Handle the response data here
      setKeyNoteSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  useEffect(() => {
    getKeynoteSpeakers();
  }, []);

  const getEventSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        "/participants?role=event-speaker"
      );

      // Handle the response data here
      setEventSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  useEffect(() => {
    getEventSpeakers();
  }, []);

  return (
    <div id="speakers ">
      <SectionLayout title={"Keynote Speakers"} className="">
        {keynoteSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20 max-w-sectionLayout mx-auto mt-6 md:mt-12">
            {keynoteSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {eventSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {eventSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <Loader />
        )}
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
