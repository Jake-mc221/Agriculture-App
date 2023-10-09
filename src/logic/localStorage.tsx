import { Preferences } from "@capacitor/preferences";
import { Camera, CameraResultType } from "@capacitor/camera";
import { useEffect, useState } from "react";
import { Metadata, Label, BoxCoords, SubmitData } from "../types/metadataTypes";
import { Geolocation } from "@capacitor/geolocation";

export function useStorage() {
  const [currImage, setCurrImage] = useState<Metadata>({});

  useEffect(() => {
    const getCurrentImage = async () => {
      const curr = await Preferences.get({ key: "current" });
      const meta_string = await Preferences.get({ key: curr.value! });
      setCurrImage(JSON.parse(meta_string.value!));
    };
    getCurrentImage();
  }, []);

  const capture = async () => {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    const {
      coords: { latitude, longitude },
    } = await Geolocation.getCurrentPosition();
    const date = new Date();

    const metadata = {
      path: photo.webPath,
      timestamp: date.toISOString(),
      location: { latitude, longitude },
    };

    Preferences.set({
      key: metadata.timestamp,
      value: JSON.stringify(metadata),
    });

    Preferences.set({
      key: "current",
      value: metadata.timestamp,
    });
  };

  // const getAll() = async () => {
  //   const Prefs = await Preferences.keys();
  //   for (let key of Prefs.keys()) {
      
  //   }
  // };

  // const function package(): SubmitData[] {
  //   //
  //   const blob = readFile(currImage.webpath)
  //   return {image: blob, metadata: currImage.metdata}
  // }

  const addBound = async (bound: BoxCoords) => {
    currImage.boundingCoords = bound;

    Preferences.set({
      key: currImage.timestamp!,
      value: JSON.stringify(currImage),
    });
  };

  

  const addLabel = async (label: Label) => {
    currImage.label = label;

    Preferences.set({
      key: currImage.timestamp!,
      value: JSON.stringify(currImage),
    });
  };

  

  const retake = async () => {
    Preferences.remove({ key: "current" });
    await capture();
  };
  return { capture, retake, addBound, addLabel, currImage };
}
