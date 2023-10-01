import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { HealthButton } from "./HealthButton";
import { useController, Control, Field } from "react-hook-form";
import { FieldPath, FormValues } from "./FormValues";

const healthStatus = ["bad", "normal", "healthy"];

export default function Health( { name, control }: { name: FieldPath, control: Control<FormValues>}) {
  const [health, setHealth] = useState('');
  const { field: { onChange } } = useController({
    name: name,
    control: control,
    rules: { required: true }
  });

  return (
    <RadioGroup className="flex flex-col gap-5" value={health} onChange={(e) => {
      setHealth(e);
      onChange(e);
      }}
    >
      <div className="flex justify-center gap-3">
        {healthStatus.map((rating) => (
          <RadioGroup.Option key={rating} value={rating}>
            {({ checked }) => (
              <HealthButton healthStatus={rating} checked={checked} />
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
