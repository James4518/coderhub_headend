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
