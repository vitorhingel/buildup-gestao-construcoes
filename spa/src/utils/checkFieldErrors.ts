export interface FieldErrors {
  field: string;
  index?: number | null;
  message: string;
}

export const checkFieldErrors = (errors: FieldErrors[], field: string, index: number | null = null) => {
  let error = undefined;
  if (index !== null) error = errors.find((error) => error.field === field && error.index === index);
  else error = errors.find((error) => error.field === field);

  return error?.message || "";
};
