import { ComponentPropsWithoutRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

function CheckIcon({ ...svgProps }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...svgProps}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Radio<T>({
  label,
  options,
  getOptionName,
  getOptionDescription,
}: {
  label: string;
  options: T[];
  getOptionName: (v: T) => string;
  getOptionDescription?: (v: T) => string;
}) {
  const [selected, setSelected] = useState<T>(options[0]);

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="space-y-2">
            {options.map((option) => (
              <RadioGroup.Option
                key={getOptionName(option)}
                value={option}
                className={({ checked }) =>
                  twMerge(
                    checked
                      ? "bg-primary/75 border-primary/75 text-white shadow-inner"
                      : "bg-white shadow-md",
                    "flex cursor-pointer rounded-lg px-5 py-4 border active:shadow-inner",
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {getOptionName(option)}
                          </RadioGroup.Label>

                          {getOptionDescription && (
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-white" : "text-gray-500"
                              }`}
                            >
                              {getOptionDescription(option)}
                            </RadioGroup.Description>
                          )}
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
