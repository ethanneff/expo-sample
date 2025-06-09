export const Typescript = {
  assertNever: (value: never) => {
    throw new Error(`Unexpected value: ${value}`);
  },
  typedEntries: <T extends Record<string, unknown>>(object: T) => {
    return Object.entries(object) as [keyof T, T[keyof T]][];
  },
  typedKeys: <T extends Record<string, unknown>>(object: T) => {
    return Object.keys(object) as (keyof T)[];
  },
  typedValues: <T extends Record<string, unknown>>(object: T) => {
    return Object.values(object) as T[keyof T][];
  },
};
