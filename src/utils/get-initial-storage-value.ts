export const getInitialStorageValue = (key: string): string => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : "";
};

export const getInitialStorageArray = (key: string): string[] => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : [];
};
