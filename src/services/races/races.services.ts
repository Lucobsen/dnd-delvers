import { DataItem, dnd5eApiUrl, DnDApiResponse } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useRaces = (): { races: DataItem[]; isLoading: boolean } => {
  const { data, isLoading } = useQuery<DnDApiResponse>(
    ["races"],
    async () => {
      const res = await fetch(`${dnd5eApiUrl}/races`);
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (!data && !isLoading) {
    throw Error("Failed to fetch races!");
  }

  return { races: data?.results ?? [], isLoading } as const;
};
