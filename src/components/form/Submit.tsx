import { Button } from "@/components/common/Button";
import { TbCameraPlus } from "react-icons/tb";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { PhotoContext } from "@/app/context";
import { FormValues } from "./FormValues";
import { useStorage } from "@/logic/localStorage";
import { Label } from "@/logic/metadataTypes";

export default function Submit({handler}: {handler: any}) {
  const router = useRouter();
  const {capture, addLabel, currImage} = useStorage();

  const onSubmit =  async (data: FormValues, e?: Event) => {
    addLabel(data as Label);
    await capture();
    router.push("/capture/bound");
  };

  const onBatchSubmit = async (data: FormValues, e?: Event) => {
    addLabel(data as Label);
    console.log(currImage);
    alert("Submitted batch!");
    router.push("/");
  };

  const onError = (errors: Object, e?: Event) => console.log(errors, e);

  return (
    <div className="flex justify-center gap-12 text-sm font-medium text-gray-400 ">
      <Button
        type="button"
        intent="unstyled"
        className="grid grid-cols-1 justify-items-center text-center"
        onClick={handler(onBatchSubmit, onError)}
      >
        <FiSend className="text-primary text-center w-10 h-10"/>
        Upload
      </Button>
      <Button
        type="button"
        intent="unstyled"
        className="grid grid-cols-1 justify-items-center text-center"
        onClick={handler(onSubmit, onError)}
      >
        <TbCameraPlus className="text-primary w-10 h-10"/>
        Keep capturing
      </Button>
    </div>
  )
}