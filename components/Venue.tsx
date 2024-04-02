import React from "react";
import SectionLayout from "./layout/SectionLayout";
import ImageGallery from "@/MUI/ImageGallery";

export default function Venue() {
  return (
    <div id="venue">
      <SectionLayout paddingBottom title={"Venue"} className="bg-gray-200">
        <div className="max-w-sectionLayout mx-auto px-2">
          <div className="flex items-center justify-center">
            <ImageGallery />
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
