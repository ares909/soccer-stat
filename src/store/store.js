import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "./slices/competitionsSlice";
import teamsReducer from "./slices/teamsSlice";
import standingsReducer from "./slices/standingsSlice";
import matchesReducer from "./slices/matchesSlice";
import singleTeamReducer from "./slices/singleTeamSlice";

const store = configureStore({
    reducer: {
        competitions: competitionReducer,
        teams: teamsReducer,
        standings: standingsReducer,
        matches: matchesReducer,
        team: singleTeamReducer,
    },
});

export default store;
