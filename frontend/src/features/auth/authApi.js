import api from "../../api";

export const registration = (data) => api.post("/auth/registration" , data)
export const login = (data) => api.post("/auth/login" , data)
export const emailVerify = (token) => api.get(`/emailVerify/${token}`)
export const refresh = (data) => api.post(`/auth/refresh` , data)
export const forgetPass = (data) => api.post("/auth/forgetPass" , data)
export const resetPass = (token , data) => api.post(`/resetPass/${token}` , data)