import { toSnakeCase } from './to-snake-case';

export const convertKeysToSnakeCase = (() => {
  type SnakeCasedKey<K extends string> = K extends `${infer First}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
      ? `${Lowercase<First>}${SnakeCasedKey<Rest>}`
      : `${Lowercase<First>}_${SnakeCasedKey<Rest>}`
    : K;

  type SnakeCaseObject<T> =
    T extends Array<infer Item>
      ? Array<SnakeCaseObject<Item>>
      : T extends object
        ? {
            [K in keyof T as K extends string ? SnakeCasedKey<K> : K]: SnakeCaseObject<T[K]>;
          }
        : T;

  const convert = <T>(obj: T) => {
    const inner = (input: unknown): unknown => {
      if (Array.isArray(input)) return input.map(inner);

      if (input === null || typeof input !== 'object') return input;

      return Object.entries(input).reduce<Record<string, unknown>>((acc, [key, value]) => {
        acc[toSnakeCase(key)] = inner(value);

        return acc;
      }, {});
    };

    return inner(obj) as SnakeCaseObject<T>;
  };

  return convert;
})();
