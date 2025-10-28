import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import { forgetPass } from "../../features/auth/authSlice";
import Button from "../common/Button";

export default function ForgetPassword({}) {
  
  const [mail , setMail] = useState({email: ""})
  const dispatch = useDispatch(); 
  
  const handleGetResetLink = ()=>{
    dispatch(forgetPass(mail))
  }
  
  return (
    <div className="bgimage  ">
      <h2 className="mb-7 text-[1.4rem] font-medium">Forgot your password?</h2>
      <div className="flex  flex-col gap-4 text-sm">
        <Input onChange={(e)=>setMail({email: e.target.value})} type="email" icon={`email`} placeholder="Your email" /> 
      </div>
      
      <Button onClick={handleGetResetLink} btnText='Get reset link' />

    </div>
  );
}
