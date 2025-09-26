import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { forgetPass } from "../../features/auth/authSlice";

export default function ForgetPassword({}) {
  
  const [mail , setMail] = useState({email: ""})
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  
  const handleGetResetLink = ()=>{
    dispatch(forgetPass(mail))
  }
  
  return (
    <div className=" ">
      <h2 className="mb-7 text-[1.4rem] font-medium">Forgot your password?</h2>
      <div className="flex  flex-col gap-4 text-sm">
        <Input onChange={(e)=>setMail({email: e.target.value})} type="email" icon={`email`} placeholder="Your email" /> 
      </div>
      <button onClick={handleGetResetLink} className="mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
        Send reset link
      </button>
    </div>
  );
}
