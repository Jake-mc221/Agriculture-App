"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { TbPhoto } from "react-icons/tb";
import BoundingBox from "@/components/common/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import PlantHealth from "./PlantHealth";

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

  return (
    <div className="relative flex flex-col h-full gap-10">
      <div className="flex w-full justify-center items-center h-full bg-gray-200 rounded border border-black/20">
        <TbPhoto aria-hidden className="grow-0 text-3xl" />
      </div>

      <form className="fixed bottom-0 w-full flex flex-col items-center gap-5">  
        <Tabs options={tabOptions}/>
        <Button className="">Submit</Button>
      </form>

        
    </div>
  );
}
