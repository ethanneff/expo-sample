export const Typescript = {
  assertNever: (value: never) => {
    throw new Error(`Unexpected value: ${value}`);
  },
  typedKeys: <T extends Record<string, unknown>>(obj: T) => {
    return Object.keys(obj) as (keyof T)[];
  },
  typedValues: <T extends Record<string, unknown>>(obj: T) => {
    return Object.values(obj) as T[keyof T][];
  },
  typedEntries: <T extends Record<string, unknown>>(obj: T) => {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
  },
};
