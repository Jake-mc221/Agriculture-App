import React from "react";
import { Button } from "./Button";
import Link from "next/link";
import { BsArrowRepeat } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { PhotoContext } from "@/app/context";
import { useContext } from "react";

export function TopBar() {
  const { takePhoto } = useContext(PhotoContext);
  const { images } = useContext(PhotoContext);
  return (
    <div className="w-full h-10 flex bg-black justify-between">
      {/*Back button */}
      <Button
        className="text-green-400 m-2"
        intent="unstyled"
        component={Link}
        href="/"
      >
        Back
      </Button>

      <div className="flex gap-3">
        {/*Retake photo button*/}
        <Button
          className="text-white flex justify-end opacity-60"
          intent="unstyled"
          component={Link}
          onClick={async () => {
            delete images[images.length - 1];
            await takePhoto();
          }}
          href="/capture"
        >
          <BsArrowRepeat className="m-auto self-center text-2xl justify-center" />
        </Button>

        {/*Go to gallery button*/}
        <Button
          className="text-white flex justify-end mr-1 opacity-60"
          intent="unstyled"
          component={Link}
          href="/gallery"
        >
          <RiGalleryLine className="m-auto self-center text-2xl justify-center" />
        </Button>
      </div>
    </div>
  );
}
