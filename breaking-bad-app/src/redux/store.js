import { configureStore } from "@reduxjs/toolkit";

import charactersSlice from "./characterSlice";

export const store = configureStore({
    reducer: {
        characters: charactersSlice
    },
});