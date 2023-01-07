import axios from "axios";
import { DataItem, dnd5eApiUrl, DnDApiResponse } from "../api";

export const getAllClasses = async (): Promise<DataItem[]> => {
  const result: DnDApiResponse = await axios
    .get(`${dnd5eApiUrl}/classes`)
    .then((response) => response.data)
    .catch((error) => console.error(error));

  return result.results;
};
