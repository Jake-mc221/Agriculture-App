"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function Resizable() {
  const constraintsRef = useRef(null);

  return (
    <div className="flex-1 w-full" ref={constraintsRef}>
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          borderRadius: "0.375rem",
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: "lightgray",
          cursor: "move",
          margin: 20,
          height: "14em",
          width: "14em",
          touchAction: "none",
          overflow: "hidden",
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
