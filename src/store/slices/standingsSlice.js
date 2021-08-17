import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    standings: [],
    status: "idle",
    error: null,
};

export const getSchedule = createAsyncThunk("standings/standingsSlice", async (competitionId) => {
    return api.getSchedule(competitionId);
});

// export const fetchTeams = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
//     return api.getTeams(competitionId);
// });

export const standingsSlice = createSlice({
    name: "standings",
    initialState,
    reducers: {},
    extraReducers: {
        [getSchedule.pending]: (state) => {
            state.status = "loading";
        },
        [getSchedule.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Here I filter only tier 1 to display due to 154 competitions
            // const filteredCompetitions = action.payload.competitions.filter((competition) => {
            //     return competition.plan === "TIER_ONE" ? competition : "";
            // });

            const filteredStandings = action.payload.standings.map((standing) => standing.table);

            state.standings = filteredStandings.shift(); // concat here? need to think how to hoist array from array
        },
        [getSchedule.rejected]: (state, action) => {
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

export default standingsSlice.reducer;
