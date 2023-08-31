import React from "react";

export function TextInput() {
  return (
    <div className="fixed top-16 w-72">
      <div className="relative mt-1">
        <input
          type="text"
          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 rounded-full bg-gray-200"
          placeholder="Type something..."
          style={{ outline: "none" }}
        />
      </div>
    </div>
  );
}
