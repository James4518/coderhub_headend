export const getFieldNameFromErrorMessage = (
  fields: string[],
  message: string
): string | null => {
  for (const field of fields) {
    if (message.includes(field)) {
      return field;
    }
  }
  return null;
};
export function formatCount(count: number): string {
  if (count >= 1000) {
    const formattedCount = (count / 1000).toFixed(1);
    return parseFloat(formattedCount).toString() + 'k';
  } else {
    return count.toString();
  }
}
export function groupValuesByKey<T extends Record<string, number>>(
  data: (T | null)[]
): { [K in keyof T]: number[] } {
  const keys = Object.keys(
    data.find((item) => item !== null) ?? {}
  ) as (keyof T)[];
  return keys.reduce(
    (acc, key) => {
      acc[key] = data.map((obj) => (obj ? obj[key] : 0));
      return acc;
    },
    {} as { [K in keyof T]: number[] }
  );
}
