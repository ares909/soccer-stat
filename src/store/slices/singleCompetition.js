import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    competition: {},
    status: "idle",
    error: null,
};

export const fetchCompetition = createAsyncThunk("competition/singleCompetitionsSlice", async (competitionId) => {
    return api.getTeams(competitionId);
    // .then((competitions) => {
    //     return competitions;
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
});

export const singleCompetitionsSlice = createSlice({
    name: "competition",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCompetition.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCompetition.fulfilled]: (state, action) => {
            state.status = "succeeded";
            // Here I filter only tier 1 to display due to 154 competitions
            // const filteredCompetitions = action.payload.competitions.filter((competition) => {
            //     return competition.plan === "TIER_ONE" ? competition : "";
            // });

            state.competition = action.payload.competition;
        },
        [fetchCompetition.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

// export const allCompetitions = (state) => state.competitions.competitions;

export default singleCompetitionsSlice.reducer;
