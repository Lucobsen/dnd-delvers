import { configureStore } from "@reduxjs/toolkit";
import { heroHoardSlice } from "./slices/HeroHoardSlice";

export const store = configureStore({
  reducer: {
    heroHoard: heroHoardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
