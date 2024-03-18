import React from "react";
import SectionLayout from "../layout/SectionLayout";
import FAQ from "@/MUI/FAQ";

export default function FAQSection() {
  return (
    <div id="faq">
      <SectionLayout paddingBottom title={"FAQ"}>
        <div className="max-w-sectionLayout mx-auto mt-6 md:mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <FAQ />
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
