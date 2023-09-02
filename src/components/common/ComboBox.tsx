import React, { useState } from "react";
import { Listbox } from "@headlessui/react";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxProps {
  label: string; // Add label prop
  options: Option[];
  placeholder?: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  label,
  options,
  placeholder = "Select an option",
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <div className="flex items-center justify-between">
      <label className="mr-2">{label}:</label>
      <Listbox value={selectedOption} onChange={setSelectedOption}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="px-4 py-2 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300">
              {selectedOption ? selectedOption.label : placeholder}
            </Listbox.Button>
            {open && (
              <Listbox.Options className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full z-10">
                {options.map((option) => (
                  <Listbox.Option key={option.value} value={option}>
                    {({ active }) => (
                      <div
                        className={`px-4 py-2 ${
                          active ? "bg-blue-500 text-white" : "text-gray-900"
                        }`}
                      >
                        {option.label}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default ComboBox;
