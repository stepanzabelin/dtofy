import { dtoPropMetadata } from '../metadata';
import { Constructor, TypeValue } from '../types';

export const unmap = <T extends Constructor | Array<Constructor>>(
  dtoOrArr: Constructor,
  defaultValue?: any
): ((raw: any) => any) => {
  return (raw: any) => {
    if (Array.isArray(dtoOrArr)) {
      if (Array.isArray(raw)) {
        return raw.map(unmap(dtoOrArr[0], defaultValue));
      } else {
        return [];
      }
    } else {
      return fromDto(raw, dtoOrArr, defaultValue);
    }
  };
};

const fromDto = (raw: any, dto: Constructor, defaultValue: TypeValue) => {
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
        const value = isThis ? rawObj : rawObj[key] ?? rawObj[prop || key];
        let result;
        if (Array.isArray(type)) {
          if (Array.isArray(value)) {
            result = value.map(unmap((type as any[])[0]));
          } else {
            result = defaultValue ?? [];
          }
        } else {
          result = value === undefined ? defaultValue : value;
        }
        return [prop || key, result];
      }
    )
  ) as any;
};
