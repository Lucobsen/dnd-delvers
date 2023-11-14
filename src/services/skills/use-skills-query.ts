import { Skill, abilityScores } from "../../models/abilities.models";
import { DataItem, DnDApiResponse, dnd5eApiUrl } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useSkillsQuery = (): {
  skills: DataItem[];
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery<DnDApiResponse>(
    ["skills"],
    async () => {
      const res = await fetch(`${dnd5eApiUrl}/skills`);
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (!data && !isLoading) {
    throw Error("Failed to fetch skills!");
  }

  return { skills: data?.results ?? [], isLoading } as const;
};

const getSkillStat = (skillId: string) => {
  const scores = Object.values(abilityScores);

  const skillStat = scores.find((score) => score.skills?.includes(skillId));

  return skillStat?.id ?? "";
};

export const useSkills = () => {
  const { skills: skillData, isLoading } = useSkillsQuery();

  const mappedSkills: Skill[] = skillData.map((data) => ({
    name: data.name,
    id: data.index,
    stat: getSkillStat(data.index),
  }));

  return { skills: mappedSkills, isLoading } as const;
};
