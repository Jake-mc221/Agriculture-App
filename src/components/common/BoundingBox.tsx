"use client";

import React, { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Resizer } from "./Resizer";

export type BoundingProps = {
  image: ReactNode;
};

export default function BoundingBox({ image }: BoundingProps) {
  const constraintsRef = useRef(null); // records the constraints of the bounding box. This is assigned to be this element
  const [dimensions, setDimensions] = useState({ x: 50, y: 50 }); // records the current width and height of the bounding box

  return (
    <div
      id="image"
      ref={constraintsRef}
      className="flex relative justify-center"
    >
      {image}
      <motion.div
        id="box"
        className={"absolute self-center cursor-move border border-x-white-300"}
        style={{ width: dimensions.x + "px", height: dimensions.y + "px" }} // I had to use the style attribute here bc I'm pretty sure dynamic class names are way more difficult in tailwind pls see here: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
        drag
        dragTransition={{ power: 0.0 }}
        dragElastic={0}
        dragConstraints={constraintsRef}
      >
        {/*This is a little ugly but I had to put in these divs to show the grid. If I used an image or smthg the scaling would get messed up during resizing */}
        <div className="grid grid-cols-4 h-full w-full">
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
          <div className="border rounded opacity-5 border-gray-500" />
        </div>

        <Resizer
          left={1}
          top={1}
          shape={"polygon(78% 78%, 78% 0, 100% 0, 100% 100%, 0 100%, 0 78%)"}
          dimensions={dimensions}
          setDimensions={setDimensions}
          position="bottom-[-5px] right-[-5px] cursor-nwse-resize "
        />
        <Resizer
          left={1}
          top={-1}
          shape={"polygon(0 22%, 0 0, 100% 0, 100% 100%, 78% 100%, 78% 22%)"}
          dimensions={dimensions}
          setDimensions={setDimensions}
          position="top-[-5px] right-[-5px] cursor-nesw-resize "
        />
        <Resizer
          left={-1}
          top={1}
          shape={"polygon(0 0, 22% 0, 22% 78%, 100% 78%, 100% 100%, 0 100%)"}
          dimensions={dimensions}
          setDimensions={setDimensions}
          position="bottom-[-5px] left-[-5px] cursor-nesw-resize "
        />
        <Resizer
          left={-1}
          top={-1}
          shape={"polygon(0 100%, 0 0, 100% 0, 100% 22%, 22% 22%, 22% 100%)"}
          dimensions={dimensions}
          setDimensions={setDimensions}
          position="top-[-5px] left-[-5px] cursor-nwse-resize "
        />
      </motion.div>
    </div>
  );
}

// Right-bottom: polygon(78% 78%, 78% 0, 100% 0, 100% 100%, 0 100%, 0 78%)
// left-bottom: polygon(0 0, 22% 0, 22% 78%, 100% 78%, 100% 100%, 0 100%)
// right-top: polygon(0 22%, 0 0, 100% 0, 100% 100%, 78% 100%, 78% 22%)
// left-top: polygon(0 100%, 0 0, 100% 0, 100% 22%, 22% 78%, 22% 100%)
