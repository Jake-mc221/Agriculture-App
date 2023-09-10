"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { Select } from "@/components/common/Select";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const [image, setImage] = useState<Photo>();

  return (
    <PageContainer>
      <div className="w-full flex-grow flex flex-col gap-5">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.dataUrl}
            width={200}
            height={200}
            alt="Captured image"
          />
        ) : (
          <div className="flex-1 bg-gray-200 rounded border border-black/20 flex items-center justify-center">
            <TbPhoto aria-hidden className="text-3xl" />
          </div>
        )}

        <div className="flex justify-between mx-12">
          <Button
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
          <Button intent="unstyled" component={Link} href="/guidelines">
            <MdInfo className="text-primary w-10 h-10" />{" "}
          </Button>
        </div>

        <Select label="Crop Type">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </Select>

        <Select label="Soil Type">
          <option>Soil1</option>
          <option>Soil2</option>
          <option>Soil3</option>
        </Select>
      </div>
    </PageContainer>
  );
}
