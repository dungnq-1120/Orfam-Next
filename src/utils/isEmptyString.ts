export function isEmptyString(value: any): boolean {
  return typeof value === "string" && value.trim().length === 0;
}
