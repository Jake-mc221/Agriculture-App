"use client";

import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import { Health } from "./Health";
import { useState, useCallback, useContext } from "react";
import { PhotoContext } from "@/app/context";
import { MdDone } from "react-icons/md";
import { TopBar } from "@/components/common/TopBar";
import { BsCheck2Square } from "react-icons/bs";
import { Submit } from "./Submit";

const tabOptions: TabOption[] = [
  {
    display: "Crop Type",
    name: "crop_type",
    explanation: "Please select how you would classify this plant",
    content: (
      <ComboBox
        options={[
          { name: "Lettuce" },
          { name: "Spinach" },
          { name: "Kale" },
          { name: "Arugula (Rocket)" },
          { name: "Radishes" },
          { name: "Carrots" },
          { name: "Turnips" },
          { name: "Swiss Chard" },
          { name: "Bok Choy (Pak Choi)" },
          { name: "Mustard Greens" },
          { name: "Collard Greens" },
          { name: "Strawberries" },
          { name: "Onions" },
          { name: "Garlic" },
          { name: "Parsley" },
          { name: "Cilantro (Coriander)" },
          { name: "Basil" },
          { name: "Mint" },
          { name: "Broccoli" },
          { name: "Cauliflower" },
          { name: "Potatoes" },
          { name: "Chinese Broccoli" },
          { name: "Celery" },
        ]}
        getOptionName={(option) => option.name}
      />
    ),
  },

  {
    display: "Soil Type",
    name: "soil_type",
    explanation: "Please describe the soil directly surrounding this plant",
    content: (
      <ComboBox
        options={[
          { name: "Sandy" },
          { name: "Loamy" },
          { name: "Clayey" },
          { name: "Peaty" },
          { name: "Chalky" },
          { name: "Silt" },
        ]}
        getOptionName={(option) => option.name}
      />
    ),
  },

  {
    display: "Plant Health",
    name: "plant_health",
    explanation: "From left to right: sick, healthy, or thriving",
    content: <Health />,
  },

  {
    display: <BsCheck2Square className=" w-7 h-7" />,
    name: "submit",
    content: <Submit />,
    explanation: "",
  },
];

export default function Home() {
  const { images } = useContext(PhotoContext);
  const [bounded, setBounded] = useState(false);
  const [dragging, setDragging] = useState(false);

  const toLabelling = useCallback(() => setBounded(true), []);

  return (
    <div className="flex bg-black flex-col h-full w-full">
      <TopBar />
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
          isFrozen={bounded}
          informDrag={setDragging}
        />
      </div>

      <div className="self-end w-full">
        {bounded ? (
          <form className="relative rounded-2xl py-2 px-2 bg-slate-100 w-full flex flex-col items-center gap-5">
            <Tabs options={tabOptions} />
          </form>
        ) : (
          !dragging && (
            <div
              className="fixed bottom-16 right-10 p-2 rounded-full shadow-2xl text-white bg-gray-900 z-50"
              onClick={toLabelling}
            >
              <MdDone className="h-12 w-12 " />
            </div>
          )
        )}
      </div>
    </div>
  );
}
