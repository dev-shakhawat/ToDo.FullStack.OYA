import React from "react";
import Input from "../common/Input";

export default function ForgetPassword({}) {
  return (
    <div className=" ">
      <h2 className="mb-7 text-[1.4rem] font-medium">Reset your password</h2>
      <div className="flex  flex-col gap-4 text-sm">
        <Input type="email" icon={`email`} placeholder="Your email" /> 
      </div>
      <button className="mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
        Send reset link
      </button>
    </div>
  );
}
