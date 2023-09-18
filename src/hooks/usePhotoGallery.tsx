import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { useEffect, useState } from "react";
import { ImageType } from "@/types/ImageType";
import { Preferences } from "@capacitor/preferences";

const PHOTOS_PREF_KEY = "photos";

export const usePhotoGallery = () => {
  const [image, setImage] = useState<Photo>();
  const [images, setImages] = useState<ImageType[]>([]);

  // Todo: change to use filesystem to search instead of using preferences API.
  useEffect(() => {
    (async () => {
      const { value } = await Preferences.get({ key: PHOTOS_PREF_KEY });
      const photosInPrefs: ImageType[] = value ? JSON.parse(value) : [];
      setImages(photosInPrefs);
    })();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      Preferences.set({ key: PHOTOS_PREF_KEY, value: JSON.stringify(images) });
    }
  }, [images]);

  const takePhoto = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      setImage(photo);
      setImages([
        ...images,
        { path: photo.path ?? "", webPath: photo.webPath ?? "" },
      ]);
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
