import React, { ReactNode } from "react";
import { Tab } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export type TabOption = {
  name: string;
  content: ReactNode;
};

export function Tabs({ options }: { options: TabOption[] }) {
  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-3xl bg-gray-500/20 p-1">
          {options.map((option) => {
            console.log(option);
            return (
              <Tab
                key={option.name}
                className={({ selected }) =>
                  twMerge(
                    "w-full rounded-3xl py-2.5 text-sm font-medium leading-5",
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
                "rounded-xl border shadow-lg",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2",
              )}
            >
              <div className="rounded-xl p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none focus:ring-2">
                {option.content}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
