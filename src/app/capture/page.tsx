export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <div className="border h-40 w-40 text-black flex justify-center items-center">
        Capture App
      </div>

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
        <select className="">
          <option>Crop1</option>
          <option>Crop2</option>
          <option>Crop3</option>
        </select>
      </label>
    </div>
  );
}
