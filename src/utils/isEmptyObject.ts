import { isNil } from "./isNil";

export function isEmptyObject(value: any): boolean {
  return typeof value === "object" && !isNil(value) && Object.keys(value).length === 0;
}
