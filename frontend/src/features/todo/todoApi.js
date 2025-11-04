import api from "../../api";



export const createTodo = (data) => api.post("/todo/create" , data) 

export const getAllTodo = (data) => api.get("/todo/getall" , data)

export const updateTodo = (id , data ) => api.put(`/todo/update/${id}` , data )

export const deleteTodo = (id) => api.delete(`/todo/delete/${id}`)