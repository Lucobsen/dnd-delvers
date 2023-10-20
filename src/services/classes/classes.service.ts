import { DataItem, DnDApiResponse, dnd5eApiUrl } from "../api";
import { useQuery } from "@tanstack/react-query";

export const useClasses = (): { classes: DataItem[]; isFetching: boolean } => {
  const { data, isFetching } = useQuery<DnDApiResponse>(
    ["classes"],
    async () => {
      const res = await fetch(`${dnd5eApiUrl}/classes`);
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (!data && !isFetching) {
    throw Error("Failed to fetch classes!");
  }

  return { classes: data?.results ?? [], isFetching } as const;
};
