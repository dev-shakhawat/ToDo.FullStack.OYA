import React, { useState } from "react";


// icons
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import EmailIcon from "../../assets/icons/EmailIcon";
import UserIcon from "../../assets/icons/UserIcon";
import LockIcon from "../../assets/icons/LockIcon";

export default function Input({ type, placeholder , value , icon , onChange  }) {

    const [inputType, setInputType] = useState(type);
    const handleChangeType = ()=>{
        setInputType(inputType === "password" ? "text" : "password")
    }
  return (
    <div className={`relative h-11 overflow-hidden   `}>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        className={`peer relative z-1 h-full w-full rounded-md border border-white/8 bg-white/2 ${icon ? type == "password" ? "pl-11 pr-8" : "pl-11 pr-4" : "px-4"}  duration-300 placeholder:text-white/20 focus:outline-0`}
        placeholder={placeholder}
      />

      {/* icons */}
      {icon === "email" && <EmailIcon/>}
      {icon === "user" && <UserIcon/>}
      {icon === "password" && <LockIcon/>}
      <span className="absolute bottom-0 left-0 z-2 h-px w-full bg-gradient-to-r from-transparent from-5% via-white to-transparent to-95% opacity-0 transition-opacity duration-300 peer-focus-visible:opacity-40" />
      <span className="absolute inset-x-4 bottom-0 z-1 h-4 origin-bottom scale-y-0 -skew-x-12 bg-gradient-to-b from-white to-transparent opacity-0 blur-md duration-300 peer-focus-visible:scale-100 peer-focus-visible:opacity-30" />

      {type == "password" && <button onClick={handleChangeType} type="button" className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer p-2 z-[1]  " > {inputType == "password" ? <GoEyeClosed/> : <GoEye/>}   </button>}

    </div>
  );
}
