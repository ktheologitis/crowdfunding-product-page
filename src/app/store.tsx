import { configureStore } from "@reduxjs/toolkit";
import { fundingDataSliceReducer } from "../features/fundingData/fundingDataSlice";

export const store = configureStore({
  reducer: {
    fundingData: fundingDataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
