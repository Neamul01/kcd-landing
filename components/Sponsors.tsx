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
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/aamarpay.png",
    link: "https://www.aamarpay.com/",
  },
];
const silverSponsors = [
  {
    id: "1",
    name: "apps-code",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/apps-code.png",
    link: "https://appscode.com/",
  },
];

const goldSponsors = [
  {
    id: "1",
    name: "nhq",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/nhq.jpg",
    link: "https://www.nhqbd.com/",
  },
  {
    id: "2",
    name: "nhq",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/Upstra.png",
    link: "https://upstra.com/",
  },
];

const bronzeSponsors = [
  {
    id: "1",
    name: "brilliant-cloud",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/brilliant-cloud.png",
    link: "https://intercloud.com.bd/",
  },
];

const platinumSponsors = [
  {
    id: "1",
    name: "aes",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/anwar_enterprise_systems_ltd.png",
    link: "https://cloudaes.com/",
  },
  {
    id: "2",
    name: "astha",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/astha_it.png",
    link: "https://www.asthait.com/",
  },
  {
    id: "3",
    name: "klover",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/klover.png",
    link: "https://www.klovercloud.com/",
  },
  {
    id: "4",
    name: "f5",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/f5.png",
    link: "https://www.f5.com/",
  },
];

const Community = [
  {
    id: "1",
    name: "amazon-web-services",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/amazon-web-services.png",
    link: "https://www.facebook.com/groups/AWSBangladesh/",
  },
  {
    id: "2",
    name: "cncf-logo",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/cncf-logo.png",
    link: "https://community.cncf.io/cloud-native-dhaka/",
  },
  {
    id: "3",
    name: "dcm-logo",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/dev_change_maker.png",
    link: "https://www.linkedin.com/company/devchangemakers/",
  },
  {
    id: "4",
    name: "tensorflow-user-group-bangladesh",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/tensorflow-user-group-bangladesh.png",
    link: "https://www.facebook.com/groups/tfugbd/",
  },
  {
    id: "5",
    name: "BDSAF",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/BDSAF_Logo.png",
    link: "https://bdsaf.org",
  },
];

const Media = [
  {
    id: "1",
    name: "kube",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/kube.svg",
    link: "https://kube.careers/",
  },
  {
    id: "2",
    name: "kube-event",
    icon: "https://d2sycsl2hirrcd.cloudfront.net/sponsors/kube-event.svg",
    link: "https://kube.events/",
  },
];

("https://d2sycsl2hirrcd.cloudfront.net/sponsors/Upstra.png");
("https://d2sycsl2hirrcd.cloudfront.net/sponsors/BDSAF.png");
