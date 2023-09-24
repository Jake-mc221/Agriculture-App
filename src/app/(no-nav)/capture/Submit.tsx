import { useCallback } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { FiSend } from "react-icons/fi";

export function Submit() {

  return (
    <div className="flex justify-center gap-12 text-sm font-medium text-gray-400 ">
      <div className="">
        <FiSend className="text-primary text-center w-10 h-10"/>
        Upload
      </div>
      <div className="grid grid-cols-1 justify-items-center text-center">
        <TbCameraPlus className="text-primary w-10 h-10"/>
        Keep capturing
      </div>
    </div>
  )
}