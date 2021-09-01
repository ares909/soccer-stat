import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    calendar: [],
    status: "idle",
    error: "",
};

export const fetchSingleTeam = createAsyncThunk("team/singleTeamSlice", async ({ teamId, dateFrom, dateTo, limit }) => {
    return api.getTeamMatches({ teamId, dateFrom, dateTo, limit });
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
            state.calendar = action.payload.matches ? action.payload.matches : [];
            state.error = action.payload.message;
        },
        [fetchSingleTeam.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default singleTeamSlice.reducer;
