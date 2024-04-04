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
    name: "aamarpay",
    icon: "/sponsors/aamarpay_logo.webp",
    link: "https://www.aamarpay.com/",
  },
];
const silverSponsors = [
  {
    id: "2",
    name: "apps-code",
    icon: "/sponsors/apps-code-logo.png",
    link: "https://appscode.com/",
  },
];

const goldSponsors = [
  {
    id: "3",
    name: "nhq",
    icon: "/sponsors/nhq_logo.jpg",
    link: "https://www.nhqbd.com/",
  },
  {
    id: "4",
    name: "nhq",
    icon: "/sponsors/upstra_logo.webp",
    link: "https://upstra.com/",
  },
];

const bronzeSponsors = [
  {
    id: "5",
    name: "brilliant-cloud",
    icon: "/sponsors/brilliant_cloud_logo.png",
    link: "https://intercloud.com.bd/",
  },
];

const platinumSponsors = [
  {
    id: "6",
    name: "aes",
    icon: "/sponsors/anwar_enterprise_systems_ltd_logo.png",
    link: "https://cloudaes.com/",
  },
  {
    id: "7",
    name: "astha",
    icon: "/sponsors/astha_logo.png",
    link: "https://www.asthait.com/",
  },
  {
    id: "8",
    name: "klover",
    icon: "/sponsors/klover_logo.png",
    link: "https://www.klovercloud.com/",
  },
  {
    id: "9",
    name: "f5",
    icon: "/sponsors/f5_logo.png",
    link: "https://www.f5.com/",
  },
];

const Community = [
  {
    id: "15d",
    name: "kode-kloud",
    icon: "/sponsors/kode-Kloud.svg",
    link: "https://kode.wiki/4aCna7r",
  },
  {
    id: "10",
    name: "amazon-web-services",
    icon: "/sponsors/amazon-web-services.webp",
    link: "https://www.facebook.com/groups/AWSBangladesh/",
  },
  {
    id: "11",
    name: "cncf-logo",
    icon: "/sponsors/cncf-logo.webp",
    link: "https://community.cncf.io/cloud-native-dhaka/",
  },
  {
    id: "12",
    name: "dcm-logo",
    icon: "/sponsors/dev_change_maker.webp",
    link: "https://www.linkedin.com/company/devchangemakers/",
  },
  {
    id: "13",
    name: "tensorflow-user-group-bangladesh",
    icon: "/sponsors/tensorflow-user-group-bangladesh.webp",
    link: "https://www.facebook.com/groups/tfugbd/",
  },
  {
    id: "14",
    name: "BDSAF",
    icon: "/sponsors/BDSAF_Logo.webp",
    link: "https://bdsaf.org",
  },
];

const Media = [
  {
    id: "15",
    name: "kode-kloud",
    icon: "/sponsors/kode-Kloud.svg",
    link: "https://kode.wiki/4aCna7r",
  },
  {
    id: "16",
    name: "kube",
    icon: "/sponsors/kube_logo.svg",
    link: "https://kube.careers/",
  },
  {
    id: "17",
    name: "kube-event",
    icon: "/sponsors/kube-event_logo.svg",
    link: "https://kube.events/",
  },
];
