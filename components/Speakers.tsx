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
  const [loading, setLoading] = useState(false);
  // TODO: handle errors here

  const getKeynoteSpeakers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/participants?sort=displayId&role=key-note-speaker"
      );

      // Handle the response data here
      setKeyNoteSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKeynoteSpeakers();
  }, []);

  const getEventSpeakers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "/participants?sort=displayId&role=event-speaker"
      );

      // Handle the response data here
      setEventSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPanelSpeakers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/participants?sort=displayId&role=${participantsEnums.panelSpeaker}`
      );

      // Handle the response data here
      setPanelSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getWorkshopSpeakers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/participants?sort=displayId&role=${participantsEnums.workshopSpeaker}`
      );

      // Handle the response data here
      setWorkshopSpeakers(response.data.data);
    } catch (error) {
      // Handle the error here
      setError("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
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
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-sm">{error}</p>
        ) : keynoteSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {keynoteSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm ">Coming soon...</p>
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-sm">{error}</p>
        ) : eventSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {eventSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm ">Coming soon...</p>
        )}
        {/* {eventSpeakers ? (
          eventSpeakers.length ? (
            <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
              {eventSpeakers.map((speaker) => (
                <SpeakerCard key={speaker._id} speaker={speaker} />
              ))}
            </div>
          ) : (
            <p className="text-center text-sm ">Coming soon...</p>
          )
        ) : error ? (
          <p className="text-sm flex items-center justify-center">
            Something went wrong.
          </p>
        ) : (
          <Loader />
        )} */}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Panel Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-sm">{error}</p>
        ) : panelSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {panelSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm ">Coming soon...</p>
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Workshop Speaker"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-sm">{error}</p>
        ) : workshopSpeakers.length ? (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {workshopSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm ">Coming soon...</p>
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
