import { isEmptyObject } from "./isEmptyObject";
import { isEmptyArray } from "./isEmptyArray";
import { isEmptyString } from "./isEmptyString";
import { isNil } from "./isNil";

export function isEmpty(value: any): boolean {
  return isEmptyArray(value) || isEmptyObject(value) || isNil(value) || isEmptyString(value);
}
