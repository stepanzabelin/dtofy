import { dtoPropMetadata } from '../metadata';
import { Constructor, TypeValue } from '../types';

export const map = <T extends Constructor | Array<Constructor>>(
  dtoOrArr: T,
  defaultValue?: TypeValue
): ((
  raw: any
) => T extends Array<Constructor>
  ? T[number]['prototype'][]
  : T extends Constructor
  ? T['prototype']
  : any) => {
  return (raw: any) => {
    if (Array.isArray(dtoOrArr)) {
      if (Array.isArray(raw)) {
        return raw.map(map(dtoOrArr[0], defaultValue));
      } else {
        return [];
      }
    } else {
      return toDto(raw, dtoOrArr, defaultValue);
    }
  };
};

const toDto = (raw: any, dto: Constructor, defaultValue: TypeValue) => {
  if (raw === undefined && defaultValue !== undefined) {
    return defaultValue;
  }
  const rawObj = typeof raw === 'object' && raw !== null ? raw : {};

  if (typeof dto !== 'function') {
    return undefined;
  }

  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(
      ([key, { type, prop, isThis }]) => {
        const value = isThis ? rawObj : rawObj[prop || key];
        let result;
        if (Array.isArray(type)) {
          if (Array.isArray(value)) {
            result = value.map(map((type as any[])[0]));
          } else {
            result = defaultValue ?? [];
          }
        } else {
          result = value === undefined ? defaultValue : value;
        }
        return [key, result];
      }
    )
  ) as any;
};
