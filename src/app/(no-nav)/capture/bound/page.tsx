"use client"
import { PhotoContext } from "@/app/context";
import { useState, useMemo, useContext, useEffect } from "react";
import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { MdDone } from "react-icons/md";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { BoxCoords } from "@/logic/metadataTypes";
import { useStorage} from "@/logic/localStorage";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [boxCoords, setBoxCoords] = useState<BoxCoords>({
    positionX: 0.25,
    positionY: 0.25,
    lengthX: 0.5,
    lengthY: 0.5,
  });
  const { currImage, addBound } = useStorage();


  return (
    <>
    <div className="grow z-10">
      <BoundingBox
        image={
          // eslint-disable-next-line @next/next/no-img-element
          <img
          src={currImage.path}
          className="object-cover"
          alt="Captured image"
          />
        }
        isFrozen={false}
        informDrag={setDragging}
        informBound={setBoxCoords}
        />
    </div>

    {!dragging && (
      <Button
        className="fixed bottom-16 right-10 p-2 rounded-full shadow-2xl text-white bg-gray-900 z-50"
        intent="unstyled"
        onClick={async () => {
            await addBound(boxCoords);
            router.push("/capture/label");
          }
        }
      >
        <MdDone className="h-12 w-12 " />
      </Button>)}

  </>

  );
}