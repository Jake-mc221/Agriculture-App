import { Button } from "@/components/common/Button";
import { CameraResultType, Camera, Photo } from "@capacitor/camera";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <label className="flex flex-col">
        Crop Type
        <select className="pl-6">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </select>
      </label>

      <label className="p-2 flex flex-col">
        Soil Type
        <select className="pl-6">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </select>
      </label>
      <Button> Capture</Button>
    </div>
  );
}
