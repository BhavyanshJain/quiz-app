import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: "results",
  initialState: {
    score: 0,
  },
  reducers: {
    addResult: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { addResult } = resultsSlice.actions;

export default resultsSlice.reducer;
