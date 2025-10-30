import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true // include cookies in request
});

const refreshApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});

let accessToken = localStorage.getItem("todoUser") ? JSON.parse(localStorage.getItem("todoUser")).accessToken : null

 


export const setAccessToken = (token) => accessToken = token 

api.interceptors.request.use( async (config) => {

    try{
        console.log("this is before request")
        console.log(accessToken);
        
        
        if(accessToken) {
            const decodedToken = jwtDecode(accessToken)
            if(decodedToken.exp * 1000 < Date.now()) {
                const res = await refreshApi.post("auth/refresh")
                accessToken = res.data.accessToken
            }

            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config

    }catch(error){
        console.log(error); 
        accessToken = null
        return config
    }
    
})

export default api