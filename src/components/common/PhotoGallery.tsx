import { ourImage } from "./ourImage";
import React from "react";
import Image from "next/image";

type Props = {
  ourimages: ourImage[];
};

const PhotoGallery: React.FC<Props> = ({ ourimages }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="row-start-2 row-span-2 ...">
        {ourimages.map((pho, id) => (
          <img key={id} src={pho.webviewPath} />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
