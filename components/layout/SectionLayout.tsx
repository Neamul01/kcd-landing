import React from "react";

function SectionLayout({
  children,
  paddingBottom = false,
  title,
  className,
}: {
  children: React.ReactNode;
  paddingBottom?: boolean;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-8 pt-[100px] ${
        paddingBottom ? "pb-[100px]" : ""
      } ${className ? className : ""}`}
    >
      <div>
        <h2 className="flex flex-col items-center justify-center gap-6 font-semibold text-center">
          <span className="text-3xl ">{title}</span>
          <span className="w-1/2 h-[5px] rounded-xl bg-secondary" />
        </h2>
      </div>
      <div className="">{children}</div>
    </div>
  );
}

export default SectionLayout;
