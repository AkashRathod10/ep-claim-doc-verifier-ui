import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setClaimResult: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearClaimResult: () => initialState,
  },
});

export const { setClaimResult, clearClaimResult } = claimSlice.actions;
export default claimSlice.reducer;
