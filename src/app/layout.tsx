"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import { PhotoContext } from "./context";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"
      ></meta>
      <body className={`flex flex-col h-screen ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
