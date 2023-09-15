import { ourImage } from "./ourImage";
import React from "react";
import Image from "next/image";

type Props = {
  images: ourImage[];
};

const photoGallery: React.FC<Props> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="row-start-2 row-span-2 ..."></div>
    </div>
  );
};

export default photoGallery;
