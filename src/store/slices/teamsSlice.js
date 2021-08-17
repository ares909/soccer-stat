import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    teams: [],
    season: [],
    status: "idle",
    error: null,
};

export const fetchTeams = createAsyncThunk("teams/teamsSlice", async (competitionId) => {
    return api.getTeams(competitionId);
});

// export const fetchTeams = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
//     return api.getTeams(competitionId);
// });

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
            // Here I filter only tier 1 to display due to 154 competitions
            // const filteredCompetitions = action.payload.competitions.filter((competition) => {
            //     return competition.plan === "TIER_ONE" ? competition : "";
            // });

            state.teams = action.payload.teams;
            state.season = action.payload.season;
        },
        [fetchTeams.rejected]: (state, action) => {
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

export default teamsSlice.reducer;
