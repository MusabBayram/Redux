import { configureStore } from '@reactjs/toolkit';
import todosSlice from './todos/todosSlice';

export const store = configureStore({
    reducer: {
        todos: todosSlice,
    }
})