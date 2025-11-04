import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as todoApi from "./todoApi";



export const createTodo = createAsyncThunk(
  "todo/create",
  async (data, { rejectWithValue }) => { 
    
    try {
      const res = await todoApi.createTodo(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const getAllTodo = createAsyncThunk(
  "todo/getall",
  async (data, { rejectWithValue }) => { 
    
    try {
      const res = await todoApi.getAllTodo(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await todoApi.updateTodo(id, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const deleteTodo = createAsyncThunk(
  "todo/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await todoApi.deleteTodo(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => { 
        state.todoList = [action.payload.todo , ...state.todoList];
      })


      // get all todo
      .addCase(getAllTodo.fulfilled, (state, action) => { 
        
        state.todoList = action.payload.todos;
      })

      // delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => { 
        state.todoList = state.todoList.filter((todo) => todo._id !== action.payload.id);
      })


      // update todo
      .addCase(updateTodo.fulfilled, (state, action) => {  
        // remove previous todo
        const removerdOld = state.todoList.filter((todo) => todo._id !== action.payload.todo._id);
        const newtodo = action.payload.todo; 
        state.todoList = [newtodo , ...removerdOld];
      });
  }
});



export const {} = todoSlice.actions;
export default todoSlice.reducer;