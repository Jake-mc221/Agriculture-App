"use client";

import { TbPhoto } from "react-icons/tb";
import BoundingBox from "@/components/common/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import PlantHealth from "./PlantHealth";
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
    content: (<PlantHealth/>)
  }
];

export default function Home() {
  const { image } = useContext(PhotoContext);

  return (
    <div className="relative flex flex-col h-full gap-10">
      {image ? 
        (
          <img 
            src={image.webPath}
            className="h-50"/>
        ) :
        (
          <div className="flex w-full justify-center items-center h-full bg-black rounded border border-black/20">
            <TbPhoto aria-hidden className="invert bg-white text-6xl" />
          </div>
        )
      }
      
      <form className="fixed bottom-2 rounded-2xl  py-2 px-2 bg-slate-100 w-full flex flex-col items-center gap-5">  
        <Tabs options={tabOptions}/>

      </form>

        
    </div>
  );
}
