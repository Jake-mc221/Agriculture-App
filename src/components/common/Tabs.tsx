import React, { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export type TabOption = {
  name: string;
  content: ReactNode;
};

export function Tabs({ options }: { options: TabOption[] }) {
  return (
    <div className="w-full max-w-md sm:px-0 z-50">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-2xl bg-white p-1">
          {options.map((option) => {
            console.log(option);
            return (
              <Tab
                key={option.name}
                className={({ selected }) =>
                  twMerge(
                    "w-full rounded-2xl py-2.5 text-sm font-medium leading-5",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
                    selected
                      ? "text-primary bg-white shadow"
                      : "text-gray-400 hover:bg-white/[0.12] hover:text-white",
                  )
                }
              >
                {option.name}
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {options.map((option, idx) => (
            <Tab.Panel
              key={idx}
              className={twMerge(
                "rounded-xl shadow-xl",
                "bg-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
              )}
            >
              <div className="rounded-xl p-3 ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2">
                {option.content}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
