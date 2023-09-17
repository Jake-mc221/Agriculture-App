"use client";
import { PageContainer } from "@/components/common/PageContainer";
import { usePhotoGallery } from "@/components/common/usePhotoGallery";
import PhotoGallery from "@/components/common/PhotoGallery";

export default function Home() {
  const { images } = usePhotoGallery();
  return (
    <PageContainer>
      <PhotoGallery ourimages={images} />
    </PageContainer>
  );
}
