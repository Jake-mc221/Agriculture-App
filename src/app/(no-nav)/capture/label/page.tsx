"use client"

import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { useStorage } from "@/logic/localStorage";
import TabForm from "@/components/form/TabForm";

export default function Page() {
  const { currImage } = useStorage();

  return (
    <>
      <div className="grow z-0">
        <BoundingBox
          image={
            // eslint-disable-next-line @next/next/no-img-element
            <img
            src={currImage.path}
            className="object-cover"
            alt="Captured image"
            />
          }
          isFrozen={true}
        />
      </div>
      
      <TabForm/>
      
    </>
  );
}