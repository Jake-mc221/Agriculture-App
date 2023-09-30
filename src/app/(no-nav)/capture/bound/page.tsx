"use client"
import { PhotoContext } from "@/app/context";
import { useState, useContext } from "react";
import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { MdDone } from "react-icons/md";
import { Button } from "@/components/common/Button";
import Link from "next/link";

export default function Page() {
  const { images } = useContext(PhotoContext);
  const [dragging, setDragging] = useState(false);

  return (
    <>
    <div className="grow z-10">
      <BoundingBox
        image={
          // eslint-disable-next-line @next/next/no-img-element
          <img
          src={images[images.length - 1].webviewPath}
          className="object-cover"
          alt="Captured image"
          />
        }
        informDrag={setDragging}
        />
    </div>

    {!dragging && (
      <Button
        className="fixed bottom-16 right-10 p-2 rounded-full shadow-2xl text-white bg-gray-900 z-50"
        intent="unstyled"
        component={Link}
        href="label"
      >
        <MdDone className="h-12 w-12 " />
      </Button>)}

  </>

  );
}