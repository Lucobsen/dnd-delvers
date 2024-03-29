export interface DnDApiResponse {
  count: number;
  results: DataItem[];
}

export interface DataItem {
  index: string;
  name: string;
  url: string;
}

export interface SpellCastingInfoResponse {
  spellcasting_ability: DataItem;
}

export const dnd5eApiUrl = "https://www.dnd5eapi.co/api";
