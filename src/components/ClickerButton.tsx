"use client";

import { useEffect, useState } from "react";

export function ClickerButton() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setCount(0);
    }, 1000);
  }, []);

  return (
    <button
      onClick={() => {
        setCount(count + 1);
      }}
      className="w-10 h-10 bg-red-500 p-2 text-white"
    >
      {count}
    </button>
  );
}
