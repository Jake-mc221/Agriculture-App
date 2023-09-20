import { MdEnergySavingsLeaf } from "react-icons/md";
import { twJoin } from "tailwind-merge";

export function HealthButton({healthStatus, checked}: {healthStatus: string, checked: boolean}) {
  let colour = "";

  switch(healthStatus) {
    case "healthy":
     colour = "text-primary";
      break;
    case "normal":
     colour = "text-yellow-500";
      break;
    case "bad":
      colour = "text-red-500";
      break;
  }

  return (
    <div className={twJoin(checked ? "ring-2 ring-primary ring-offset-2" : "", "flex place-content-center rounded-full bg-gray-200  p-2")}>
      <MdEnergySavingsLeaf className={twJoin(colour, "w-12 h-12")}/>
    </div>
  )
}