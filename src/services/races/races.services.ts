import { DataItem, dnd5eApiUrl, DnDApiResponse } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useRaces = (): { races: DataItem[], isFetching: boolean } => {
  const { data, isFetching } = useQuery<DnDApiResponse>(['races'], async () => {
    const res = await fetch(`${dnd5eApiUrl}/races`);
    return res.json();
  });

  if (!data && !isFetching) {
    throw Error('Failed to fetch races!');
  }

  return { races: data?.results ?? [], isFetching } as const;
};
