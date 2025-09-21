import api from "../../api";

export const registration = (data) => api.post("/auth/registration" , data)
export const login = (data) => api.post("/auth/login" , data)
export const emailVerify = (token) => api.get(`/email-verify/${token}`)
export const refresh = () => api.post(`/auth/refresh`)
export const forgetPass = (data) => api.post("/auth/forget-password" , data)
export const resetPass = (token , data) => api.post(`/reset-password/${token}` , data)