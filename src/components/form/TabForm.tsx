import React, { ElementType, ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { twJoin } from "tailwind-merge";
import { ComboBox } from "@/components/common/ComboBox";
import Health from "./Health";
import Submit from "./Submit";
import { BsCheck2Square } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { FieldPath, FormValues } from "./FormValues";

type TabOption = {
  name: string;
  display: string | ReactNode;
  componentType: string;
  componentProps?: any
};

const tabOptions: TabOption[] = [
  {
    name: "crop_type",
    display: "Crop Type",
    componentType: "ComboBox",
    componentProps:
      {
        options: [{ name: "Wheat" }, { name: "Rice" }, { name: "Potato" }],
        getOptionName: (option: { name: string }) => option.name
      }   
  },

  {
    name: "soil_type",
    display: "Soil Type",
    componentType: "ComboBox",
    componentProps:
      {
        options: [{ name: "Clay" }, { name: "Sand" }, { name: "Silt" }],
        getOptionName: (option: { name: string }) => option.name
      }   
  },

  {
    name: "plant_health",
    display: "Plant Health",
    componentType: "Health",
  },

  {
    display: <BsCheck2Square className=" w-7 h-7" />,
    name: "submit",
    componentType: "Submit"
  },
];



export default function TabForm() {
  const { control, handleSubmit } = useForm<FormValues>(); 
  
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md sm:px-0 z-50 h-1/2">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-2xl bg-white p-1">
          {tabOptions.map((option) => {
            console.log(option);
            return (
              <Tab
                key={option.name}
                className={({ selected }) =>
                  twJoin(
                    typeof option.display === "string"
                      ? "w-full rounded-2xl"
                      : "bg-green-200 text-primary px-2",
                    "py-2.5 text-sm font-medium leading-5 rounded-2xl",
                    selected
                      ? "text-primary bg-green-100 shadow"
                      : "text-gray-400 hover:bg-white/[0.12] hover:text-white",
                  )
                }
              >
                {option.display}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {tabOptions.map((option, idx) => (
            <Tab.Panel
              key={idx}
              className="rounded-xl shadow-xl h-[12vh] bg-white  ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2"
            >
              <div className="rounded-xl p-3 ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2">
                {
                  option.componentType === "Submit" ? 
                  (<option.componentType {...option.componentProps}/>) :
                  (<option.componentType control={control} {...option.componentProps}/>)
                }
                
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </form>
  );
}
