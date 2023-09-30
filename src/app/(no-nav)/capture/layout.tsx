"use client";

import { TopBar } from "@/components/common/TopBar";

export default function ImageLayout({ children } : 
  { children: React.ReactNode}) {

  return (
    <div className="flex bg-black flex-col h-full w-full z-0">
      <TopBar />
      {children}
    </div>
  );
}
