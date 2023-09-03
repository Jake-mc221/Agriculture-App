"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export type BoundingProps = {
  image: React.ReactElement;
  isBounding: boolean;
};


export default function Bounding({ image, isBounding }: BoundingProps) {
  const constraintsRef = useRef(null);

  return (
    <div className={"w-full h-full z-10 relative grid"} ref={constraintsRef}>
      {image}
      <motion.div
        style={{
          display: image && isBounding ? "grid" : "none",
          position: "absolute",
          zIndex: 1,
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderRadius: "0.375rem",
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: "lightgray",
          cursor: "move",
          height: "5em",
          width: "5em",
          touchAction: "none",
        }}
        drag
        dragTransition={{ power: 0.1, bounceDamping: 100 }} //counteracts all inertia
        dragElastic={0} //ensures that box can't leave constraint area
        dragConstraints={constraintsRef}
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
      </motion.div>
    </div>
  );
}
