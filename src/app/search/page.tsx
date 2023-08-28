"use client";

import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";
import ComboBoxWithLabel from "@/components/common/ComboBoxWithLabel";

export default function Page() {
  
  const [count, setCount] = useState<number>(0);
  const [cropsType, setCropsType] = useState<string>("");
  const [soilType, setSoilType] = useState<string>("");
  const [locationLong, setLocationLong] = useState<string>("");
  const [locationLat, setLocationLat] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [healthStatus, setHealthStatus] = useState<string>("");

  const inputContainer = "mb-4 flex items-center";
  const inputClassName = "mt-1 p-2 w-full border rounded-md";
  const inputFont = "block text-sm font-medium text-gray-700 w-36";

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(0);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(
      count,
      cropsType,
      soilType,
      timePeriod,
      healthStatus,
      locationLong,
      locationLat,
    );
  }, [count]);
  return (
    <div className="min-h-[25rem] w-full flex flex-col items-center gap-10 p-10 bg-white">
      <div className="p-8 bg-white rounded-lg w-96">
        <button
          onClick={handleClick}
          className="relative right-15 text-green-400"
        >
          Back
        </button>
        <br />
        <label className="block text-xl font-bold text-gray-700 w-36">
          🔍 Filter
        </label>
        <br />
        <div>
          <ComboBoxWithLabel label="Soil Type" options={options} />
        </div>
        <br />
        <div>
          <ComboBoxWithLabel label="Crop Type" options={options} />
        </div>
        <br />
        <div>
          <ComboBoxWithLabel label="Health" options={options} />
        </div>
        <br />
        <div>
          <ComboBoxWithLabel label="Time Period" options={options} />
        </div>
        <br />
        <label className="block text-xl font-bold text-gray-700 w-36">
          📍 Location
        </label>
        <br />
        <div className={inputContainer}>
          <label className={inputFont}>long</label>
          <input
            type="text"
            onChange={(e) => setLocationLong(String(e.target.value))}
            className={inputClassName}
          />
        </div>
        <br />
        <div className={inputContainer}>
          <label className={inputFont}> lat</label>
          <input
            type="text"
            id="location_lat"
            onChange={(e) => setLocationLat(String(e.target.value))}
            className={inputClassName}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          // setCount(count + 1);
          handleConfirm();
        }}
        style={{ width: "300px" }} // Adjust the width as needed
      >
        Confirm
      </Button>
    </div>
  );
  function handleClick() {
    window.location.href = "profile";
  }
  function handleConfirm() {
    window.location.href = "images";
  }
}
