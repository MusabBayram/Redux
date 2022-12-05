import { createSlice } from "@reduxjs/toolkit";

export const characterSlice = createSlice({
    name: 'characters',
    initialState: {
        items: [],
    },
    reducers: {},
});

export default characterSlice.reducer;