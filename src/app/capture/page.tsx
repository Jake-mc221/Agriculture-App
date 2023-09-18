"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";
import { TbPhoto } from "react-icons/tb";
import Link from "next/link";
import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { MdInfo } from "react-icons/md";
export default function Home() {
  const { image, takePhoto } = usePhotoGallery();
  return (
    <PageContainer>
      <div className="flex-grow flex flex-col justify-end gap-5">
        {image ? (
          <div className="border rounded-lg shadow-md border-black/20 bg-gray-200 p-`">
            <BoundingBox
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.webPath} alt="Captured image" />
              }
            />
          </div>
        ) : (
          <div className="flex-grow bg-gray-200 rounded border border-black/20 flex items-center justify-center">
            <TbPhoto aria-hidden className="text-3xl" />
          </div>
        )}

        <div className="flex justify-between mx-20">
          <Button onClick={takePhoto}>Capture</Button>

          <Button intent="unstyled" component={Link} href="/guidelines">
            <MdInfo className="text-primary w-10 h-10" />{" "}
          </Button>
        </div>

        <ComboBox
          label="Crop Type"
          options={[{ name: "Crop 1" }, { name: "Crop 2" }, { name: "Crop 3" }]}
          getOptionName={(option) => option.name}
        />
        <ComboBox
          label="Soil Type"
          options={[{ name: "Soil 1" }, { name: "Soil 2" }, { name: "Soil 3" }]}
          getOptionName={(option) => option.name}
        />
        <Button intent="secondary" component={Link} href="/gallery">
          Queue
        </Button>
      </div>
    </PageContainer>
  );
}
