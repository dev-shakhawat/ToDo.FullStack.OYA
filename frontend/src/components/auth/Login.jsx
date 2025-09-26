import React, { useState } from 'react'

// components
import Input from '../common/Input'

// redux
import { useDispatch } from 'react-redux'

// icons 
import Button from '../common/Button';
import { login } from '../../features/auth/authSlice';

export default function Login({setCurrentPage}) {
   
  const dispatch = useDispatch();
  const [loginForm , setLoginForm] = useState({ email: "", password: "" })
 

  const handleLogin=()=>{

    console.log("clicked");
    
    dispatch(login(loginForm))
  }
 
  return (
    <div className=' '>
      
      {/* page title */}
      <h2 className="mb-7 text-[1.4rem] font-medium">Login your account</h2>

      {/* form */}
      <div className="flex  flex-col gap-4 text-sm">  
        <Input onChange={(e)=>setLoginForm({...loginForm , email: e.target.value})} type="email" icon={`email`} placeholder="Your email"   />
        <Input onChange={(e)=>setLoginForm({...loginForm , password: e.target.value})} type="password" icon={`password`} placeholder="Enter password"   />
      </div>

      {/* forget password */}
      <button onClick={()=>setCurrentPage("forgetPass")} type="button" className='mt-1 cursor-pointer hover:underline  '>Forget password?</button>
      

      {/* button login */}
      <Button onClick={handleLogin} btnText='Login' />

    </div>

  )
}
