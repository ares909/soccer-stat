import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    teams: [],
    season: [],
    competition: {},
    status: "idle",
    error: null,
};

export const fetchTeams = createAsyncThunk("teams/teamsSlice", async (competitionId) => {
    return api.getTeams(competitionId);
});

export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTeams.pending]: (state) => {
            state.status = "loading";
        },
        [fetchTeams.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.teams = action.payload.teams;
            state.season = action.payload.season;
            state.competition = action.payload.competition;
        },
        [fetchTeams.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default teamsSlice.reducer;
