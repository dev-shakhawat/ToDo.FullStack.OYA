import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Button({btnText = "button" ,  onClick }) {

    const {loading} = useSelector(state => state.auth)

  return (
    <button onClick={onClick} className=" flex items-center gap-2 justify-center  mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
      <span>{btnText}</span>
      {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
    </button>
  );
}
