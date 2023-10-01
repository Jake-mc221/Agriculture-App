"use client"

import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import { ComboBox } from "@/components/common/ComboBox";
import Health from "../../../../components/form/Health";
import { useContext } from "react";
import { PhotoContext } from "@/app/context";
import { BsCheck2Square } from "react-icons/bs";
import Submit from "@/components/form/Submit";
import TabForm from "@/components/form/TabForm";

export default function Page() {
  const { images } = useContext(PhotoContext);

  return (
    <>
      <div className="grow z-0">
        <BoundingBox
          image={
            // eslint-disable-next-line @next/next/no-img-element
            <img
            src={images[images.length - 1].webviewPath}
            className="object-cover"
            alt="Captured image"
            />
          }
          />
      </div>
      
      <div className="bg-slate-100 p-2">
        <TabForm/>
      </div>
      
    </>
  );
}