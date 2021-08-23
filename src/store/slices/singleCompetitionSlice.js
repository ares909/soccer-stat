import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    competition: {},
    status: "idle",
    error: null,
    teams: [],
};

export const fetchCompetition = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
    return api.getCompetition(competitionId);
});

// export const fetchTeams = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
//     return api.getTeams(competitionId);
// });

export const singleCompetitionsSlice = createSlice({
    name: "competition",
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = initialState.status;
            state.competition = initialState.competition;
        },
    },
    extraReducers: {
        [fetchCompetition.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCompetition.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.competition = action.payload;
            // state.teams = action.payload.teams;
            // state.season = action.payload.teams;
        },
        [fetchCompetition.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        // [fetchTeams.pending]: (state) => {
        //     state.status = "loading";
        // },
        // [fetchTeams.fulfilled]: (state, action) => {
        //     state.status = "succeeded";
        //     // Here I filter only tier 1 to display due to 154 competitions
        //     // const filteredCompetitions = action.payload.competitions.filter((competition) => {
        //     //     return competition.plan === "TIER_ONE" ? competition : "";
        //     // });

        //     // state.competition = action.payload;
        //     state.teams = action.payload.teams;
        //     // state.season = action.payload.season;
        // },
        // [fetchTeams.rejected]: (state, action) => {
        //     state.status = "failed";
        //     state.error = action.error.message;
        // },
    },
});

// export const allCompetitions = (state) => state.competitions.competitions;

export const { clearStatus } = singleCompetitionsSlice.actions;

export default singleCompetitionsSlice.reducer;
