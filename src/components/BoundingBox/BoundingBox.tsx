"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Resizer } from "./Resizer";

export type BoundingProps = {
  image: ReactNode;
};

type BoxCoords = {
  positionX: number;
  positionY: number;
  lengthX: number;
  lengthY: number;
};

export default function BoundingBox({ image }: BoundingProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  // Using a callback ref.
  const [boundaryRef, setBoundaryRef] = useState<HTMLDivElement>();
  const [dragging, setDragging] = useState(false);
  const [boundarySize, setBoundarySize] = useState<BoxCoords>({
    positionX: 0,
    positionY: 0,
    lengthX: Infinity,
    lengthY: Infinity,
  });
  const [boxCoords, _setBoxCoords] = useState<BoxCoords>({
    positionX: 50,
    positionY: 50,
    lengthX: 50,
    lengthY: 50,
  });

  const boundaryResize = (entries: ResizeObserverEntry[]) => {
    console.log(entries[0].contentRect);
    setBoundarySize({
      positionX: entries[0].contentRect.x,
      positionY: entries[0].contentRect.y,
      lengthX: entries[0].contentRect.width,
      lengthY: entries[0].contentRect.height,
    });
  };

  // Subscribe to the resize event on the div.
  useEffect(() => {
    const resizeObserver = new ResizeObserver(boundaryResize);
    if (boundaryRef != null) resizeObserver.observe(boundaryRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [boundaryRef]);

  // This is a wrapper function which ensures that changing the box size and position
  // will always be within the boundaries.
  const setBoxCoords = useCallback(
    (mutate: (old: BoxCoords) => BoxCoords) => {
      _setBoxCoords((old: BoxCoords) => {
        const newCoords = mutate(old);
        newCoords.lengthX = Math.max(
          0,
          Math.min(newCoords.lengthX, boundarySize.lengthX),
        );
        newCoords.lengthY = Math.max(
          0,
          Math.min(newCoords.lengthY, boundarySize.lengthY),
        );
        newCoords.positionX = Math.max(
          0,
          Math.min(
            newCoords.positionX,
            boundarySize.lengthX - newCoords.lengthX,
          ),
        );
        newCoords.positionY = Math.max(
          0,
          Math.min(
            newCoords.positionY,
            boundarySize.lengthY - newCoords.lengthY,
          ),
        );
        return newCoords;
      });
    },
    [boundarySize],
  );

  return (
    <div
      id="image"
      ref={(ref) => {
        setBoundaryRef(ref ?? undefined);
      }}
      className="flex relative justify-center p-2"
    >
      {image}
      <div
        ref={boxRef}
        className={"absolute self-center cursor-move border border-black"}
        onPointerDown={(e) => {
          boxRef.current?.setPointerCapture(e.pointerId);
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (dragging) {
            setBoxCoords((old) => {
              return {
                ...old,
                positionX: old.positionX + e.movementX,
                positionY: old.positionY + e.movementY,
              };
            });
          }
        }}
        onPointerUp={(_) => {
          setDragging(false);
        }}
        style={{
          left: `${boxCoords.positionX + boundarySize.positionX}px`,
          top: `${boxCoords.positionY + boundarySize.positionY}px`,
          width: `${boxCoords.lengthX}px`,
          height: `${boxCoords.lengthY}px`,
        }}
      >
        <Resizer
          className="rounded bg-black w-2 h-2 absolute left-[-4px] top-[-4px] cursor-nwse-resize"
          moveCallback={(dx, dy) => {
            setBoxCoords((old) => {
              return {
                positionX: old.positionX + dx,
                positionY: old.positionY + dy,
                lengthX: old.lengthX - dx,
                lengthY: old.lengthY - dy,
              };
            });
          }}
        ></Resizer>
        <Resizer
          className="rounded bg-black w-2 h-2 absolute left-[-4px] bottom-[-4px] cursor-nesw-resize"
          moveCallback={(dx, dy) => {
            setBoxCoords((old) => {
              return {
                positionX: old.positionX + dx,
                positionY: old.positionY,
                lengthX: old.lengthX - dx,
                lengthY: old.lengthY + dy,
              };
            });
          }}
        ></Resizer>
        <Resizer
          className="rounded bg-black w-2 h-2 absolute right-[-4px] top-[-4px] cursor-nesw-resize"
          moveCallback={(dx, dy) => {
            setBoxCoords((old) => {
              return {
                positionX: old.positionX,
                positionY: old.positionY + dy,
                lengthX: old.lengthX + dx,
                lengthY: old.lengthY - dy,
              };
            });
          }}
        ></Resizer>
        <Resizer
          className="rounded bg-black w-2 h-2 absolute right-[-4px] bottom-[-4px] cursor-nwse-resize"
          moveCallback={(dx, dy) => {
            setBoxCoords((old) => {
              return {
                positionX: old.positionX,
                positionY: old.positionY,
                lengthX: old.lengthX + dx,
                lengthY: old.lengthY + dy,
              };
            });
          }}
        ></Resizer>

        {/* Todo: Add vertical and horizontal resizers. */}
      </div>
    </div>
  );
}

// Right-bottom: polygon(78% 78%, 78% 0, 100% 0, 100% 100%, 0 100%, 0 78%)
// left-bottom: polygon(0 0, 22% 0, 22% 78%, 100% 78%, 100% 100%, 0 100%)
// right-top: polygon(0 22%, 0 0, 100% 0, 100% 100%, 78% 100%, 78% 22%)
// left-top: polygon(0 100%, 0 0, 100% 0, 100% 22%, 22% 78%, 22% 100%)
