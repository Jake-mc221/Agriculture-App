import { Preferences } from "@capacitor/preferences";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { cursorTo } from "readline";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";
import { Metadata, Label, BoxCoords } from "./metadataTypes";
import { Geolocation, Position } from '@capacitor/geolocation';


export function useStorage() {
  const [currImage, setCurrImage] = useState<Metadata>({});

  useEffect(
    () => {
      const getCurrentImage = async () => {
        const curr = await Preferences.get({ key: "current" });
        let meta_string = await Preferences.get({ key: curr.value! });
        setCurrImage(JSON.parse(meta_string.value!));
      }
      getCurrentImage();
    },
    []
  );

  const capture = async () => {
    const photo = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    const {coords: {latitude, longitude}} = await Geolocation.getCurrentPosition();
    const date = new Date();
    
    const metadata = {
      path: photo.webPath,
      timestamp: date.toISOString(),
      location: {latitude, longitude}
    }
    
    Preferences.set({
      key: metadata.timestamp,
      value: JSON.stringify(metadata)
    })
  
    Preferences.set({
      key: "current",
      value: metadata.timestamp
    })
  }

  const addBound = async (bound: BoxCoords) => {
    currImage.boundingCoords = bound;
  
    Preferences.set({
      key: currImage.timestamp!,
      value: JSON.stringify(currImage)
    })
  };
  
  const addLabel = async (label: Label) => {
    currImage.label = label;
  
    Preferences.set({
      key: currImage.timestamp!,
      value: JSON.stringify(currImage)
    })
  }

  const retake = async () =>  {
    Preferences.remove({ key: "current" });
    await capture();

  }
  return {capture, retake, addBound, addLabel, currImage};
}






