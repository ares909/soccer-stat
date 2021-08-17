import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    matches: [],
    status: "idle",
    error: null,
};

export const fetchMatches = createAsyncThunk("matches/matchesSlice", async (competitionId) => {
    return api.getMatches(competitionId);
});

// export const fetchTeams = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
//     return api.getTeams(competitionId);
// });

export const matchesSlice = createSlice({
    name: "matches",
    initialState,
    reducers: {},
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

export default matchesSlice.reducer;
