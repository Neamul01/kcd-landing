import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-layout mx-auto px-2">
      <div className="w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
