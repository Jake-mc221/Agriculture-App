import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useState, useEffect } from "react";
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

export const takePhoto = async () => {
  await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
  });
};