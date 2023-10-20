import { DataItem, DnDApiResponse, dnd5eApiUrl } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useSkillsQuery = (): {
  skills: DataItem[];
  isFetching: boolean;
} => {
  const { data, isFetching } = useQuery<DnDApiResponse>(
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

  if (!data && !isFetching) {
    throw Error("Failed to fetch skills!");
  }

  return { skills: data?.results ?? [], isFetching } as const;
};
