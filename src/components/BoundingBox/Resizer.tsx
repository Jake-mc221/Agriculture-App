"use client";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Resizer({
  moveCallback,
  className,
  ...divProps
}: {
  moveCallback: (dx: number, dy: number) => void;
} & ComponentPropsWithoutRef<"div">) {
  const [dragging, setDragging] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      {...divProps}
      className={twMerge(className, "touch-pinch-zoom")}
      ref={resizerRef}
      onPointerDown={(e) => {
        e.stopPropagation();
        setDragging(true);
        resizerRef.current?.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        e.stopPropagation();
        if (dragging) {
          moveCallback(e.movementX, e.movementY);
        }
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        setDragging(false);
      }}
    />
  );
}
