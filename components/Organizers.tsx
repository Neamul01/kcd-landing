import React from "react";
import SectionLayout from "./layout/SectionLayout";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Organizers() {
  return (
    <div id="organizers">
      <SectionLayout paddingBottom title={"Organizers"}>
        <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-10 md:gap-y-5">
            {OrganizersList.map((sponsor) => (
              <div
                className="bg-transparent h-[354px] px-4 flex items-center justify-between flex-col"
                key={sponsor.id}
              >
                <Image
                  alt="Organizer"
                  src={sponsor.imageUrl}
                  height={216}
                  width={160}
                  className="rounded-full"
                />
                <div className="flex flex-col items-center justify-center gap-3">
                  <p className="font-bold text-sm">{sponsor.name} </p>
                  <p className="text-base">{sponsor.designation} </p>
                  <p className="text-xs">{sponsor.position} </p>
                </div>
                <p className="text-blue-600 flex items-center justify-center gap-2">
                  {/* <FaTwitter size={25} /> */}
                  <FaLinkedinIn size={25} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout>
      {/* <SectionLayout paddingBottom title={"Event Team"}>
        <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10  gap-y-10 md:gap-y-5">
            {Event.map((sponsor) => (
              <div
                className="bg-transparent h-[354px] px-4 flex items-center justify-between flex-col"
                key={sponsor.id}
              >
                <Image
                  alt="Organizer"
                  src={sponsor.imageUrl}
                  height={216}
                  width={160}
                  className="rounded-full"
                />
                <p className="font-bold text-sm">{sponsor.name} </p>
                <p className="text-base">{sponsor.designation} </p>
                <p className="text-xs">{sponsor.position} </p>
                <p className="text-blue-600 flex items-center justify-center gap-2">
                  <FaTwitter size={25} />
                  <FaLinkedinIn size={25} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionLayout> */}
      <SectionLayout paddingBottom title={"Volunteers"}>
        <div className="max-w-sectionLayout text-center text-black/90 mx-auto gap-2 flex flex-col">
          {/* <p>
            We are seeking dedicated and passionate individuals to join us as
            volunteers.
          </p>
          <p>
            Feel free to share your proposal with us by submitting it
            <a href="#" className="text-primary underline pl-1">
              here
            </a>
          </p> */}
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
