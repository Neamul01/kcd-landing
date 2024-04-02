import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white">
      <div className="max-w-layout mx-auto px-2">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
