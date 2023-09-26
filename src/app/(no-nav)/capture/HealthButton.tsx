import { PiTreeBold } from "react-icons/pi";
import { RiPlantFill } from "react-icons/ri"
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
    <div className={twJoin(checked ? "bg-green-200 ring-4 ring-primary outline-none" : "", "flex place-content-center rounded-full bg-gray-200  p-2")}>
      <PiTreeBold className={twJoin(colour, "w-12 h-12")}/>
    </div>
  )
}