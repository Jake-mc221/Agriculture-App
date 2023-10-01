"use client";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCallback } from "react";

export function Resizer({
  moveCallback,
  className,
  informDrag,
  ...divProps
}: {
  moveCallback: (dx: number, dy: number) => void;
  informDrag: (val: boolean) => void;
} & ComponentPropsWithoutRef<"div">) {
  const [dragging, _setDragging] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);

  const setDragging = useCallback((val: boolean) => {
    _setDragging(val);
    informDrag(val);
  }, []);

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
