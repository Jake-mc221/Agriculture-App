"use client";

import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useCallback, useContext } from "react";
import { PhotoContext } from "@/app/context";
import { useRouter } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
export default function CaptureGuidelines() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full h-screen">
      <h1 className="mb-4 pt-5">Capture Guidelines</h1>

      <div className="flex flex-col items-center w-full h-full m-2">
        <img
          src="/images/cauliflower.jpg"
          alt="Photo of cauliflower plant from bird's eye view."
          className="rounded-3xl w-64 m-2"
        />
        <img
          src="/images/cauliflower_seedling.jpg"
          alt="Photo of cauliflower seeding from bird's eye view."
          className="rounded-3xl w-64 m-2"
        />
        <TiTick className="bg-green-500 rounded-full mt-2 w-8 h-8 p-2 text-white" />
        <p className="my-2 font-bold text-lg">Full crop from overhead</p>
      </div>

      <div className="flex justify-between m-1 space-x-5">
        <div className="flex flex-col items-center h-52">
          <img
            src="/images/cauliflower_far.jpg"
            alt="Photo of cauliflower field."
            className="rounded-3xl w-full h-full object-cover"
          />
          <RxCross2 className="bg-red-500 flex-shrink-0 rounded-full mt-2 w-6 h-6 p-2 text-white" />
          <p className="mt-2 text-center">Too far away</p>
        </div>
        <div className="flex flex-col items-center h-52">
          <img
            src="/images/cauliflower_close.jpg"
            alt="Photo of close up cauliflower plant."
            className="rounded-3xl w-full h-full object-cover"
          />
          <RxCross2 className="bg-red-500 flex-shrink-0 mt-2 rounded-full w-6 h-6 p-2 text-white" />
          <p className="mt-2">Too close</p>
        </div>
        <div className="flex flex-col items-center h-52">
          <img
            src="/images/cauliflower_low_angle.jpg"
            alt="Photo of cauliflower seedling from a low angle."
            className="rounded-3xl w-full h-full object-cover"
          />
          <RxCross2 className="bg-red-500 flex-shrink-0 mt-2 rounded-full w-6 h-6 p-2 text-white" />

          <p className="mt-2">Wrong angle</p>
        </div>
      </div>

      <Button
        className="my-14"
        onClick={() => router.back()}
      >
        Continue
      </Button>
    </div>
  );
}
