import { isEmptyObject } from "./isEmptyObject";
import { isEmptyArray } from "./isEmptyArray";
import { isEmptyString } from "./isEmptyString";

export function isEmpty(value: any): boolean {
  return isEmptyObject(value) || isEmptyArray(value) || isEmptyString(value);
}
