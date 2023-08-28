import React from "react";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface ComboBoxWithLabelProps {
  label: string;
  options: Option[];
}

const ComboBoxWithLabel: React.FC<ComboBoxWithLabelProps> = ({
  label,
  options,
}) => {
  return (
    <div className="flex items-center justify-between">
      <label>{label}:</label>
      <Select
        options={options}
        placeholder={`Select a ${label.toLowerCase()}`}
      />
    </div>
  );
};

export default ComboBoxWithLabel;
