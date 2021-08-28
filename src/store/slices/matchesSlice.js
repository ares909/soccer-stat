import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    matches: [],
    competition: {},
    status: "idle",
    error: null,
};

export const fetchMatches = createAsyncThunk("matches/matchesSlice", ({ competitionId, dateFrom, dateTo }) => {
    return api.getMatches({ competitionId, dateFrom, dateTo });
});

// export const fetchTeams = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
//     return api.getTeams(competitionId);
// });

export const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {
        applyFilter: (state) => {
            state.status = "filtered";
        },
    },
    extraReducers: {
        [fetchMatches.pending]: (state) => {
            state.status = "loading";
        },
        [fetchMatches.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Here I filter only tier 1 to display due to 154 competitions
            // const filteredCompetitions = action.payload.competitions.filter((competition) => {
            //     return competition.plan === "TIER_ONE" ? competition : "";
            // });

            state.matches = action.payload.matches;
            state.competition = action.payload.competition;
        },
        [fetchMatches.rejected]: (state, action) => {
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

export const { applyFilter } = matchesSlice.actions;

export default matchesSlice.reducer;
