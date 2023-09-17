"use client";

import { Button } from "@/components/common/Button";
import { PageContainer } from "@/components/common/PageContainer";
import { TbPhoto } from "react-icons/tb";
import BoundingBox from "@/components/common/BoundingBox";
import { ComboBox } from "@/components/common/ComboBox";
import { Tabs, TabOption } from "@/components/common/Tabs";
import PlantHealth from "./PlantHealth";
import {TabOption, Tabs} from "@/components/common/Tabs";
import { Resizable } from "re-resizable";

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
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center h-full gap-5 ">
        {image ? (
          <div className="border rounded-lg shadow-md overflow-hidden border-black/20 bg-gray-200">
            <BoundingBox
              image={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="object-contain w-auto h-auto"
                  src={image.dataUrl}
                  alt="Captured image"
                />
              }

            />
          </div>
        ) : (
          <div className="flex w-full justify-center items-center h-1/3 bg-gray-200 rounded border border-black/20">
            <TbPhoto aria-hidden className="grow-0 text-3xl" />
          </div>
        )}

        <Button className="w-1/2" onClick={takePhoto}>Capture</Button>
      </div>
        

        <form className="w-full flex flex-col items-center gap-5">  
          <Tabs options={tabOptions}/>
          <Button className="">Submit</Button>
        </form>

        
    </div>
  );
}
