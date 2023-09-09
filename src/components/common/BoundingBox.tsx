"use client";

import React, { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

export type BoundingProps = {
  image: ReactNode;
};



export default function BoundingBox({ image }: BoundingProps) {
  const constraintsRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ x: 50, y: 50 });

  const resize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isResizing) {
      return;
    }
    setDimensions({ x: dimensions.x + 1, y: dimensions.y + 1 });
  };

  return (
    <div ref={constraintsRef} className="flex relative justify-center">
      {image}
      <motion.div
        className={"absolute cursor-move border border-x-white-300"}
        style={{ width: dimensions.x + "px", height: dimensions.y + "px" }} // I had to use the style attribute here bc I'm pretty sure dynamic class names are way more difficult in tailwind pls see here: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
        drag
        dragTransition={{ power: 0.0 }}
        dragElastic={0}
        dragConstraints={constraintsRef}
      >
        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
            console.log("mouse up");
          }}
          onDrag={(e) => resize(e)}
          onMouseDown={() => {
            setIsResizing(true);
            console.log("mouse down");
          }}
          className="cursor-nwse-resize bg-white rounded-full h-2 w-2 absolute top-[-5px] left-[-5px]"
        ></div>
        <div
          draggable
          className="cursor-nesw-resize bg-white rounded-full h-2 w-2 absolute top-[-5px] right-[-5px]"
        ></div>
        <div
          draggable
          className="cursor-nesw-resize bg-white rounded-full h-2 w-2 absolute bottom-[-5px] left-[-5px]"
        ></div>
        <div
          draggable
          className="cursor-nwse-resize bg-white rounded-full h-2 w-2 absolute bottom-[-5px] right-[-5px]"
        ></div>
      </motion.div>
    </div>
  );
}