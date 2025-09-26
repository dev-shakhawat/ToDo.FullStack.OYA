import React from "react";

export default function Notification({ message }) {
  return (
    <div className="w-full h-screen grid place-items-center  fixed top-0 left-0 z-50     ">
      <p className={`max-w-1/2 text-center text-[1.4rem] font-medium bg-black/50 text-white rounded-lg px-2 py-3 `}>{message}</p>
    </div>
  );
}
