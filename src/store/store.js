import { configureStore } from '@reduxjs/toolkit'
import { todosSlice } from './slices/todos';

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    
  },
})