import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";

interface HeroState {
  level: string;
  proficiencyBonus: string;
}

const initialState: HeroState = {
  level: "1",
  proficiencyBonus: "+2",
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      state.proficiencyBonus = getProficiencyBonus(action.payload);
    },
  },
});

export const { updateLevel } = heroSlice.actions;
export const selectLevel = (state: RootState) => state.hero;

export default heroSlice.reducer;
