"use client";

import { useState, useRef } from "react";

export default function Bounding() {
  const [mouseDown, setMouseDown] = useState(false);
  const [boxPosition, setBoxPosition] = useState({ left: 0, top: 0 });

  const elementRef = useRef(null);

  const moveBox = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!mouseDown) return;
    setBoxPosition({
      left: boxPosition.left + e.movementX,
      top: boxPosition.top + e.movementY,
    });
    console.log(boxPosition.left + " " + boxPosition.top);
  };

  return (
    <div
      ref={elementRef}
      onMouseDown={() => setMouseDown(true)}
      onMouseMove={(e) => moveBox(e)}
      onMouseLeave={() => setMouseDown(false)}
      onMouseUp={() => setMouseDown(false)}
      style={{ left: boxPosition.left, top: boxPosition.top }}
      className="cursor-move fixed m-20 w-96 h-96 grid grid-cols-4 rounded-md border-2 border-gray-100  border-solid"
    >
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
      <div className="border rounded-md border-gray-50 h-full"></div>
    </div>
  );
}
