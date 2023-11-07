import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";
import { getInitialStorageValue } from "../../utils/get-initial-storage-value";

const getInitialFeats = () => {
  const feats = localStorage.getItem("feats");

  return feats ? JSON.parse(feats) : null;
};

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
        cha: "10",
      };
};

export type Stats = Record<string, string>;

interface HeroState {
  level: string;
  proficiencyBonus: string;
  stats: Stats;
  classId?: string;
  race?: string;
  feats?: string;
}

const initialState: HeroState = {
  level:
    getInitialStorageValue("level") === ""
      ? "1"
      : getInitialStorageValue("level"),
  proficiencyBonus: "+2",
  stats: getInitialStats(),
  feats: getInitialFeats(),
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
    updateClass: (state, action: PayloadAction<string>) => {
      state.classId = action.payload;
    },
    updateRace: (state, action: PayloadAction<string>) => {
      state.race = action.payload;
    },
    updateFeats: (state, action: PayloadAction<string>) => {
      state.feats = action.payload;
    },
  },
});

export const {
  updateLevel,
  updateStats,
  updateClass,
  updateRace,
  updateFeats,
} = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
