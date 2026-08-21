import { shuffleArray } from './shuffle-array';

export const getRandomArrayElements = <T>(array: T[], count: number) => {
  if (count >= array.length) return [...array];
  if (count <= 0) return [];

  return shuffleArray(array).slice(0, count);
};
