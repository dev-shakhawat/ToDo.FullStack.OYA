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


export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todoList = action.payload;
      });
  }
});



export const {} = todoSlice.actions;
export default todoSlice.reducer;