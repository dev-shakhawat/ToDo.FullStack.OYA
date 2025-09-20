import React from "react";
import Input from "../common/Input";

export default function Registration() {
  return (
    <div className=" ">
      <h2 className="mb-7 text-[1.4rem] font-medium">Create an account</h2>
      <div className="flex  flex-col gap-4 text-sm">
        <Input type="text" icon={`user`} placeholder="User name" />
        <Input type="email" icon={`email`} placeholder="Your email" />
        <Input type="password" icon={`password`} placeholder="Enter password" />
      </div>
      <button className="mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
        Create an account
      </button>
    </div>
  );
}
