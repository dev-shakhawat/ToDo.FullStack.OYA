import React, { useState } from "react";
import Input from "../common/Input";
import { useDispatch, useSelector } from "react-redux";
import { resetPass } from "../../features/auth/authSlice";
import { useParams } from "react-router";

export default function ResetPassword() {
  
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const [data , setData] = useState({password: ""})

  const handleResetPass = ()=>{
    dispatch(resetPass(token , data))
  }

  return (
    <div className=" flex h-screen items-center justify-center "> 

      <div className="relative mx-auto my-auto w-full max-w-110 shrink-0 overflow-hidden rounded-4xl border-t border-white/20 bg-gradient-to-t from-zinc-100/10 to-zinc-950/50 to-50% p-8 text-white shadow-2xl shadow-black outline -outline-offset-1 outline-white/5 backdrop-blur-2xl">

        <Input onChange={(e)=> setData({password: e.target.value})} type="password" icon={`password`} placeholder="Enter new password" />
  
        <button onClick={handleResetPass} className="mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
          Re-set password
        </button>
        
      </div>
    </div>
  );
}
