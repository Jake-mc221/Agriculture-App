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
  const resize = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    corner: string,
    left: number,
    top: number,
  ) => {
    const image = document.getElementById("image")?.getBoundingClientRect();
    const box = document.getElementById("box");
    const width = dimensions.x + left * (e.clientX - mouseDim.x);
    const height = dimensions.y + top * (e.clientY - mouseDim.y);

    if (
      !isResizing ||
      image == null ||
      box == null
      //image.right < box.getBoundingClientRect().right + width ||
      //image.left > box.getBoundingClientRect().left + width ||
      //image.top > box.getBoundingClientRect().top + height ||
      //image.bottom < box.getBoundingClientRect().bottom + height
    ) {
      return;
    }
    // Set the new width and height of the box
    const minimum_size = 50;
    if (width > minimum_size && height > minimum_size) {
      setDimensions({ x: width, y: height });
      console.log("changed both");
    } else if (width > minimum_size) {
      setDimensions({ x: width, y: dimensions.y });
      console.log("changed width only");
    } else if (height > minimum_size) {
      setDimensions({ x: dimensions.x, y: height });
      console.log("changed height only");
    }
    // Set the new position of the box based on which corner you are coming from
    box.style.transform =
      "translate(calc(" +
      (mouseDim.x + image.left) +
      "px , calc(" +
      (mouseDim.y + image.top) +
      "px))";

    setMouseDim({ x: e.clientX, y: e.clientY });
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
        {/*This is a little ugly but I had to put in these divs to show the grid. If I used an image or smthg the scaling would get messed up */}
        <div className="grid grid-cols-4 h-full w-full">
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
          <div className="border rounded border-gray-500" />
        </div>

        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
          }}
          onDrag={(e) => resize(e, "top-left", -1, -1)}
          onMouseDown={() => {
            setIsResizing(true);
          }}
          className="cursor-nwse-resize bg-white rounded-full h-2 w-2 absolute top-[-3px] left-[-3px]"
        ></div>
        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
          }}
          onDrag={(e) => resize(e, "top-right", 1, -1)}
          onMouseDown={() => {
            setIsResizing(true);
          }}
          className="cursor-nesw-resize bg-white rounded-full h-2 w-2 absolute top-[-3px] right-[-3px]"
        ></div>
        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
          }}
          onDrag={(e) => resize(e, "bottom-left", -1, 1)}
          onMouseDown={() => {
            setIsResizing(true);
          }}
          className="cursor-nesw-resize bg-white rounded-full h-2 w-2 absolute bottom-[-3px] left-[-3px]"
        ></div>
        <div
          draggable
          onMouseUp={() => {
            setIsResizing(false);
          }}
          onDrag={(e) => resize(e, "bottom-right", 1, 1)}
          onMouseDown={(e) => {
            setIsResizing(true);
            setMouseDim({ x: e.pageX, y: e.pageY });
          }}
          className="cursor-nwse-resize bg-white rounded-full h-2 w-2 absolute bottom-[-3px] right-[-3px]"
        ></div>
      </motion.div>
    </div>
  );
}
