import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "https://to-do-full-stack-oya-4ojz.vercel.app",
    withCredentials: true // include cookies in request
});

const refreshApi = axios.create({
  baseURL: "https://to-do-full-stack-oya-4ojz.vercel.app",
  withCredentials: true , 
});




// export const setAccessToken = (token) => accessToken = token 

api.interceptors.request.use( async (config) => {
    
    try{ 

        let accessToken = localStorage.getItem("todoUser") ? JSON.parse(localStorage.getItem("todoUser")).accessToken : null
        
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