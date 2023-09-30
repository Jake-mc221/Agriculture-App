"use client"

import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import { ComboBox } from "@/components/common/ComboBox";
import { Health } from "../Health";
import { useContext } from "react";
import { PhotoContext } from "@/app/context";
import { BsCheck2Square } from "react-icons/bs";
import { Submit } from "../Submit";


const tabOptions: TabOption[] = [
  {
    display: "Crop Type",
    name: "crop_type",
    content: (
      <ComboBox
        options={[{ name: "Crop 1" }, { name: "Crop 2" }, { name: "Crop 3" }]}
        getOptionName={(option) => option.name}
      />
    ),
  },

  {
    display: "Soil Type",
    name: "soil_type",
    content: (
      <ComboBox
        options={[{ name: "Soil 1" }, { name: "Soil 2" }, { name: "Soil 3" }]}
        getOptionName={(option) => option.name}
      />
    ),
  },

  {
    display: "Plant Health",
    name: "plant_health",
    content: <Health />,
  },

  {
    display: <BsCheck2Square className=" w-7 h-7" />,
    name: "submit",
    content: <Submit />,
  },
];


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

      <form className="rounded-2xl py-2 px-2 bg-slate-100 w-full flex flex-col items-center gap-5">
        <Tabs options={tabOptions} />
      </form>
    
    </>
  );
}