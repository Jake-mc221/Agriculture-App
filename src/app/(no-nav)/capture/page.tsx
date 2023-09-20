"use client";

import { TbPhoto } from "react-icons/tb";
import BoundingBox from "@/components/common/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import { Health } from "./Health";
import { useContext } from "react";
import { PhotoContext } from "@/app/context";


const tabOptions: TabOption[] = [
  {
    name: "Crop Type",
    content: (<ComboBox
      label="Crop Type"
      options={[{ name: "Crop 1" }, { name: "Crop 2" }, { name: "Crop 3" }]}
      getOptionName={(option) => option.name}
    />)
  },

  {
    name: "Soil Type",
    content: (<ComboBox
      label="Soil Type"
      options={[{ name: "Soil 1" }, { name: "Soil 2" }, { name: "Soil 3" }]}
      getOptionName={(option) => option.name}
    />)
  },

  {
    name: "Plant Health",
    content: (<Health/>)
  }
];

export default function Home() {
  const { images } = useContext(PhotoContext);

  return (
    <div className="relative flex flex-col h-full gap-10">
      {images ? 
        (
          <img 
            src={images[images.length-1].webviewPath}
            className="h-full object-cover"
          />
        ) :
        (
          <div className="flex w-full justify-center items-center h-full bg-black rounded border border-black/20">
            <TbPhoto aria-hidden className="invert bg-white text-6xl" />
          </div>
        )
      }
      
      <form className="fixed bottom-0 rounded-2xl  py-2 px-2 bg-slate-100 w-full flex flex-col items-center gap-5">  
        <Tabs options={tabOptions}/>

      </form>

        
    </div>
  );
}
