import { MdEnergySavingsLeaf } from "react-icons/md";
import { MdInfo } from "react-icons/md";

export default function PlantHealth() {
  return (
    <main className="w-full h-screen flex flex-col justify-end items-center bg-white">
      <div className="relative border rounded-t-2xl p-6 text-center bg-white">
        <h2 className="text-xl text-black font-bold mb-4">
          How is the health of the plant?
        </h2>
        <div className="flex justify-center space-x-4">
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-green-500 w-20 h-20" />
          </div>
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-yellow-500 w-20 h-20" />
          </div>
          <div className="bg-gray-200 rounded-full p-2">
            <MdEnergySavingsLeaf className="text-red-500 w-20 h-20" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <MdInfo className="text-green-500 w-10 h-10" />
        </div>
      </div>
    </main>
  );
}
