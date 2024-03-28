import { isObject } from "./isObject";

export function isEmptyObject(value: any): boolean {
  return isObject(value) && Object.keys(value).length === 0;
}
