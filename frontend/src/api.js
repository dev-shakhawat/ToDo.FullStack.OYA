import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true // include cookies in request
});

let accessToken = null

export const setAccessToken = (token) => accessToken = token 

api.interceptors.request.use( async (config) => {

    console.log(config);
    
    console.log("this is before request")
    if(accessToken) {
        const decodedToken = jwtDecode(accessToken)
        if(decodedToken.exp * 1000 < Date.now()) {
            const res = await api.post("auth/refresh")
            accessToken = res.data.accessToken
        }

        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
    
})

export default api