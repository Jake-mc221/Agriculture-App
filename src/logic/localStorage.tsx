import { Preferences } from "@capacitor/preferences";
import { Camera, CameraResultType, Photo } from "@capacitor/camera";
import { cursorTo } from "readline";

export async function capture() {
  const photo = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.DataUrl
  });
  const date = new Date();

  const metadata = {
    path: photo,
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

export async function getCurrentImage() {
  const curr = await Preferences.get({ key: "current" });

  if (curr.value == null) { return null; }
  let meta_string = await Preferences.get({ key: curr.value });

  return JSON.parse(meta_string.value!);
}

export async function addMetadata(data: Object) {
  let metadata = await getCurrentImage();
  metadata = {...data, metadata};

  Preferences.set({
    key: metadata.timestamp,
    value: JSON.stringify(metadata)
  })
}

