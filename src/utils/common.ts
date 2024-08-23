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
