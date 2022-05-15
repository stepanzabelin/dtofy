import { Constructor, TypeValue } from '../types';
import { toDto } from './toType';

export const map = <T extends Constructor | Array<Constructor>>(
  dtoOrArr: T
): ((
  raw: any,
  defaultValue?: TypeValue
) => T extends Array<Constructor>
  ? T[number]['prototype'][]
  : T extends Constructor
  ? T['prototype']
  : any) => {
  return (raw: any, defaultValue?: TypeValue) => {
    if (Array.isArray(dtoOrArr)) {
      if (Array.isArray(raw)) {
        return raw.map((value) => map(dtoOrArr[0])(value, defaultValue));
      } else {
        return [];
      }
    } else {
      return toDto(raw, dtoOrArr, defaultValue);
    }
  };
};
