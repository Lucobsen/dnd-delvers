import axios from "axios";
import { DataItem, dnd5eApiUrl, DnDApiResponse } from "../api";

export const getAllMonsters = async (): Promise<DataItem[]> => {
  const result: DnDApiResponse = await axios
    .get(`${dnd5eApiUrl}/monsters`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return result.results;
};

export const getMonstersByChallengeRating = async (
  cr: string
): Promise<DataItem[]> => {
  const result: DnDApiResponse = await axios
    .get(`${dnd5eApiUrl}/monsters/?challenge_rating=${cr}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return result.results;
};
