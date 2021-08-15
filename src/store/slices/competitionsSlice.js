import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

const initialState = {
    competitions: [],
    status: "idle",
    error: null,
};

export const fetchCompetitions = createAsyncThunk("competitions/fetchCompetitions", async () => {
    return api.getCompetitions();
    // .then((competitions) => {
    //     return competitions;
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
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
            // Here I filter only tier 1 to display due to 154 competitions
            const filteredCompetitions = action.payload.competitions.filter((competition) => {
                return competition.plan === "TIER_ONE" ? competition : "";
            });

            state.competitions = filteredCompetitions;
        },
        [fetchCompetitions.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

// export const allCompetitions = (state) => state.competitions.competitions;

export default competitionsSlice.reducer;