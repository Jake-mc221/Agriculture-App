"use client";

import { Button } from "@/components/common/Button";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<Photo>();

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2 pb-20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image?.dataUrl ?? ""}
        width={200}
        height={200}
        alt="Captured image"
      />

      <label className="flex flex-col">
        Crop Type
        <select className="pl-6">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </select>
      </label>
      <label className="p-2 flex flex-col">
        Soil Type
        <select className="">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </select>
      </label>
      <Button
        className="bg-blue-500 hover:bg-blue-700"
        onClick={async () => {
          setImage(
            await Camera.getPhoto({
              quality: 90,
              allowEditing: false,
              resultType: CameraResultType.DataUrl,
            }),
          );
        }}
      >
        Capture
      </Button>
    </div>
  );
}
