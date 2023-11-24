import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getProficiencyBonus } from "../../models/levels.models";

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
  id: string;
  name: string;
  level: string;
  ac: string;
  proficiencyBonus: string;
  hp: {
    current: string;
    max: string;
  };
  stats: Stats;
  classId?: string;
  race?: string;
  feats?: string;
  spells: Spells;
  coin: Coin;
  weapons: Weapon[];
  equipment: string[];
  proficientSkills: string[];
}

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

const defaultWeapons: Weapon[] = [
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

const defaultHero: HeroState = {
  id: crypto.randomUUID(),
  level: "1",
  name: "",
  ac: "10",
  proficiencyBonus: "+2",
  hp: {
    current: "",
    max: "",
  },
  stats: {
    str: "10",
    dex: "10",
    con: "10",
    int: "10",
    wis: "10",
    cha: "10",
  },
  spells: {
    cantrips: [],
    spells: defaultSpells,
  },
  coin: {
    cp: "",
    sp: "",
    gp: "",
    pp: "",
  },
  weapons: defaultWeapons,
  equipment: [],
  proficientSkills: [],
};

const getHero = (): HeroState => {
  const storedValue = localStorage.getItem("hero");
  return storedValue ? JSON.parse(storedValue) : defaultHero;
};

const initialState: HeroState = getHero();

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateArmourClass: (state, action: PayloadAction<string>) => {
      state.ac = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateCurrentHp: (state, action: PayloadAction<string>) => {
      state.hp.current = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateMaxHp: (state, action: PayloadAction<string>) => {
      state.hp.max = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateLevel: (state, action: PayloadAction<string>) => {
      state.level = action.payload;
      state.proficiencyBonus = getProficiencyBonus(action.payload);
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateStats: (state, action: PayloadAction<Stats>) => {
      state.stats = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateProficientSkills: (state, action: PayloadAction<string[]>) => {
      state.proficientSkills = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateClass: (state, action: PayloadAction<string>) => {
      state.classId = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateRace: (state, action: PayloadAction<string>) => {
      state.race = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateFeats: (state, action: PayloadAction<string>) => {
      state.feats = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateWeapons: (state, action: PayloadAction<Weapon[]>) => {
      state.weapons = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateCantrips: (state, action: PayloadAction<string[]>) => {
      state.spells.cantrips = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateCopperPieces: (state, action: PayloadAction<string>) => {
      state.coin.cp = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateSilverPieces: (state, action: PayloadAction<string>) => {
      state.coin.sp = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateGoldPieces: (state, action: PayloadAction<string>) => {
      state.coin.gp = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updatePlatinumPieces: (state, action: PayloadAction<string>) => {
      state.coin.pp = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
    },
    updateEquipment: (state, action: PayloadAction<string[]>) => {
      state.equipment = action.payload;
      localStorage.setItem("hero", JSON.stringify(state));
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

        localStorage.setItem("hero", JSON.stringify(state));
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
        localStorage.setItem("hero", JSON.stringify(state));
      }
    },
  },
});

export const {
  updateArmourClass,
  updateName,
  updateEquipment,
  updateLevel,
  updateStats,
  updateClass,
  updateWeapons,
  updateProficientSkills,
  updateSpells,
  updateRace,
  updateFeats,
  updateCantrips,
  updateSpellSlots,
  updateCopperPieces,
  updateGoldPieces,
  updatePlatinumPieces,
  updateSilverPieces,
  updateMaxHp,
  updateCurrentHp,
} = heroSlice.actions;

export const selectHero = (state: RootState) => state.hero;

export default heroSlice.reducer;
