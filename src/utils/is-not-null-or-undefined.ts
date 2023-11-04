export const isNotNullOrUndefined = (
  value: string | undefined | null
): value is string => value !== null || value !== undefined;
