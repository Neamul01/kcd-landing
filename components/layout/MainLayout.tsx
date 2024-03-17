import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-layout mx-auto">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
