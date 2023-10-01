import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { HealthButton } from "./HealthButton";

const healthStatus = ["bad", "normal", "healthy"];

export function Health() {
  const [health, setHealth] = useState("");

  return (
    <RadioGroup
      className="relative h-8 mb-2"
      value={health}
      onChange={setHealth}
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
