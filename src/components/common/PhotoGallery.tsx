import { ImageType } from "@/types/ImageType";
import React from "react";
import { PageContainer } from "./PageContainer";

export function PhotoGallery({ images }: { images: ImageType[] }) {
  return (
    <PageContainer>
      <div className="flex flex-wrap gap-5 justify-center items-center">
        {images.map((photo, key) => (
          <div
            key={key}
            className="w-20 h-32 rounded bg-gray-200 border-black/20 border"
          >
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.webPath}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
