import React from "react";

export function SuccessNotification({ message }) {
  return (
    <div className="w-full h-screen grid place-items-center  fixed top-0 left-0 z-50     ">
      <p className={`max-w-1/2 text-center text-base font-medium bg-green-500/20 text-white rounded-lg px-10 py-3 `}>{message}</p>
    </div>
  );
}


export function ErrorNotification({ error }) {
  return (
    <div className="w-full h-screen grid place-items-center  fixed top-0 left-0 z-50     ">
      <p className={`max-w-1/2 text-center text-base font-medium bg-red-500/20 text-white rounded-lg px-10 py-3 `}>{error}</p>
    </div>
  );
}

