import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "./slices/competitionsSlice";

const store = configureStore({
    reducer: {
        competitions: competitionReducer,
    },
});

export default store;
