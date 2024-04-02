import React from "react";
import SectionLayout from "./layout/SectionLayout";
import IconCard from "./Shared/IconCard";
import Image from "next/image";

export default function Sponsors() {
  return (
    <div
      id="sponsors"
      className="bg-[url('/kcddhaka-bg.webp')] bg-cover bg-no-repeat bg-center  "
    >
      <div className="h-full bg-gradient-to-t from-black/50 to-black/50 text-white">
        <SectionLayout title={"Sponsors & Partners"}>
          <>
            <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="flex flex-col items-center justify-center gap-1 font-semibold text-center">
                  <span className="text-2xl uppercase ">Platinum</span>
                  <span className="w-1/2 h-[2px] rounded-xl bg-secondary" />
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                {platinumSponsors.length > 0 &&
                  platinumSponsors.map((sponsor) => (
                    <>
                      <IconCard key={sponsor.id} sponsor={sponsor} />
                    </>
                  ))}
              </div>
            </div>
            {/* -------------GOLD--------- */}
            <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="flex flex-col items-center justify-center gap-1 font-semibold text-center">
                  <span className="text-2xl uppercase ">GOLD</span>
                  <span className="w-1/2 h-[2px] rounded-xl bg-secondary" />
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                {goldSponsors.length > 0 &&
                  goldSponsors.map((sponsor) => (
                    <>
                      <IconCard key={sponsor.id} sponsor={sponsor} />
                    </>
                  ))}
              </div>
            </div>
            {/* -------------SILVER------------ */}
            <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="flex flex-col items-center justify-center gap-1 font-semibold text-center">
                  <span className="text-2xl uppercase ">SILVER</span>
                  <span className="w-1/2 h-[2px] rounded-xl bg-secondary" />
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                {silverSponsors.length > 0 &&
                  silverSponsors.map((sponsor) => (
                    <>
                      <IconCard key={sponsor.id} sponsor={sponsor} />
                    </>
                  ))}
              </div>
            </div>
            {/* -------------BRONZE------------ */}
            <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
              <div className="flex items-center justify-center mb-6">
                <h2 className="flex flex-col items-center justify-center gap-1 font-semibold text-center">
                  <span className="text-2xl uppercase ">BRONZE</span>
                  <span className="w-1/2 h-[2px] rounded-xl bg-secondary" />
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
                {bronzeSponsors.length > 0 &&
                  bronzeSponsors.map((sponsor) => (
                    <>
                      <IconCard key={sponsor.id} sponsor={sponsor} />
                    </>
                  ))}
              </div>
            </div>
          </>
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
        <SectionLayout paddingBottom title={"Payment Partner"}>
          <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {paymentPartner.map((sponsor) => (
                <IconCard key={sponsor.id} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </SectionLayout>
      </div>
    </div>
  );
}

const paymentPartner = [
  {
    id: "1",
    name: "redhat",
    icon: "/aamarpay.png",
  },
];
const silverSponsors = [
  {
    id: "1",
    name: "redhat",
    icon: "/sponsors/apps-code.png",
  },
];

const goldSponsors = [
  {
    id: "1",
    name: "redhat",
    icon: "/sponsors/nhq.jpg",
  },
];

const bronzeSponsors = [
  {
    id: "1",
    name: "redhat",
    icon: "/sponsors/brilliant-cloud.png",
  },
];

const platinumSponsors = [
  {
    id: "1",
    name: "24_7",
    icon: "/sponsors/AES.png",
  },
  {
    id: "2",
    name: "prodevans",
    icon: "/sponsors/astha.png",
  },
  {
    id: "3",
    name: "prodevans",
    icon: "/sponsors/klover.png",
  },
  {
    id: "4",
    name: "prodevans",
    icon: "/sponsors/f5.png",
  },
];

const Community = [
  {
    id: "1",
    name: "woman",
    icon: "/community/amazon-web-services.png",
  },
  {
    id: "2",
    name: "kong",
    icon: "/community/cncf-logo.png",
  },
  {
    id: "3",
    name: "soda",
    icon: "/community/dcm-logo.png",
  },
  {
    id: "4",
    name: "ccici",
    icon: "/community/tensorflow-user-group-bangladesh.png",
  },
];

const Media = [
  {
    id: "1",
    name: "kube_events",
    icon: "/media/kube.svg",
  },
  {
    id: "2",
    name: "kube_careers",
    icon: "/media/kube-event.svg",
  },
];
