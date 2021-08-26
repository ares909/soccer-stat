import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    calendar: [],
    status: "idle",
    error: null,
};

export const fetchSingleTeam = createAsyncThunk("team/singleTeamSlice", async ({ teamId, dateFrom, dateTo }) => {
    return api.getTeamMatches({ teamId, dateFrom, dateTo });
});

export const singleTeamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchSingleTeam.pending]: (state) => {
            state.status = "loading";
        },
        [fetchSingleTeam.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.calendar = action.payload.matches;
        },
        [fetchSingleTeam.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default singleTeamSlice.reducer;
