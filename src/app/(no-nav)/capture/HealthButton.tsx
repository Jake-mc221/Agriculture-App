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
    <div className="bg-gray-200 rounded-full p-2">
      <MdEnergySavingsLeaf className={twJoin(colour, checked ? "ring-2 ring-primary ring-offset-2" : "", "h-12, w-12")}/>
    </div>
  )
}