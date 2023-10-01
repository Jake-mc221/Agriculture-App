import React, { ReactNode, useState } from "react";
import { Tab } from "@headlessui/react";
import { twJoin } from "tailwind-merge";
import { MdQuestionMark } from "react-icons/md";

export type TabOption = {
  display: string | ReactNode;
  name: string;
  content: ReactNode;
  explanation: string;
};

export function Tabs({ options }: { options: TabOption[] }) {
  const [isHelping, setIsHelping] = useState<boolean>(false);
  return (
    <div className="w-full max-w-md sm:px-0 z-50 h-1/2">
      <Tab.Group>
        <Tab.List className="flex justify-between rounded-2xl bg-white p-1">
          {options.map((option) => {
            console.log(option);
            return (
              <div key={option.name}>
                <Tab
                  className={({ selected }) =>
                    twJoin(
                      typeof option.display === "string"
                        ? "w-full rounded-2xl p-2"
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
              </div>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {options.map((option, idx) => (
            <Tab.Panel
              key={idx}
              className={twJoin(
                "rounded-xl shadow-xl h-[5em]",
                "bg-white  ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
              )}
            >
              <div className="rounded-xl p-1 ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2">
                {option.content}
              </div>
              <div className="flex">
                <MdQuestionMark
                  className="text-green-600 mt-3"
                  onPointerEnter={() => setIsHelping(true)}
                  onPointerLeave={() => setIsHelping(false)}
                />
                <div
                  className={
                    "text-xs text-slate-500 mt-3 " +
                    (isHelping ? "opacity-100" : "opacity-0")
                  }
                >
                  {option.explanation}
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
