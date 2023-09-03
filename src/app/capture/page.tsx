"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { Select } from "@/components/common/Select";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useEffect, useState } from "react";
import { TbPhoto } from "react-icons/tb";
import { Image } from "../types/Image";
import { Preferences } from "@capacitor/preferences";

const PHOTOS_PREF_KEY = "photos";

export default function Home() {
  const [image, setImage] = useState<Photo>();
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
      const photosInPrefs: Image[] = value ? JSON.parse(value) : [];

      if (Capacitor.isNativePlatform()) {
        for (const photo of photosInPrefs) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          photo.webviewPath = "data:image/jpeg:base64,${file.data}";
        }
      }
      setImages(photosInPrefs);
    };
    loadSaved();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      Preferences.set({ key: PHOTOS_PREF_KEY, value: JSON.stringify(images) });
    }
  }, [images]);

  {
    /** Helpful funciton for saving the images */
  }

  const readAsBase64 = async (photo: Photo) => {
    // Fetching the photo, reading it as a blob and then converting it into base 64 format.
    if (Capacitor.isNativePlatform()) {
      const file = await Filesystem.readFile({
        path: photo.path as string,
      });
      return file.data;
    } else {
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      return (await convertBlobToBase64(blob)) as string;
    }
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("method did not return a string");
        }
      };
      reader.readAsDataURL(blob);
    });

  const savePhoto = async (photo: Photo) => {
    // conver the phtoto to a base64 format, required by the Filesystem API to save.
    const base64Data = await readAsBase64(photo);

    // Wrtie the data into the data directory.
    const filename = Date.now() + ".jpeg";
    const savedfile = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Data,
    });
    console.log("~ savedFile:", savedfile);

    // To view the immage, load it from the webpath since its already loaded into memory
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
        const newSavedImage = await savePhoto(image);
        setImages([...images, newSavedImage]);
        console.log("~file: user :", image);
      }
    } catch (e) {
      return;
    }
  };
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
      </div>
    </PageContainer>
  );
}
