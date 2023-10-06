import { Preferences } from "@capacitor/preferences";
import { cursorTo } from "readline";

export function captureImage() {
  const metadata = {}
  const photo = getPhoto();
  metadata = {
    path: photo,
    timestamp: Date.now(),
    location: geolocation stuff
  }

  Preferences.set({
    key: Date.now(),
    value: JSON.stringify(metadata);
  })

}

function label(data) {
  curr = sort keys by latest
  metadata = JSON.parse(Preferences.get(curr));
  metadata = {..., entry}
  Preferences.set({
    key: curr,
    value = JSON.stringify(metadata)
  })
}