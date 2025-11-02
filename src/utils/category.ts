const DEFAULT_CATEGORY = "Uncategorized";

export const ensureCategories = (values: string[]) =>
  values.length > 0 ? values : [DEFAULT_CATEGORY];

export const slugifyCategory = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

export { DEFAULT_CATEGORY };
