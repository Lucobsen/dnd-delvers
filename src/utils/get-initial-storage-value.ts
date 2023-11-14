export const getInitialStorageValue = (key: string): string => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
};

export const getInitialStorageArray = <T>(key: string): T[] => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
};
