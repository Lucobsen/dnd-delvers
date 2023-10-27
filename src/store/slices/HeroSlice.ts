import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";

const getInitialStats = () => {
  const stats = localStorage.getItem("stats");

  return stats
    ? JSON.parse(stats)
    : {
        str: "10",
        dex: "10",
        con: "10",
        int: "10",
        wis: "10",
        char: "10",
      };
};

export type Stats = Record<string, string>;

interface HeroState {
  level: string;
  proficiencyBonus: string;
  stats: Stats;
}

const initialState: HeroState = {
  level: "1",
  proficiencyBonus: "+2",
  stats: getInitialStats(),
};

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    updateLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      state.proficiencyBonus = getProficiencyBonus(action.payload);
    },
    updateStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
    },
  },
});

export const { updateLevel, updateStats } = heroSlice.actions;
export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
