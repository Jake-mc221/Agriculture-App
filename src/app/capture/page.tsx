"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { Select } from "@/components/common/Select";
import { usePhotoGallery } from "@/components/common/usePhotoGallery";
import { TbPhoto } from "react-icons/tb";
import Link from "next/link";
export default function Home() {
  const { image, takePhoto } = usePhotoGallery();
  return (
    <PageContainer>
      <div className="w-full flex-grow flex flex-col gap-5">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image.webPath}
            width={200}
            height={200}
            alt="Captured image"
          />
        ) : (
          <div className="flex-1 bg-gray-200 rounded border border-black/20 flex items-center justify-center">
            <TbPhoto aria-hidden className="text-3xl" />
          </div>
        )}
        <Button onClick={takePhoto}>Capture</Button>
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
        <Button intent="primary" component={Link} href="/gallery">
          gallery
        </Button>
      </div>
    </PageContainer>
  );
}
