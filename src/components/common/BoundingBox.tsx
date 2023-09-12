"use client";

import React, { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

export type BoundingProps = {
  image: ReactNode;
};

export default function BoundingBox({ image }: BoundingProps) {
  const constraintsRef = useRef(null); // records the constraints of the bounding box. This is assigned to be this element
  const [isResizing, setIsResizing] = useState(false); // records whether the bounding box is being resized or not
  const [dimensions, setDimensions] = useState({ x: 50, y: 50 }); // records the current width and height of the bounding box
  const [mouseDim, setMouseDim] = useState({ x: 0, y: 0 }); // records the most recent click positions of the mouse before dragging

  const resize = (x: number, y: number) => {
    const image = document.getElementById("image")?.getBoundingClientRect();
    const box = document.getElementById("box");
    const width = dimensions.x + (x - mouseDim.x);
    const height = dimensions.y + (y - mouseDim.y);

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
      (mouseDim.x + image.left) +
      "px , calc(" +
      (mouseDim.y + image.top) +
      "px))";

    setMouseDim({ x: x, y: y });
  };

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

        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
          }}
          onDrag={(e) => resize(e.clientX, e.clientY)}
          onMouseDown={(e) => {
            setIsResizing(true);
            setMouseDim({ x: e.pageX, y: e.pageY });
          }}
          // Phone functions
          onTouchStart={(e) => {
            console.log("touch");
            setIsResizing(true);
            setMouseDim({
              x: e.touches[0].clientX,
              y: e.touches[0].clientY,
            });
          }}
          onTouchMove={(e) =>
            resize(e.touches[0].clientX, e.touches[0].clientY)
          }
          onTouchEnd={() => {
            setIsResizing(false);
          }}
          className="cursor-nwse-resize bg-gray-200 rounded h-5 w-5 absolute bottom-[-5px] right-[-5px]"
          style={{
            clipPath:
              "polygon(78% 78%, 78% 0, 100% 0, 100% 100%, 0 100%, 0 78%)",
          }} // I wanted to do it like this bc the alternative would be to add a  css file to get this kind of preciseness: https://stackoverflow.com/questions/68932695/how-to-add-a-clip-path-to-image-in-tailwind
        ></div>
      </motion.div>
    </div>
  );
}
