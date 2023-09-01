import { MdEnergySavingsLeaf } from "react-icons/md";
import { MdInfo } from "react-icons/md";
import NavigationBar from "@/components/core/NavigationBar";

export default function PlantHealth() {
  return (
    <div className="absolute bottom-0 w-full flex flex-col items-center">
      <div className="relative flex flex-col gap-5 border rounded-t-2xl p-6 text-center bg-slate-100">
        <h1>How is the health of the plant?</h1>
        <div className="flex justify-center space-x-4">
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-primary w-20 h-20" />
          </div>
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-yellow-500/80 w-20 h-20" />
          </div>
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-red-500/80 w-20 h-20" />
          </div>
        </div>
        <MdInfo className="absolute bottom-0 left-0 text-primary w-10 h-10" />
      </div>
      <footer>
        <NavigationBar></NavigationBar>
      </footer>
    </div>
  );
}
