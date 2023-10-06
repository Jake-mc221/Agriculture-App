import Link from "next/link";
import { Button } from "@/components/common/Button";
import { TbCameraPlus } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { PhotoContext } from "@/app/context";

export default function Submit() {
  const { takePhoto } = useContext(PhotoContext)
  const router = useRouter();

  const capture = useCallback(async () => {
    await takePhoto();
    router.push("/capture/bound");
  }, [router, takePhoto]);

  return (
    <div className="flex justify-center gap-12 text-sm font-medium text-gray-400 ">
      <Button
        type="submit"
        intent="unstyled"
        className="grid grid-cols-1 justify-items-center text-center"
      >
        <FiSend className="text-primary text-center w-10 h-10"/>
        Upload
      </Button>
      <Button
        type="button"
        intent="unstyled"
        className="grid grid-cols-1 justify-items-center text-center"
        onClick={capture}
      >
        <TbCameraPlus className="text-primary w-10 h-10"/>
        Keep capturing
      </Button>
    </div>
  )
}