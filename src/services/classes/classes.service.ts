import { isNotNullOrUndefined } from "../../utils/is-not-null-or-undefined";
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

export const useClassSavingThrows = (
  classId: string | undefined
): { savingThrows: string[]; isFetching: boolean } => {
  const { data, isFetching } = useQuery<DnDApiResponse>(
    [`${classId}SavingThrows`],
    async () => {
      const parameter = classId ? classId.toLowerCase() : undefined;
      const res = await fetch(
        `${dnd5eApiUrl}/classes/${parameter}/proficiencies`
      );
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

  const results = data?.results ?? [];
  const savingThrows = results
    .filter((result) => result.index.includes("saving-throw"))
    .map((save) => save.index.split("-").pop())
    .filter(isNotNullOrUndefined);

  return { savingThrows, isFetching } as const;
};
