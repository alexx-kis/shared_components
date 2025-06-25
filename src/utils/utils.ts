// %======================== utils ========================% //

export const splitTextToParagraphs = (text: string) => text.split('\n').filter(Boolean);
export const isEscapeKey = (event: KeyboardEvent) => event.key === 'Escape';

export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

export const toCamelCase = (str: string): string => str.replace(/-./g, x => x[1].toUpperCase());
export const toKebabCase = (str: string): string => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// %------------------------ generate paths for images ------------------------% //
export const generatePaths = (basePath: string, endPaths: string[], extension?: string): Record<string, string> => {
  return endPaths.reduce((acc, endPath) => {
    const formattedPath = extension ? `${endPath}${extension}` : endPath;
    acc[toCamelCase(endPath.replace(/\.[^.]+$/, ''))] = `${basePath}/${formattedPath}`;
    return acc;
  }, {} as Record<string, string>);
};

// %------------------------ adapt values ------------------------% //
export const toVW = (value: number, vp: number) => value / vp * window.innerWidth;
export const vwm = (max: number, min: number, vp: number) => Math.max(toVW(max, vp), min);


// %------------------------ work with arrays ------------------------% //
export const getRandomArrayElements = <T>(array: T[], count: number): T[] => {
  if (count >= array.length) return [...array];

  const selected: T[] = [];
  const indices = new Set<number>();

  while (selected.length < count) {
    const randomIndex = getRandomNumber(0, array.length);
    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      selected.push(array[randomIndex]);
    }
  }

  return selected;
};

export const getItemsByField = <T, K extends keyof T>(
  array: T[],
  field: K,
  values: T[K][]
): T[] => array.filter((item) => values.includes(item[field]));


export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const multiplyArray = <T>(items: T[], amount: number
): T[] => Array.from({ length: amount }, () => [...items]).flat();


// %------------------------ extensions ------------------------% //
export const extractExtension = (source: string) => {
  const match = source.match(/\.[0-9a-z]+$/i);
  return match ? match[0].slice(1) : '';
};

export const removeExtension = (path: string, extension: string): string => {
  const extPattern = new RegExp(`\\.${extension}$`);
  return path.replace(extPattern, '');
};

export const extractNumber = (str: string): number | null => {
  const match = str.match(/[-+]?\d+([.,]\d+)?/);
  return match ? parseFloat(match[0].replace(',', '.')) : null;
};