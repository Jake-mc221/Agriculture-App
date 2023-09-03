"use client";
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";
import ComboBox from "@/components/common/ComboBox";
import Link from "next/link";
import { PageContainer } from "@/components/common/PageContainer";

export default function Page() {
  const [count, setCount] = useState<number>(0);
  const [cropsType, setCropsType] = useState<string>("");
  const [soilType, setSoilType] = useState<string>("");
  const [locationLong, setLocationLong] = useState<string>("");
  const [locationLat, setLocationLat] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>("");
  const [healthStatus, setHealthStatus] = useState<string>("");

  const options = [
    { value: "Hello", label: "Hello" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [searchLocation, setSearchLocation] = useState<string>("");
  // You can't use the 'any' type, it's not allowed. If you have linting setup correctly you should see an error here.
  // "Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any"
  // Please fix this typing up!
  const [suggestedLocations, setSuggestedLocations] = useState<any[]>([]);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoieWNoZTMzNDAiLCJhIjoiY2xsdzJrYzhsMW1lcTNrczJ0c3RtNGk2MyJ9.VQ36wZakYJmHuptA8BHkLQ";

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
  }, [
    count,
    cropsType,
    healthStatus,
    locationLat,
    locationLong,
    soilType,
    timePeriod,
  ]);

  const fetchLocations = async (query: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query,
    )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
    try {
      const response = await (await fetch(url)).json();
      setSuggestedLocations(response.features);
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
    <PageContainer>
      <div className="min-h-[25rem] w-full flex flex-col gap-5 bg-white">
        <div className="flex flex-col gap-5">
          <Button
            intent="unstyled"
            className="w-5 text-primary underline"
            href="profile"
          >
            Back
          </Button>
          <label className="block text-xl font-bold text-gray-700">
            Filter
          </label>
          <div>
            <ComboBox
              label="Soil Type"
              options={options}
              placeholder="Select an option"
            />
          </div>
          <div>
            <ComboBox
              label="Crop Type"
              options={options}
              placeholder="Select an option"
            />
          </div>
          <div>
            <ComboBox
              label="Health"
              options={options}
              placeholder="Select an option"
            />
          </div>
          <div>
            <ComboBox
              label="Time"
              options={options}
              placeholder="Select an option"
            />
          </div>
          <label className="block text-xl font-bold text-gray-700">
            Location
          </label>
        </div>
        <label className="text-sm font-medium text-gray-700">
          Location Name
          <input
            type="text"
            value={searchLocation}
            onChange={handleLocationChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
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
        <Button component={Link} href={"images"}>
          Confirm
        </Button>
      </div>
    </PageContainer>
  );
}
