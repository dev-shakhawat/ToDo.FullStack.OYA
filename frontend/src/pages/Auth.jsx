import React, { useState } from 'react'
import Login from '../components/auth/Login'
import '../components/auth/auth.css'
import Registration from '../components/auth/Registration'
import ForgetPassword from '../components/auth/ForgetPassword'


export default function Auth() {

    const [currentPage , setCurrentPage] = useState('login')

 

  return (
<div className='flex h-screen items-center justify-center'>
    <div 
      className="relative mx-auto my-auto w-full max-w-110 shrink-0 overflow-hidden rounded-4xl border-t border-white/20 bg-gradient-to-t from-zinc-100/10 to-zinc-950/50 to-50% p-8 text-white shadow-2xl shadow-black outline -outline-offset-1 outline-white/5 backdrop-blur-2xl"
    >

      {/* auth navigaton */}
      <div className="mb-8 inline-flex h-12 items-center rounded-full border-b border-b-white/12 bg-zinc-950/75 p-1 text-sm font-medium">
        <button type='button' onClick={()=> setCurrentPage("login")} className={`${currentPage == "login" ? "inline-flex h-full items-center rounded-full border-t border-t-white/10 bg-zinc-800 px-6 outline -outline-offset-1 outline-white/4" : "px-6 text-zinc-500"} cursor-pointer `}>
          Login
        </button> 
        <button type='button' onClick={()=> setCurrentPage("registration")} className={`${currentPage == "registration" ? "inline-flex h-full items-center rounded-full border-t border-t-white/10 bg-zinc-800 px-6 outline -outline-offset-1 outline-white/4" : "px-6 text-zinc-500"} cursor-pointer `}>
          Registration
        </button> 
      </div>
      

      {/* auth components */}
      {currentPage == "login" && <Login setCurrentPage={setCurrentPage}  />}
      {currentPage == "registration" && <Registration/>}
      {currentPage == "forgetPass" && <ForgetPassword/>} 


    </div>
</div>
  )
}
