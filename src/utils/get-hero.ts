export const getHero = (id: string) => {
  const storedHero = localStorage.getItem(id);

  if (storedHero === null) return;

  return JSON.parse(storedHero);
};
