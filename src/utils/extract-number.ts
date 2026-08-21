export const extractNumber = (str: string) => {
  const match = str.match(/[-+]?\d+(?:[.,]\d+)?/);

  if (!match) return null;

  return Number.parseFloat(match[0].replace(',', '.'));
};
