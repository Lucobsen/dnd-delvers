import { isNotNullOrUndefined } from "../../utils/is-not-null-or-undefined";
import {
  DataItem,
  DnDApiResponse,
  SpellCastingInfoResponse,
  dnd5eApiUrl,
} from "../api";
import { useQuery } from "@tanstack/react-query";

export const useClasses = (): { classes: DataItem[]; isLoading: boolean } => {
  const { data, isLoading } = useQuery<DnDApiResponse>(
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

  if (!data && !isLoading) {
    throw Error("Failed to fetch classes!");
  }

  return { classes: data?.results ?? [], isLoading } as const;
};

export const useClassSavingThrows = (
  classId: string | undefined
): { savingThrows: string[]; isLoading: boolean } => {
  const { data, isLoading } = useQuery<DnDApiResponse>(
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

  if (!data && !isLoading) {
    throw Error("Failed to fetch classes!");
  }

  const results = data?.results ?? [];
  const savingThrows = results
    .filter((result) => result.index.includes("saving-throw"))
    .map((save) => save.index.split("-").pop())
    .filter(isNotNullOrUndefined);

  return { savingThrows, isLoading } as const;
};

export const useClassSpellcastingInfo = (
  classId: string | undefined
): { spellcastingAbility: string | undefined; isLoading: boolean } => {
  const { data, isLoading } = useQuery<SpellCastingInfoResponse>(
    [`${classId}SpellCastingInfo`],
    async () => {
      const parameter = classId ? classId.toLowerCase() : undefined;
      const res = await fetch(
        `${dnd5eApiUrl}/classes/${parameter}/spellcasting`
      );
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  if (!data && !isLoading) {
    throw Error("Failed to fetch spellcasting info!");
  }

  return {
    spellcastingAbility: data?.spellcasting_ability?.index,
    isLoading,
  } as const;
};
