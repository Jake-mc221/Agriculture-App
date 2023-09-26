"use client";
import { PageContainer } from "@/components/common/PageContainer";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";

export default function Home() {
  const { images } = usePhotoGallery();
  return (
    <PageContainer>
      <h1 className="mx-auto text-green-600 mt-2"> Your Gallery </h1>
      <div className="grid-cols-3 m-10">
        <div className="flex h-full flex-wrap gap-5">
          {images.map((photo, key) => (
            <div
              key={key}
              className="w-20 h-32 rounded bg-gray-200 border-black/20 border"
            >
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo == null ? undefined : photo.webPath}
                alt="photo"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
