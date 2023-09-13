"use client";
import { useState } from "react";

export type ResizerProps = {
  left: number;
  top: number;
  shape: string;
  dimensions: {
    x: number;
    y: number;
  };
  setDimensions: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  position: string;
};

export function Resizer({
  left,
  top,
  shape,
  dimensions,
  setDimensions,
  position,
}: ResizerProps) {
  const [isResizing, setIsResizing] = useState(false); // records whether the bounding box is being resized or not
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // records the most recent click positions of the mouse before dragging

  const resize = (x: number, y: number, left: number, top: number) => {
    const image = document.getElementById("image")?.getBoundingClientRect();
    const box = document.getElementById("box");

    const width = dimensions.x + left * (x - mousePos.x);
    const height = dimensions.y + top * (y - mousePos.y);

    if (
      !isResizing ||
      image == null ||
      box == null ||
      image.left > x ||
      image.right < x ||
      image.top > y ||
      image.bottom < y
    ) {
      return;
    }
    // Set the new width and height of the box
    const minimum_size = 50;
    if (width > minimum_size && height > minimum_size) {
      setDimensions({ x: width, y: height });
    } else if (width > minimum_size) {
      setDimensions({ x: width, y: dimensions.y });
    } else if (height > minimum_size) {
      setDimensions({ x: dimensions.x, y: height });
    }
    // Set the new position of the box based on which corner you are coming from
    box.style.transform =
      "translate(calc(" +
      (mousePos.x - image.left) +
      "px , calc(" +
      (mousePos.y - image.top) +
      "px))";

    setMousePos({ x, y });
  };
  return (
    <div
      draggable
      onMouseUp={() => {
        setIsResizing(false);
      }}
      onDrag={(e) => resize(e.clientX, e.clientY, 1, 1)}
      onMouseDown={(e) => {
        setIsResizing(true);
        setMousePos({ x: e.pageX, y: e.pageY });
      }}
      // Phone functions
      onTouchStart={(e) => {
        setIsResizing(true);
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }}
      onTouchMove={(e) =>
        resize(e.touches[0].clientX, e.touches[0].clientY, left, top)
      }
      onTouchEnd={() => {
        setIsResizing(false);
      }}
      className={"bg-gray-200 rounded h-5 w-5 absolute " + position}
      style={{
        clipPath: shape,
      }} // I wanted to do it like this bc the alternative would be to add a css file to get this kind of preciseness: https://stackoverflow.com/questions/68932695/how-to-add-a-clip-path-to-image-in-tailwind
    />
  );
}
