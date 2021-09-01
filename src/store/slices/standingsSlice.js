import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    standings: [],
    competition: {},
    status: "idle",
    error: "",
};

export const getSchedule = createAsyncThunk("standings/standingsSlice", async (competitionId) => {
    return api.getSchedule(competitionId);
});

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
            const filteredStandings = action.payload.standings
                ? action.payload.standings.map((standing) => standing.table)
                : [];
            state.standings = filteredStandings.shift();
            state.competition = action.payload.competition;
            state.error = action.payload.message;
        },
        [getSchedule.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default standingsSlice.reducer;
