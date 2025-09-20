import React from 'react'
import Input from '../common/Input'

export default function Login({setCurrentPage}) {
  return (
    <div className=' '>
    
      <h2 className="mb-7 text-[1.4rem] font-medium">Login your account</h2>
      <div className="flex  flex-col gap-4 text-sm">  
        <Input type="email" icon={`email`} placeholder="Your email"   />
        <Input type="password" icon={`password`} placeholder="Enter password"   />
      </div>

      {/* forget password */}
      <button onClick={()=>setCurrentPage("forgetPass")} type="button" className='mt-1 cursor-pointer hover:underline  '>Forget password?</button>
      
      <button className="mt-7 h-12 w-full cursor-pointer rounded-md bg-white px-2 text-sm font-medium text-zinc-800 shadow-xl">
        Login
      </button> 
    </div>

  )
}
