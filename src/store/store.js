import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "../store/slices/competitionsSlice";

export const store = configureStore({
    reducer: {
        competitions: competitionReducer,
    },
});
