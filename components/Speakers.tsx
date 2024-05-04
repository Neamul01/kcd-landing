"use client";
import SpeakerCard from "@/MUI/SpeakerCard";
import axiosInstance from "@/lib/Axios";
import { useEffect, useState } from "react";
import Loader from "./Shared/Loader";
import SectionLayout from "./layout/SectionLayout";
import { Participant } from "./dashboard/speakers/ParticipantsTable";
import { participantsEnums } from "@/constants/participants";

export default function Speakers() {
  const [keynoteSpeakers, setKeyNoteSpeakers] = useState<Participant[]>([]);
  const [eventSpeakers, setEventSpeakers] = useState<Participant[]>([]);
  const [panelSpeakers, setPanelSpeakers] = useState<Participant[]>([]);
  const [workshopSpeakers, setWorkshopSpeakers] = useState<Participant[]>([]);
  const [error, setError] = useState<string>();
  // TODO: handle errors here

  const getKeynoteSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        "/participants?sort=displayId&role=key-note-speaker"
      );

      // Handle the response data here
      setKeyNoteSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    }
  };

  useEffect(() => {
    getKeynoteSpeakers();
  }, []);

  const getEventSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        "/participants?sort=displayId&role=event-speaker"
      );

      // Handle the response data here
      setEventSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    }
  };

  const getPanelSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        `/participants?sort=displayId&role=${participantsEnums.panelSpeaker}`
      );

      // Handle the response data here
      setPanelSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    }
  };
  const getWorkshopSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        `/participants?sort=displayId&role=${participantsEnums.workshopSpeaker}`
      );

      // Handle the response data here
      setWorkshopSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    }
  };

  useEffect(() => {
    getEventSpeakers();
    getPanelSpeakers();
    getWorkshopSpeakers();
  }, []);

  return (
    <div id="speakers">
      <SectionLayout title={"Keynote Speakers"} className="">
        {keynoteSpeakers ? (
          <div className="grid auto-rows-fr grid-cols-1 items-center lg:grid-cols-3 gap-y-20 md:gap-y-20 max-w-sectionLayout mx-auto mt-6 md:mt-12">
            {keynoteSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm flex items-center justify-center">
            Something went wrong.
          </p>
        ) : (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {eventSpeakers ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {eventSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : error ? (
          <p className="text-sm flex items-center justify-center">
            Something went wrong.
          </p>
        ) : (
          <Loader />
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Panel Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {panelSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {panelSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-xs text-center">{error}</p>
        ) : (
          <Loader />
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Workshop Speaker"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {workshopSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {panelSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500 text-xs text-center">{error}</p>
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
