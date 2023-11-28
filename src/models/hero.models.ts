export type SpellInfo = {
  id: number;
  totalSlots: number;
  usedSlots: number;
  spells: string[];
};

export type Spells = {
  cantrips: string[];
  spellList: SpellInfo[];
};

export type Stats = Record<string, string>;

type Currency = "cp" | "sp" | "gp" | "pp";
export type Coin = Record<Currency, string>;

export type Weapon = {
  id: string;
  name?: string;
  attack?: string;
  damage?: string;
  range?: string;
};

export interface Hero {
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
