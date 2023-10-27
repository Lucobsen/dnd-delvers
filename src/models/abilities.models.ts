export type Skill = {
  id: string;
  name: string;
  stat: string;
};

type AbilityScore = {
  id: string;
  name: string;
  skills?: string[];
};

export const abilityScores: AbilityScore[] = [
  {
    id: "str",
    name: "Strength",
    skills: ["athletics"],
  },
  {
    id: "dex",
    name: "Dexterity",
    skills: ["acrobatics", "sleight-of-hand", "stealth"],
  },
  {
    id: "con",
    name: "Constitution",
  },
  {
    id: "int",
    name: "Intelligence",
    skills: ["arcana", "history", "investigation", "nature", "religion"],
  },
  {
    id: "wis",
    name: "Wisdom",
    skills: [
      "animal-handling",
      "insight",
      "medicine",
      "perception",
      "survival",
    ],
  },
  {
    id: "char",
    name: "Charisma",
    skills: ["deception", "intimidation", "performance", "persuasion"],
  },
];

export const getModifier = (value: number) => {
  const isValueValid = !Number.isNaN(value);

  if (!isValueValid) return 0;

  return value >= 10
    ? Math.floor((value - 10) / 2)
    : Math.ceil((value - 10) / 2);
};
