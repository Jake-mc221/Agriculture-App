"use client";
import { PageContainer } from "@/components/common/PageContainer";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";

export default function Home() {
  const { images } = usePhotoGallery();
  return (
    <PageContainer>
      <div className="flex-grow">
        <div className="flex h-full flex-wrap gap-5">
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
      </div>
    </PageContainer>
  );
}
