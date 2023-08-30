"use client";
import axios from "axios";
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";
// import ComboBoxWithLabel from "@/components/common/ComboBoxWithLabel";
import ComboBox from "@/components/common/ComboBox";
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
    { value: "Hello", label: "Hello" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [searchLocation, setSearchLocation] = useState<string>("");
  const [suggestedLocations, setSuggestedLocations] = useState<any[]>([]);

  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoieWNoZTMzNDAiLCJhIjoiY2xsdzJrYzhsMW1lcTNrczJ0c3RtNGk2MyJ9.VQ36wZakYJmHuptA8BHkLQ";

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

  const fetchLocations = async (query: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    try {
      const response = await axios.get(url);
      setSuggestedLocations(response.data.features);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchLocation(query);
    if (query) {
      fetchLocations(query);
    } else {
      setSuggestedLocations([]);
    }
  };

  const handleSelectLocation = (place_name: string) => {
    setSearchLocation(place_name);
    setSuggestedLocations([]);
  };

  return (
    <div className="min-h-[25rem] w-full flex flex-col items-center gap-10 p-10 bg-white">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <button
          onClick={handleClick}
          className="relative right-15 text-green-400"
        >
          Back
        </button>
        <br />
        <label className="block text-xl font-bold text-gray-700 w-36">
          Filter
        </label>

        <br />
        <div>
          <ComboBox
            label="Soil Type"
            options={options}
            placeholder="Select an option"
          />
        </div>
        <br />
        <div>
          <ComboBox
            label="Crop Type"
            options={options}
            placeholder="Select an option"
          />
        </div>
        <br />
        <div>
          <ComboBox
            label="Health"
            options={options}
            placeholder="Select an option"
          />
        </div>
        <br />
        <div>
          <ComboBox
            label="Time"
            options={options}
            placeholder="Select an option"
          />
        </div>
        <br />
        <label className="block text-xl font-bold text-gray-700 w-36">
          Location
        </label>
        <br />
        <div className={inputContainer}>
          <label className={inputFont}>Location Name</ label>
          <input
            type="text"
            value={searchLocation}
            onChange={handleLocationChange}
            className={inputClassName}
        />
          <ul>
            {suggestedLocations.map((location) => (
              <li
                key={location.id}
                onClick={() => handleSelectLocation(location.place_name)}
              >
                {location.place_name}
              </li>
            ))}
          </ul>
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
