import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { Button } from "@/components/common/Button";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function CaptureGuidelines() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="m-5">Capture Guidelines</h1>
      <div className="flex flex-col items-center w-full h-full">
        <img
          src="/images/cauliflower.jpg"
          alt="Cauliflower"
          className="rounded-3xl w-80 mx-auto"
        />
        <div className="bg-green-500 rounded-full p-2 mt-2">
          <TiTick className="text-white" />
        </div>
        <p className="m-5 text-center">Good Photo</p>
      </div>

      <div className="flex justify-between mx-2 space-x-5">
        <div className="flex flex-col items-center w-full h-full">
          <img
            src="/images/cauliflower_far.jpg"
            alt="Crop photo from too far away."
            className="rounded-3xl w-40 h-30"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Too Far Away</p>
        </div>
        <div className="flex flex-col items-center w-full h-full">
          <img
            src="/images/cauliflower_close.jpg"
            alt="Crop photo from too close."
            className="rounded-3xl w-40 h-30"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Too Close</p>
        </div>
        <div className="flex flex-col items-center w-full h-full">
          <img
            src="/images/multiple_veges.jpg"
            alt="Multiple crop types"
            className="rounded-3xl w-40 h-30"
          />
          <div className="bg-red-500 rounded-full p-2 mt-2">
            <RxCross2 className="text-white" />
          </div>
          <p className="mt-2">Multiple Crop Types</p>
        </div>
      </div>

      <Button className="m-10" component={Link} href="/capture">
        Continue
      </Button>
    </div>
  );
}
