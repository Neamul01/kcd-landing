import React from "react";
import SectionLayout from "./layout/SectionLayout";

function Welcome() {
  return (
    <div id="about-us">
      <SectionLayout paddingBottom title={"Welcome to KCD Kerala"}>
        <p className="max-w-sectionLayout text-center text-black/90 mx-auto">
          We&apos;re thrilled to announce the first-ever KCD Kerala event, set
          to take place in Kochi on 3rd February 2024! This groundbreaking
          gathering brings together the vibrant Kubernetes and cloud-native
          community in the region for an enriching day technical conference.
          Dive into a world of exciting talks, connect with like-minded
          professionals, and broaden your horizons in the realm of cloud-native
          technologies. Whether you&apos;re a developer, an operations expert,
          or an IT professional with a passion for innovation, KCD Kerala
          promises an incredible experience. Join us in shaping the future of
          cloud-native technology, supported by the CNCF. Mark your calendars
          for February 3rd, and let&apos;s embark on this journey together!
        </p>
      </SectionLayout>
    </div>
  );
}

export default Welcome;
