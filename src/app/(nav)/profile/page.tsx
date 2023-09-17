"use client";

import { ProgressCircle } from "@/components/common/ProgressCircle";
import { useEffect, useState } from "react";
import NavigationBar from "@/components/core/NavigationBar";
import Link from "next/link";

export default function Profile() {
  const [userXp, setUserXp] = useState<number>(0);

  useEffect(() => {
    setUserXp(100);
  }, []);

  return (
    <div className="bg-primary min-h-[25rem] w-full flex flex-col items-center gap-10 p-10">
      <div className="absolute top-2 right-2">
        <Link href="/login" legacyBehavior>
          <a className="text-gray-200 hover:text-white">Logout</a>
        </Link>
      </div>
      <h1 className="text-gray-200">Profile</h1>
      <ProgressCircle
        initialValue={0}
        targetValue={userXp}
        updateMillis={10}
        progressColor="rgb(168 85 247)"
        backgroundColor="rgb(55 65 81)"
        pidGain={0.01}
        className="w-80 h-80"
      ></ProgressCircle>
      <footer>
        <NavigationBar></NavigationBar>
      </footer>
    </div>
  );
}
