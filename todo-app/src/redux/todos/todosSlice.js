import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios('http://localhost:7000/todos');
    return res.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodosAsync', async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`, data);
    return res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id, data}) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`, data);
    return res.data;
});

export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`);
    return res.data;
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodoIsLoading: false,
        addNewTodoError: null
    },
    reducers: {
        // toggle: (state, action)  => {
        //     const { id } = action.payload;

        //     const item = state.items.find((item) => item.id === id);
        //     item.completed = !item.completed;
        // },
        // destroy: (state, action) => {
        //     const id  = action.payload;
        //     const filtered = state.items.filter((item) => item.id !== id);
        //     state.items = filtered;
        // },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.completed === false);
            state.items = filtered;
        }
    },
    extraReducers: {
        //get todos
        [getTodosAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodosAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodosAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        //add todo
        [addTodoAsync.pending]: (state, action) => {
            state.addNewTodoIsLoading = true;
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
            state.addNewTodoIsLoading = false;
        },
        [addTodoAsync.rejected]: (state, action) => {
            state.addNewTodoIsLoading = false;
            state.addNewTodoError = action.error.message;
        },
        // toggle todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const { id, completed } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].completed = completed;
        },
        // remove todo
        [removeTodoAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
        },
    }
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) =>{
	if(state.todos.activeFilter === 'all'){
		return state.todos.items
	}

    return state.todos.items.filter((todo) => 
        state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true
    )
}

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;