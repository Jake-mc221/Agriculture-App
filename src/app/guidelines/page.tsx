import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Button } from "@/components/common/Button";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CaptureGuidelines() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="m-5">Capture Guidelines</h1>

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
        <div className="bg-green-500 rounded-full p-2 mt-2">
          <TiTick className="text-white" />
        </div>
        <p className="mt-2 font-bold text-lg">Full crop from overhead</p>
      </div>

      <div className="flex justify-between m-2 space-x-5">
        <div className="flex flex-col items-center h-40">
          <img
            src="/images/cauliflower_far.jpg"
            alt="Photo of cauliflower field."
            className="rounded-3xl w-full h-full object-cover"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Too far away</p>
        </div>
        <div className="flex flex-col items-center h-40">
          <img
            src="/images/cauliflower_close.jpg"
            alt="Photo of close up cauliflower plant."
            className="rounded-3xl w-full h-full object-cover"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Too close</p>
        </div>
        <div className="flex flex-col items-center h-40">
          <img
            src="/images/cauliflower_low_angle.jpg"
            alt="Photo of cauliflower seedling from a low angle."
            className="rounded-3xl w-full h-full object-cover"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Wrong angle</p>
        </div>
      </div>

      <Button className="m-20" component={Link} href="/capture">
        Continue
      </Button>
    </div>
  );
}
