import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { HealthButton } from "./HealthButton";

const healthStatus = ["bad", "normal", "healthy"];

export function Health() {
  const [health, setHealth] = useState('');

  return (
    <RadioGroup value={health} onChange={setHealth}>
      <RadioGroup.Label>How is the health of the plant?</RadioGroup.Label>
      {healthStatus.map((rating) => (
        <RadioGroup.Option key={rating} value={rating}>
          {({checked}) => (
            <HealthButton healthStatus={rating} checked={checked}/>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}