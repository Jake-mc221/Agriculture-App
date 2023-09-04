"use client";

import React, { ReactNode, useRef } from "react";
import { motion } from "framer-motion";

export type BoundingProps = {
  image: ReactNode;
};

export default function BoundingBox({ image }: BoundingProps) {
  const constraintsRef = useRef(null);

  return (
    <div ref={constraintsRef}>
      {image}
      <motion.div
        className="absolute border border-blue-500 w-40 h-40"
        drag
        dragTransition={{ power: 0.0 }}
        dragElastic={0}
        dragConstraints={constraintsRef}
      >
        <div className="bg-blue-500 rounded-full h-2 w-2 absolute top-[-5px] left-[-5px]"></div>
        <div className="bg-blue-500 rounded-full h-2 w-2 absolute top-[-5px] right-[-5px]"></div>
        <div className="bg-blue-500 rounded-full h-2 w-2 absolute bottom-[-5px] left-[-5px]"></div>
        <div className="bg-blue-500 rounded-full h-2 w-2 absolute bottom-[-5px] right-[-5px]"></div>
      </motion.div>
    </div>
  );
}
