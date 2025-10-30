import api from "../../api";



export const createTodo = (data) => api.post("/todo/create" , data) 