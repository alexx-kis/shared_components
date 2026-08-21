import { toCamelCase } from './to-camel-case';

export const convertKeysToCamelCase = (() => {
  type CamelCasedKey<K extends string> = K extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${Capitalize<CamelCasedKey<Rest>>}`
    : K extends `${infer First}-${infer Rest}`
      ? `${Lowercase<First>}${Capitalize<CamelCasedKey<Rest>>}`
      : K;

  type CamelCaseObject<T> =
    T extends Array<infer Item>
      ? Array<CamelCaseObject<Item>>
      : T extends object
        ? {
            [K in keyof T as K extends string ? CamelCasedKey<K> : K]: CamelCaseObject<T[K]>;
          }
        : T;

  const convert = <T>(obj: T) => {
    const inner = (input: unknown): unknown => {
      if (Array.isArray(input)) return input.map(inner);

      if (input === null || typeof input !== 'object') return input;

      return Object.entries(input).reduce<Record<string, unknown>>((acc, [key, value]) => {
        acc[toCamelCase(key)] = inner(value);

        return acc;
      }, {});
    };

    return inner(obj) as CamelCaseObject<T>;
  };

  return convert;
})();
