export const getItemsByField = <T, K extends keyof T>(array: T[], field: K, values: T[K][]) =>
  array.filter((item) => values.includes(item[field]));
