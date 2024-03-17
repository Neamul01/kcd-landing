import React from "react";
import SectionLayout from "./layout/SectionLayout";
import IconCard from "./Shared/IconCard";
import Image from "next/image";

export default function Sponsors() {
  return (
    <div className="bg-[url('/b3.jpg')] bg-cover bg-no-repeat bg-center  ">
      <div className="h-full bg-gradient-to-t from-black/50 to-black/50 text-white">
        <SectionLayout title={"Sponsors & Partners"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {sponsors.map((sponsor) => (
                <IconCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </SectionLayout>
        <SectionLayout title={"Innovation Catalysts"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {Innovation.map((sponsor) => (
                <IconCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </SectionLayout>

        <SectionLayout title={"Scholarship Sponsors"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {Scholarship.map((sponsor) => (
                <div
                  className="bg-transparent w-[290px] h-[354px] px-4 flex items-center justify-between flex-col"
                  key={sponsor.id}
                >
                  <p className="text-secondary font-semibold text-center">
                    {sponsor.title}
                  </p>
                  <Image
                    alt="sponsor"
                    src={sponsor.imageUrl}
                    height={216}
                    width={160}
                    className="rounded-full"
                  />
                  <p className="font-bold text-sm">{sponsor.name} </p>
                  <p className="text-base">{sponsor.designation} </p>
                  <p className="text-xs">{sponsor.position} </p>
                </div>
              ))}
            </div>
          </div>
        </SectionLayout>

        <SectionLayout title={"Community Partners"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {Community.map((sponsor) => (
                <IconCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </SectionLayout>
        <SectionLayout paddingBottom title={"Media Partners"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {Media.map((sponsor) => (
                <IconCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </SectionLayout>
      </div>
    </div>
  );
}

const Scholarship = [
  {
    id: 1,
    title: "Student",
    name: "Sudheesh C Sudhakaran",
    designation: "VMware by Broadcom",
    position: "Engineering Leader",
    imageUrl: "/sponsors/sudheesh.jpg",
  },
  {
    id: 2,
    title: "Diversity",
    name: "Kiran Mova",
    designation: "Independent",
    position: "Open Source Advocate",
    imageUrl: "/sponsors/kiran.jpg",
  },
];

const sponsors = [
  {
    id: "1",
    name: "24_7",
    icon: "/sponsors/24_7.png",
  },
  {
    id: "2",
    name: "redhat",
    icon: "/sponsors/redhat.png",
  },
  {
    id: "3",
    name: "prodevans",
    icon: "/sponsors/prodevans.png",
  },
  {
    id: "4",
    name: "kodekloud",
    icon: "/sponsors/kodekloud.png",
  },
  {
    id: "5",
    name: "federalbank",
    icon: "/sponsors/federalbank.png",
  },
  {
    id: "6",
    name: "flexicloud",
    icon: "/sponsors/flexicloud.png",
  },
  {
    id: "7",
    name: "rezoomex",
    icon: "/sponsors/rezoomex.png",
  },
];

const Innovation = [
  {
    id: "1",
    name: "accuknox",
    icon: "/sponsors/accuknox.png",
  },
  {
    id: "2",
    name: "harness",
    icon: "/sponsors/harness.png",
  },
  {
    id: "3",
    name: "cloudera",
    icon: "/sponsors/cloudera.png",
  },
  {
    id: "4",
    name: "siglens",
    icon: "/sponsors/siglens.png",
  },
  {
    id: "5",
    name: "cazelabs",
    icon: "/sponsors/cazelabs.png",
  },
  {
    id: "6",
    name: "knownhost",
    icon: "/sponsors/knownhost.png",
  },
  {
    id: "7",
    name: "ambersand",
    icon: "/sponsors/ambersand.png",
  },
];

const Community = [
  {
    id: "1",
    name: "woman",
    icon: "/sponsors/woman.png",
  },
  {
    id: "2",
    name: "kong",
    icon: "/sponsors/kong.png",
  },
  {
    id: "3",
    name: "soda",
    icon: "/sponsors/soda.png",
  },
  {
    id: "4",
    name: "ccici",
    icon: "/sponsors/ccici.png",
  },
  {
    id: "5",
    name: "libre",
    icon: "/sponsors/libre.png",
  },
  {
    id: "6",
    name: "kube_bir",
    icon: "/sponsors/kube_bir.png",
  },
];

const Media = [
  {
    id: "1",
    name: "kube_events",
    icon: "/sponsors/kube_events.png",
  },
  {
    id: "2",
    name: "kube_careers",
    icon: "/sponsors/kube_careers.png",
  },
  {
    id: "3",
    name: "kappiri",
    icon: "/sponsors/kappiri.png",
  },
];
