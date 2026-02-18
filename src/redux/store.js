import { configureStore } from "@reduxjs/toolkit";
import claimReducer from "./slices/claimSlice";

export const store = configureStore({
  reducer: {
    claim: claimReducer,
  },
});