"use client";

import React, { useEffect, useState } from "react";
import SectionLayout from "./layout/SectionLayout";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import axiosInstance from "@/lib/Axios";
import { Participant } from "./dashboard/speakers/ParticipantsTable";
import { Button } from "@mui/material";
import Loader from "./Shared/Loader";
import Link from "next/link";

export default function Organizers() {
  const [organizers, setOrganizers] = useState<Participant[]>();
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setError("");
      await axiosInstance
        .get("/participants?role=organizer&sort=displayId")
        .then((response) => {
          console.log("organizers", response.data.data);
          setOrganizers(response.data.data);
        })
        .catch((err) => setError(err));

      // Handle the response data here
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div id="organizers">
      <SectionLayout paddingBottom title={"Organizers"}>
        <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-y-10 md:gap-y-10">
            {organizers ? (
              organizers.map((sponsor) => (
                <div
                  className="bg-transparent w-[300px] h-[354px] px-4 flex items-center justify-between flex-col"
                  key={sponsor._id}
                >
                  <div className="h-[170px] w-[170px] overflow-hidden rounded-full border-8 border-primary">
                    <Image
                      alt="Organizer"
                      src={
                        sponsor.photo
                          ? `${process.env.NEXT_PUBLIC_CDN_BASE_URL}/${sponsor.photo}`
                          : "/download.jpeg"
                      }
                      height={170}
                      width={170}
                      className=""
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="font-medium text-lg text-center">
                      {sponsor.name}
                    </p>
                    <p className="text-base text-center">
                      {sponsor.designation}
                    </p>
                    <p className="text-sm text-center">
                      {sponsor.organization}
                    </p>
                  </div>
                  <Link
                    href={sponsor.sponsor_link ? sponsor.sponsor_link : "#"}
                    target="_blank"
                    className="text-blue-600 flex items-center justify-center gap-2 mt-2"
                  >
                    {/* <FaTwitter size={25} /> */}
                    <FaLinkedinIn size={25} />
                  </Link>
                </div>
              ))
            ) : error ? (
              <p className="text-sm flex items-center justify-center">
                Something went wrong.
              </p>
            ) : (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}

const OrganizersList = [
  {
    id: 1,
    title: "Student",
    name: "Sudheesh C Sudhakaran",
    designation: "VMware by Broadcom",
    position: "Engineering Leader",
    imageUrl: "/download.jpeg",
  },
  {
    id: 2,
    title: "Diversity",
    name: "Kiran Mova",
    designation: "Independent",
    position: "Open Source Advocate",
    imageUrl: "/download.jpeg",
  },
  {
    id: 3,
    title: "Student",
    name: "Sudheesh C Sudhakaran",
    designation: "VMware by Broadcom",
    position: "Engineering Leader",
    imageUrl: "/download.jpeg",
  },
  {
    id: 4,
    title: "Diversity",
    name: "Kiran Mova",
    designation: "Independent",
    position: "Open Source Advocate",
    imageUrl: "/download.jpeg",
  },
];
