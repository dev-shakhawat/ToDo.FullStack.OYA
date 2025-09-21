import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch } from "react-redux";
import Button from "../common/Button";
import { registration } from "../../features/auth/authSlice";

export default function Registration() {

  const dispatch = useDispatch();
  const [regForm , setRegForm] = useState({username: "", email: "", password: ""})

  return (
    <div className=" ">
      <h2 className="mb-7 text-[1.4rem] font-medium">Create an account</h2>
      <div className="flex  flex-col gap-4 text-sm">
        <Input onChange={(e)=>setRegForm({...regForm , username: e.target.value})} type="text" icon={`user`} placeholder="User name" />
        <Input onChange={(e)=>setRegForm({...regForm , email: e.target.value})} type="email" icon={`email`} placeholder="Your email" />
        <Input onChange={(e)=>setRegForm({...regForm , password: e.target.value})} type="password" icon={`password`} placeholder="Enter password" />
      </div>
      
      {/* button register */}
      <Button onClick={()=>dispatch(registration(regForm))} btnText='Create an account' />
    </div>
  );
}
