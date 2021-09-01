import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const compAdapter = createEntityAdapter();

const initialState = compAdapter.getInitialState({
    competitions: [],
    status: "idle",
    error: "",
});

export const fetchCompetitions = createAsyncThunk("competitions/fetchCompetitions", () => {
    return api.getCompetitions();
});

export const competitionsSlice = createSlice({
    name: "competitions",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCompetitions.pending]: (state) => {
            state.status = "loading";
        },
        [fetchCompetitions.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.competitions = action.payload.competitions ? action.payload.competitions : [];
            state.error = action.payload.message;
        },
        [fetchCompetitions.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default competitionsSlice.reducer;
