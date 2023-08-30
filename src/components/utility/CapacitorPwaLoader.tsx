// This component is used to load the web version of some Capacitor APIs.
// See https://capacitorjs.com/docs/web/pwa-elements
"use client";

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { useEffect } from "react";

export function CapacitorPwaLoader() {
  useEffect(() => {
    defineCustomElements();
  }, []);

  return null;
}
