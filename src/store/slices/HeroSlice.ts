import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";
import {
  getInitialStorageArray,
  getInitialStorageValue,
} from "../../utils/get-initial-storage-value";

const getInitialWeapons = () => {
  const defaultState = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
  ];

  const storageState = getInitialStorageArray<Weapon>("weapons");

  return storageState.length === 0 ? defaultState : storageState;
};

const getInitialSpellInfo = () => {
  const defaultSpells: SpellInfo[] = [
    { id: 1, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 2, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 3, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 4, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 5, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 6, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 7, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 8, totalSlots: 0, usedSlots: 0, spells: [] },
    { id: 9, totalSlots: 0, usedSlots: 0, spells: [] },
  ];

  const storageSpellInfo = getInitialStorageArray<SpellInfo>("spells");

  return storageSpellInfo.length === 0 ? defaultSpells : storageSpellInfo;
};

const getInitialSpells = (): Spells => {
  return {
    cantrips: getInitialStorageArray<string>("cantrips"),
    spells: getInitialSpellInfo(),
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

const getInitialCoin = () => {
  const coin = localStorage.getItem("coin");

  return coin
    ? JSON.parse(coin)
    : {
        cp: "",
        sp: "",
        gp: "",
        pp: "",
      };
};

export type Weapon = {
  id: string;
  name?: string;
  attack?: string;
  damage?: string;
  range?: string;
};

type Currency = "cp" | "sp" | "gp" | "pp";
export type Coin = Record<Currency, string>;

export type Stats = Record<string, string>;

export type SpellInfo = {
  id: number;
  totalSlots: number;
  usedSlots: number;
  spells: string[];
};

export type Spells = {
  cantrips: string[];
  spells: SpellInfo[];
};

interface HeroState {
  level: string;
  proficiencyBonus: string;
  stats: Stats;
  classId?: string;
  race?: string;
  feats?: string;
  spells: Spells;
  coin: Coin;
  weapons: Weapon[];
  equipment: string[];
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
  coin: getInitialCoin(),
  weapons: getInitialWeapons(),
  equipment: getInitialStorageArray<string>("equipment"),
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
    updateWeapons: (state, action: PayloadAction<Weapon[]>) => {
      state.weapons = action.payload;
      localStorage.setItem("weapons", JSON.stringify(state.weapons));
    },
    updateCantrips: (state, action: PayloadAction<string[]>) => {
      state.spells.cantrips = action.payload;
      localStorage.setItem("cantrips", JSON.stringify(state.spells.cantrips));
    },
    updateCopperPieces: (state, action: PayloadAction<string>) => {
      state.coin.cp = action.payload;
      localStorage.setItem("coin", JSON.stringify(state.coin));
    },
    updateSilverPieces: (state, action: PayloadAction<string>) => {
      state.coin.sp = action.payload;
      localStorage.setItem("coin", JSON.stringify(state.coin));
    },
    updateGoldPieces: (state, action: PayloadAction<string>) => {
      state.coin.gp = action.payload;
      localStorage.setItem("coin", JSON.stringify(state.coin));
    },
    updatePlatinumPieces: (state, action: PayloadAction<string>) => {
      state.coin.pp = action.payload;
      localStorage.setItem("coin", JSON.stringify(state.coin));
    },
    updateEquipment: (state, action: PayloadAction<string[]>) => {
      state.equipment = action.payload;
      localStorage.setItem("equipment", JSON.stringify(state.equipment));
    },
    updateSpellSlots: (
      state,
      action: PayloadAction<{
        id: number;
        type: "total" | "used";
        slots: number;
      }>
    ) => {
      const spellInfo = state.spells.spells;
      const index = spellInfo.findIndex(
        (info) => info.id === action.payload.id
      );

      if (index >= 0) {
        if (action.payload.type === "total") {
          state.spells.spells[index].totalSlots = action.payload.slots;

          if (action.payload.slots < state.spells.spells[index].usedSlots) {
            state.spells.spells[index].usedSlots = action.payload.slots;
          }
        } else if (action.payload.type === "used") {
          state.spells.spells[index].usedSlots = action.payload.slots;
        }

        localStorage.setItem("spells", JSON.stringify(state.spells.spells));
      }
    },
    updateSpells: (
      state,
      action: PayloadAction<{ id: number; spells: string[] }>
    ) => {
      const spellInfo = state.spells.spells;
      const index = spellInfo.findIndex(
        (info) => info.id === action.payload.id
      );

      if (index >= 0) {
        state.spells.spells[index].spells = action.payload.spells;
        localStorage.setItem("spells", JSON.stringify(state.spells.spells));
      }
    },
  },
});

export const {
  updateEquipment,
  updateLevel,
  updateStats,
  updateClass,
  updateWeapons,
  updateSpells,
  updateRace,
  updateFeats,
  updateCantrips,
  updateSpellSlots,
  updateCopperPieces,
  updateGoldPieces,
  updatePlatinumPieces,
  updateSilverPieces,
} = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
