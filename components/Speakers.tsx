"use client";
import SpeakerCard from "@/MUI/SpeakerCard";
import axiosInstance from "@/lib/Axios";
import { useEffect, useState } from "react";
import Loader from "./Shared/Loader";
import { Participant } from "./dashboard/speakers/ParticipantsTable";
import SectionLayout from "./layout/SectionLayout";

export default function Speakers() {
  const [keynoteSpeakers, setKeyNoteSpeakers] = useState<Participant[]>([]);
  const [eventSpeakers, setEventSpeakers] = useState<Participant[]>([]);
  const [error, setError] = useState<string>();

  // ------------------ Keynote Speakers --------------------------
  const getKeynoteSpeakers = async () => {
    try {
      const response = await axiosInstance.get(
        "/participants?role=key-note-speaker"
      );
      setKeyNoteSpeakers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    getKeynoteSpeakers();
  }, []);

  // ------------------ Event Speakers --------------------------
  const getEventSpeakers = async () => {
    try {
      await axiosInstance
        .get("/participants?role=event-speaker")
        .then((res) => {
          setEventSpeakers(res.data.data);
          console.log(res.data.data);
        })
        .catch((error) => {
          console.log(error.message);
          setError("Something went wrong");
        });
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    getEventSpeakers();
  }, []);

  return (
    <div id="speakers ">
      <SectionLayout title={"Keynote Speakers"}>
        {
          <>
            {error && (
              <div className="flex items-center justify-center">
                <p className="text-center text-xs text-red-500">{error}</p>
              </div>
            )}
            {!keynoteSpeakers && (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )}
          </>
        }
        {keynoteSpeakers && (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20 max-w-sectionLayout mx-auto mt-6 md:mt-12">
            {keynoteSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        )}
      </SectionLayout>
      <SectionLayout
        paddingBottom
        title={"Event Speakers"}
        className="max-w-sectionLayout mx-auto mt-6 md:mt-12"
      >
        {eventSpeakers.length && (
          <div className="flex flex-wrap items-center justify-center gap-y-20 md:gap-y-20">
            {eventSpeakers.map((speaker) => (
              <SpeakerCard key={speaker._id} speaker={speaker} />
            ))}
          </div>
        )}
      </SectionLayout>
    </div>
  );
}
