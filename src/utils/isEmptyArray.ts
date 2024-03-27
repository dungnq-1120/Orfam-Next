import { isNil } from "./isNil";

export function isEmptyArray(value: any): boolean {
  return Array.isArray(value) && !isNil(value) && value.length === 0;
}
