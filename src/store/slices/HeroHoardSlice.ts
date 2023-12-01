import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Hero, SpellInfo, Weapon } from "../../models/hero.models";

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

export const defaultHero: Hero = {
  id: "",
  level: "1",
  race: "Human",
  classId: "Fighter",
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
  cantrips: [],
  spellInfo: defaultSpells,
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

const getInitalState = (): Hero[] => {
  const storedHoard = localStorage.getItem("heroHoard");
  return storedHoard ? JSON.parse(storedHoard) : [];
};

export const heroHoardSlice = createSlice({
  name: "heroHoard",
  initialState: getInitalState(),
  reducers: {
    addHero: (state) => {
      state.push({ ...defaultHero, id: crypto.randomUUID() });
      localStorage.setItem("heroHoard", JSON.stringify(state));
    },
    updateHero: (state, action: PayloadAction<Hero>) => {
      const index = state.findIndex(({ id }) => id === action.payload.id);

      if (index < 0) return;

      state[index] = action.payload;

      localStorage.setItem("heroHoard", JSON.stringify(state));
    },
    deleteHero: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(({ id }) => id === action.payload);

      if (index < 0) return;

      state.splice(index, 1);

      localStorage.setItem("heroHoard", JSON.stringify(state));
    },
  },
});

export const { addHero, updateHero, deleteHero } = heroHoardSlice.actions;

export const selectHeroHoard = (state: RootState) => state.heroHoard;

export default heroHoardSlice.reducer;
