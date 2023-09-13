"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useState } from "react";
import { TbPhoto } from "react-icons/tb";
import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";

export default function Home() {
  const [image, setImage] = useState<Photo>();

  const readAsBase64 = async (photo: Photo) => {
    // Fetching the photo, reading it as a blob and then converting it into base 64 format.
    if (Capacitor.isNativePlatform()) {
      const file = await Filesystem.readFile({
        path: photo.path as string,
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath as string);
      const blob = await response.blob();
      return (await convertBlobToBase64(blob)) as string;
    }
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const savePhoto = async (photo: Photo) => {
    // conver the phtoto to a base64 format, required by the Filesystem API to save.
    const base64Data = await readAsBase64(photo);

    // Write the data into the data directory.
    const filename = Date.now() + ".jpeg";
    const savedfile = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Data,
    });

    // To view the image, load it from the webpath since its already loaded into memory
    return {
      filepath: filename,
      webviewPath: photo.webPath,
    };
  };

  const takePhoto = async () => {
    try {
      setImage(
        await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.DataUrl,
        }),
      );
      if (image) {
        await savePhoto(image);
      }
    } catch (e) {
      return;
    }
  };
  return (
    <PageContainer>
      <div className="flex-grow flex flex-col justify-end gap-5">
        {image ? (
          <div className="border rounded-lg shadow-md border-black/20 bg-gray-200">
            <BoundingBox
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="w-auto h-auto"
                  src={image.dataUrl}
                  alt="Captured image"
                />
              }
            />
          </div>
        ) : (
          <div className="flex-grow bg-gray-200 rounded border border-black/20 flex items-center justify-center">
            <TbPhoto aria-hidden className="text-3xl" />
          </div>
        )}

        <Button onClick={takePhoto}>Capture</Button>

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
      </div>
    </PageContainer>
  );
}
