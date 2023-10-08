import React, { useState, ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { twJoin } from "tailwind-merge";
import { ComboBox } from "@/components/common/ComboBox";
import Health from "./Health";
import Submit from "./Submit";
import { BsCheck2Square } from "react-icons/bs";
import { MdQuestionMark } from "react-icons/md";
import { useForm } from "react-hook-form";
import { FormValues } from "./FormValues";
type TabOption = {
  name: string;
  display: string | ReactNode;
  explanation?: string;
  componentType: React.ElementType;
  componentProps?: object;
};

const tabOptions: TabOption[] = [
  {
    name: "crop_type",
    display: "Crop Type",
    explanation: "Please select how you would classify this plant",
    componentType: ComboBox,
    componentProps: {
      options: ["Wheat", "Rice", "Potato"],
      getOptionName: (option: string) => option,
    },
  },

  {
    name: "soil_type",
    display: "Soil Type",
    explanation: "Please describe the soil directly surrounding this plant",
    componentType: ComboBox,
    componentProps: {
      options: ["Clay", "Sand", "Silt"],
      getOptionName: (option: string) => option,
    },
  },

  {
    name: "plant_health",
    display: "Plant Health",
    explanation: "From left to right: sick, healthy, or thriving",
    componentType: Health,
  },

  {
    name: "submit",
    display: <BsCheck2Square className="w-7 h-7" />,
    componentType: Submit,
  },
];

export default function TabForm() {
  const { control, handleSubmit } = useForm<FormValues>();
  const [isHelping, setIsHelping] = useState<boolean>(false);

  return (
    <form className="w-screen p-2 bg-slate-100 sm:px-0 z-50 h-[25vh]">
      <Tab.Group>
        <Tab.List className="h-[7vh] flex space-x-1 rounded-2xl  bg-white p-1">
          {tabOptions.map((option) => {
            return (
              <Tab
                key={option.name}
                className={({ selected }) =>
                  twJoin(
                    typeof option.display === "string"
                      ? "w-full rounded-2xl"
                      : "bg-green-200 text-primary px-2",
                    "py-2 text-sm font-medium leading-5 rounded-2xl",
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
              className="grid grid-col-1 rounded-xl p-3 shadow-xl h-[15vh] bg-white  ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2"
            >
              {option.componentType === Submit ? (
                <option.componentType handler={handleSubmit} />
              ) : (
                <>
                  <div className="flex justify-between z-50">
                    <div
                      className={
                        "text-xs text-slate-500 mt-3 " +
                        (isHelping ? "opacity-100" : "opacity-0")
                      }
                    >
                      {option.explanation}
                    </div>
                    <MdQuestionMark
                      className="bg-green-600 text-white "
                      onPointerEnter={() => setIsHelping(true)}
                      onPointerLeave={() => setIsHelping(false)}
                    />
                  </div>
                  <option.componentType
                    name={option.name}
                    control={control}
                    {...option.componentProps}
                  />
                </>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </form>
  );
}
