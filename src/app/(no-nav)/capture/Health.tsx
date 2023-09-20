import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { HealthButton } from "./HealthButton";

const healthStatus = ["bad", "normal", "healthy"];

export function Health() {
  const [health, setHealth] = useState('');

  return (
    <RadioGroup className="flex flex-col gap-5" value={health} onChange={setHealth}>
      <RadioGroup.Label className="text-xl text-center">How is the health of the plant?</RadioGroup.Label>
      <div className="flex justify-center gap-3">

      {healthStatus.map((rating) => (
        <RadioGroup.Option key={rating} value={rating}>
          {({checked}) => (
            <HealthButton healthStatus={rating} checked={checked}/>
            )}
        </RadioGroup.Option>
      ))}
    </div>
    </RadioGroup>
  );
}