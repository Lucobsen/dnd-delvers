import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HeroState {
  level: string;
}

const initialState: HeroState = {
  level: "1",
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
    },
  },
});

export const { updateLevel } = heroSlice.actions;
export const selectLevel = (state: RootState) => state.hero;

export default heroSlice.reducer;
