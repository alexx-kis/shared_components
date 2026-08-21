export const extractExtension = (source: string) => {
  const match = source.match(/\.([0-9a-z]+)$/i);

  return match?.[1] ?? '';
};
