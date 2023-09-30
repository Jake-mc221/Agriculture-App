import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BsCheck, BsChevronDown } from "react-icons/bs";
import { FieldPath, FormValues } from "./FormValues";
import { Control, useController } from "react-hook-form";


export function ComboBox<T>({
  label,
  placeholder,
  options,
  getOptionName,
  name,
  control
}: {
  label?: string;
  placeholder?: string;
  options: T[] | ((query: string) => T[] | Promise<T[]>);
  getOptionName: (v: T) => string;
  name: FieldPath;
  control: Control<FormValues>;
}) {
  const [selected, setSelected] = useState<T | null>(null);
  const [query, setQuery] = useState<string>("");
  const [availableOptions, setAvailableOptions] = useState<T[]>(
    typeof options !== "function" ? options : [],
  );

  const { field: { onChange } } = useController({
    name,
    control,
    rules: { required: true }
  });

  useEffect(() => {
    (async () => {
      setAvailableOptions(
        typeof options === "function"
          ? await options(query)
          : query === ""
          ? options
          : options.filter((option: T) =>
              getOptionName(option)
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, "")),
            ),
      );
    })();
  }, [getOptionName, options, query]);

  return (
    <Combobox value={selected} onChange={(e) => {
        setSelected(e);
        onChange(e);
      }}>
      <Combobox.Label>
        <h2>{label}</h2>
      </Combobox.Label>
      <div className="relative mt-1">
        <div className="border relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            placeholder={placeholder ?? "Select an option"}
            displayValue={() =>
              selected !== null ? getOptionName(selected) : ""
            }
            onChange={(event) => setQuery(event.target.value)}
            style={{ outline: "none" }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown className="h-5 w-5 text-gray-400" aria-hidden />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {availableOptions.length === 0 ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              availableOptions.map((option: T) => (
                <Combobox.Option
                  key={getOptionName(option)}
                  className={({ active }) =>
                    `relative cursor-default select-none p-2 ${
                      active ? "bg-primary text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {getOptionName(option)}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
