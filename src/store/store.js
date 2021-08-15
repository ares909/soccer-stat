import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "./slices/competitionsSlice";
import singleCompetitionReducer from "./slices/singleCompetition";

const store = configureStore({
    reducer: {
        competitions: competitionReducer,
        competition: singleCompetitionReducer,
    },
});

export default store;
