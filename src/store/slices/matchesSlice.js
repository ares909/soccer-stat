import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    matches: [],
    competition: {},
    status: "idle",
    error: "",
};

export const fetchMatches = createAsyncThunk("matches/matchesSlice", ({ competitionId, dateFrom, dateTo }) => {
    return api.getMatches({ competitionId, dateFrom, dateTo });
});

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
            state.matches = action.payload.matches ? action.payload.matches : [];
            state.competition = action.payload.competition;
            state.error = action.payload.message;
        },
        [fetchMatches.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default matchesSlice.reducer;
