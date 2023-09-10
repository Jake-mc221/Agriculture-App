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
    <PageContainer>
      <div className="flex-grow flex flex-col justify-end gap-5">
          <div className="flex flex-col justify-end border rounded-lg shadow-md overflow-hidden border-black/20 bg-gray-200">
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
          <form>  
            <Tabs options={tabOptions}/>
            <Button>Submit</Button>
          </form>
      </div>  
    </PageContainer>
  );
}
