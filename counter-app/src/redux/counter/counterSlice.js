import { createSlice } from "@reduxjs/toolkit"; 

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        deccrement: (state) => {
            state.value -= 1;
        }
    },
});;

export const { increment, deccrement } = counterSlice.actions;
export default counterSlice.reducer;