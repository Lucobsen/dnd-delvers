import { DataItem } from "../api";

export const challengeRatings = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
];

interface MovementSpeed {
  walk: string;
  fly?: string;
  swim?: string;
}

interface Proficiency {
  value: number;
  proficiency: DataItem;
}

interface Senses {
  blindsight: string;
  darkvision: string;
  passive_perception: number;
}

interface SpecialAbilityUsage {
  type: string;
  times: number;
  rest_types: any[]; // TODO: add type
}

interface SpecialAbility {
  name: string;
  desc: string;
  usage: SpecialAbilityUsage;
}

interface ActionItem {
  action_name: string;
  count: number;
  type: string;
}

interface DamageItem {
  damage_type: DataItem;
  damage_dice: string;
}

interface DiceChallenge {
  dc_type: DataItem;
  dc_value: number;
  success_type: string;
}

interface ActionUsage {
  type: string;
  dice: string;
  min_value: number;
}

interface Action {
  name: string;
  desc: string;
  multiattack_type?: string;
  attack_bonus?: number;
  damage?: DamageItem[];
  actions?: ActionItem[];
  dc?: DiceChallenge;
  usage?: ActionUsage;
}

export interface Monster {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: MovementSpeed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: Proficiency[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: string[];
  senses: Senses;
  languages: string; // TODO: map to an array
  challenge_rating: number;
  xp: number;
  special_abilities: SpecialAbility[];
  actions: Action[];
  legendary_actions: Action[];
  image: string;
  url: string;
}
