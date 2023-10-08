import { Preferences } from "@capacitor/preferences";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { cursorTo } from "readline";
import { Capacitor } from "@capacitor/core";

export type Label = {
  soilType: string;
  cropType: string;
  health: string;
}

export type BoxCoords = {
  x: number;
  y: number;
}

type Data = {
  path: string;
  timestamp: string;
  location: string;
  boundingCoords: BoxCoords;
  label: Label;
}

export type Metadata = Partial<Data>;

export async function capture() {
  const photo = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });
  const date = new Date();

  let imagePath = photo.path;

  if (!Capacitor.isNativePlatform()) {
    imagePath = photo.webPath;
  }

  const metadata = {
    path: imagePath,
    timestamp: date.toISOString(),
    location: ""
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

export async function getCurrentImage(): Promise<Metadata>  {
  const curr = await Preferences.get({ key: "current" });
  let meta_string = await Preferences.get({ key: curr.value! });
  return JSON.parse(meta_string.value!);
}

export async function addBound(bound: BoxCoords) {
  let metadata = await getCurrentImage();
  metadata.boundingCoords = bound;

  Preferences.set({
    key: metadata.timestamp!,
    value: JSON.stringify(metadata)
  })
}

export async function addLabel(label: Label) {
  let metadata = await getCurrentImage();
  metadata.label = label;

  Preferences.set({
    key: metadata.timestamp!,
    value: JSON.stringify(metadata)
  })
}

