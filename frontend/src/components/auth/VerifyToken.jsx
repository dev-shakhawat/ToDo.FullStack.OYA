import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { clearStatus, emailVerify, notify } from "../../features/auth/authSlice";
import {ErrorNotification, SuccessNotification} from "../common/Notification";

export default function VerifyToken() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
 
  useEffect(() => {
    
    if (token) {
      dispatch(emailVerify(token));
      setTimeout(() => {
        dispatch(notify(false))
        dispatch(clearStatus())
      }, 2000);
    }
  }, []);

  return  <></>
}
