"use client";

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Resizer } from "./Resizer";
import { BoxCoords } from "@/types/metadataTypes";

export default function BoundingBox({
  image,
  informDrag,
  informBound,
  isFrozen,
}: {
  image: ReactNode;
  informDrag?: (val: boolean) => void;
  informBound?: (coords: BoxCoords) => void;
  isFrozen: boolean;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  // Using a callback ref.
  const [boundaryRef, setBoundaryRef] = useState<HTMLDivElement>();
  const [dragging, _setDragging] = useState(false);
  const [boundarySize, setBoundarySize] = useState<BoxCoords>({
    positionX: 0,
    positionY: 0,
    lengthX: Infinity,
    lengthY: Infinity,
  });
  const [boxCoords, _setBoxCoords] = useState<BoxCoords>({
    positionX: 0.25,
    positionY: 0.25,
    lengthX: 0.5,
    lengthY: 0.5,
  });

  // This is a wrapper function which ensures that changing the box size and position
  // will always be within the boundaries.
  const setBoxCoords = useCallback((mutate: (old: BoxCoords) => BoxCoords) => {
    _setBoxCoords((old: BoxCoords) => {
      const newCoords = mutate(old);
      newCoords.lengthX = Math.max(0, Math.min(newCoords.lengthX, 1));
      newCoords.lengthY = Math.max(0, Math.min(newCoords.lengthY, 1));
      newCoords.positionX = Math.max(
        0,
        Math.min(newCoords.positionX, 1 - newCoords.lengthX),
      );
      newCoords.positionY = Math.max(
        0,
        Math.min(newCoords.positionY, 1 - newCoords.lengthY),
      );
      return newCoords;
    });
  }, []);

  useEffect(() => informBound?.(boxCoords), [boxCoords]);

  const boundaryResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      console.log(entries[0].contentRect);
      setBoundarySize({
        positionX: entries[0].contentRect.x,
        positionY: entries[0].contentRect.y,
        lengthX: entries[0].contentRect.width,
        lengthY: entries[0].contentRect.height,
      });

      setBoxCoords((old) => old);
    },
    [setBoxCoords],
  );

  const setDragging = useCallback(
    (val: boolean) => {
      _setDragging(val);
      informDrag?.(val);
    },
    [informDrag],
  );

  // Subscribe to the resize event on the div.
  useEffect(() => {
    const resizeObserver = new ResizeObserver(boundaryResize);
    if (boundaryRef != null) resizeObserver.observe(boundaryRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [boundaryRef, boundaryResize]);

  return (
    <div
      id="image"
      ref={(ref) => {
        setBoundaryRef(ref ?? undefined);
      }}
      className="flex bg-black h-full w-full relative justify-center"
    >
      {image}
      <div
        ref={boxRef}
        className={
          "absolute self-center cursor-move m-4 border-2 border-white touch-pinch-zoom"
        }
        onPointerDown={(e) => {
          boxRef.current?.setPointerCapture(e.pointerId);
          setDragging(true);
        }}
        onPointerMove={(e) => {
          if (dragging && !isFrozen) {
            setBoxCoords((old) => {
              return {
                ...old,
                positionX: old.positionX + e.movementX / boundarySize.lengthX,
                positionY: old.positionY + e.movementY / boundarySize.lengthY,
              };
            });
          }
        }}
        onPointerUp={() => {
          setDragging(false);
        }}
        style={{
          left: `${
            boxCoords.positionX * boundarySize.lengthX + boundarySize.positionX
          }px`,
          top: `${
            boxCoords.positionY * boundarySize.lengthY + boundarySize.positionY
          }px`,
          width: `${boxCoords.lengthX * boundarySize.lengthX}px`,
          height: `${boxCoords.lengthY * boundarySize.lengthY}px`,
        }}
      >
        <Resizer
          className="rounded-full bg-white w-4 h-4 absolute left-[-4px] top-[-4px] cursor-nwse-resize"
          moveCallback={(dx, dy) => {
            if (isFrozen) {
              return;
            }
            setBoxCoords((old) => {
              return {
                positionX: old.positionX + dx / boundarySize.lengthX,
                positionY: old.positionY + dy / boundarySize.lengthY,
                lengthX: old.lengthX - dx / boundarySize.lengthX,
                lengthY: old.lengthY - dy / boundarySize.lengthY,
              };
            });
          }}
          informDrag={informDrag}
        ></Resizer>
        <Resizer
          className="rounded-full bg-white w-4 h-4 absolute left-[-4px] bottom-[-4px] cursor-nesw-resize"
          moveCallback={(dx, dy) => {
            if (isFrozen) {
              return;
            }
            setBoxCoords((old) => {
              return {
                positionX: old.positionX + dx / boundarySize.lengthX,
                positionY: old.positionY,
                lengthX: old.lengthX - dx / boundarySize.lengthX,
                lengthY: old.lengthY + dy / boundarySize.lengthY,
              };
            });
          }}
          informDrag={informDrag}
        ></Resizer>
        <Resizer
          className="rounded-full bg-white w-4 h-4 absolute right-[-4px] top-[-4px] cursor-nesw-resize"
          moveCallback={(dx, dy) => {
            if (isFrozen) {
              return;
            }
            setBoxCoords((old) => {
              return {
                positionX: old.positionX,
                positionY: old.positionY + dy / boundarySize.lengthY,
                lengthX: old.lengthX + dx / boundarySize.lengthX,
                lengthY: old.lengthY - dy / boundarySize.lengthY,
              };
            });
          }}
          informDrag={informDrag}
        ></Resizer>
        <Resizer
          className="rounded-full bg-white w-4 h-4 absolute right-[-4px] bottom-[-4px] cursor-nwse-resize"
          moveCallback={(dx, dy) => {
            if (isFrozen) {
              return;
            }
            setBoxCoords((old) => {
              return {
                positionX: old.positionX,
                positionY: old.positionY,
                lengthX: old.lengthX + dx / boundarySize.lengthX,
                lengthY: old.lengthY + dy / boundarySize.lengthY,
              };
            });
          }}
          informDrag={informDrag}
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
