export const levels = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];

export const getProficiencyBonus = (level: string) => {
  switch (level) {
    case "5":
    case "6":
    case "7":
    case "8":
      return "+3";

    case "9":
    case "10":
    case "11":
    case "12":
      return "+4";

    case "13":
    case "14":
    case "15":
    case "16":
      return "+5";

    case "17":
    case "18":
    case "19":
    case "20":
      return "+6";

    default:
      return "+2";
  }
};
