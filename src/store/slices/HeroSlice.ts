import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";
import {
  getInitialStorageArray,
  getInitialStorageValue,
} from "../../utils/get-initial-storage-value";

const getInitialSpells = (): Spells => {
  return {
    cantrips: getInitialStorageArray("cantrips"),
    spells: getInitialStorageArray("spells"),
  };
};

const getInitialProfBonus = () => {
  const level =
    getInitialStorageValue("level") === ""
      ? "1"
      : getInitialStorageValue("level");

  return getProficiencyBonus(level);
};

const getInitialString = (key: string) => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
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
export type Spells = {
  cantrips: string[];
  spells: string[];
};

interface HeroState {
  level: string;
  proficiencyBonus: string;
  stats: Stats;
  classId?: string;
  race?: string;
  feats?: string;
  spells: Spells;
}

const initialState: HeroState = {
  level:
    getInitialStorageValue("level") === ""
      ? "1"
      : getInitialStorageValue("level"),
  proficiencyBonus: getInitialProfBonus(),
  stats: getInitialStats(),
  feats: getInitialString("feats"),
  classId: getInitialString("class"),
  spells: getInitialSpells(),
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
    updateCantrips: (state, action: PayloadAction<string[]>) => {
      state.spells.cantrips = action.payload;
    },
  },
});

export const {
  updateLevel,
  updateStats,
  updateClass,
  updateRace,
  updateFeats,
  updateCantrips,
} = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
