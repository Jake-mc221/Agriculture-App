import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { useEffect, useState } from "react";
import { ourImage } from "./ourImage";
import { Preferences } from "@capacitor/preferences";

const PHOTOS_PREF_KEY = "photos";

export const usePhotoGallery = () => {
  const [image, setImage] = useState<Photo>();
  const [images, setImages] = useState<ourImage[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
      const photosInPrefs: ourImage[] = value ? JSON.parse(value) : [];

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
          resultType: CameraResultType.Uri,
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
  return {
    image,
    images,
    takePhoto,
  };
};
