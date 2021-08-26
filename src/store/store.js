import { configureStore } from "@reduxjs/toolkit";
import competitionReducer from "./slices/competitionsSlice";
import singleCompetitionReducer from "./slices/singleCompetitionSlice";
import teamsReducer from "./slices/teamsSlice";
import standingsReducer from "./slices/standingsSlice";
import matchesReducer from "./slices/matchesSlice";
import singleTeamReducer from "./slices/singleTeamSlice";

const store = configureStore({
    reducer: {
        competitions: competitionReducer,
        competition: singleCompetitionReducer,
        teams: teamsReducer,
        standings: standingsReducer,
        matches: matchesReducer,
        team: singleTeamReducer,
    },
});

export default store;
