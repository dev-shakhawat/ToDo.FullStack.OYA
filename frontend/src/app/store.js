import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import todoSlice from '../features/todo/todoSlice'

export default configureStore({
  reducer: {
    auth : authSlice ,
    todo : todoSlice
  }
})