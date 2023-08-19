import { useQuery } from "@tanstack/react-query";
import { DataItem, dnd5eApiUrl } from "../api";

export const useMonsters = (): { monsters: DataItem[] } => {
  const { data } = useQuery<DataItem[]>(['monsters'], async () => {
    const res = await fetch(`${dnd5eApiUrl}/monsters`);
    return res.json();
  });

  if (!data) {
    throw Error('Failed to fetch monsters!');
  }

  return { monsters: data } as const;
};
