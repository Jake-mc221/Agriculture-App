"use client";
import { PageContainer } from "@/components/common/PageContainer";
import { usePhotoGallery } from "@/hooks/usePhotoGallery";
import { PhotoGallery } from "@/components/common/PhotoGallery";

export default function Home() {
  const { images } = usePhotoGallery();
  return (
    <PageContainer>
      <PhotoGallery images={images} />
    </PageContainer>
  );
}
