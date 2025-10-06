import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearStatus, emailVerify } from "../../features/auth/authSlice";

export default function VerifyToken() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(emailVerify(token));
      setTimeout(() => {
        dispatch(clearStatus())
      }, 2000);
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative mx-auto my-auto w-full max-w-110 shrink-0 overflow-hidden rounded-4xl border-t border-white/20 bg-gradient-to-t from-zinc-100/10 to-zinc-950/50 to-50% p-8 text-white shadow-2xl shadow-black outline -outline-offset-1 outline-white/5 backdrop-blur-2xl">
        <h2 className={`mb-5 text-[1.4rem] font-medium text-center ${error ? "text-red-500" : "text-green-500"}  `}>
          {error ? "Email verification failed" : "Email verification successful"}
        </h2>
        <div className={`flex  flex-col gap-4 text-sm `}>  
          <p className={`text-center ${error ? "text-red-500" : "text-white"}     `}>{error ? error : message}</p>
        </div>
      </div>
    </div>
  );
}
