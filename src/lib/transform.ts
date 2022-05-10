import { dtoPropMetadata } from '../metadata';
import { Constructor, TypeValue } from '../types';

export const transform = <T extends Constructor | Array<Constructor>>(
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
        return raw.map(transform(dtoOrArr[0], defaultValue));
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
    return raw;
  }

  const defaults = new dto.prototype.constructor();

  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(
      ([key, { type, prop, isThis }]) => {
        const defaultValue = defaults[key];
        const value = isThis ? rawObj : rawObj[prop || key];
        let result;
        if (Array.isArray(type)) {
          if (Array.isArray(value)) {
            result = value.map(transform((type as any[])[0]));
          } else {
            result = defaultValue ?? [];
          }
        } else {
          result = toType(value, type, defaultValue);
        }
        return [key, result];
      }
    )
  ) as any;
};

const toNumber = (value: any, defaultValue?: any) => {
  if (typeof value === 'number') {
    return value;
  }

  if (value === undefined) {
    return defaultValue ?? 0;
  }

  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
};

const toBigInt = (value: any, defaultValue?: any) => {
  if (typeof value === 'bigint') {
    return value;
  }

  if (typeof value === 'number') {
    return BigInt(value);
  }

  if (value === undefined) {
    return defaultValue ?? BigInt(0);
  }

  return BigInt(0);
};

const toString = (value: any, defaultValue?: any) => {
  if (typeof value === 'string') {
    return value;
  }

  if (value === undefined) {
    return defaultValue ?? '';
  }

  return String(value);
};

const toBoolean = (value: any, defaultValue?: any) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value === undefined) {
    return defaultValue ?? false;
  }

  return Boolean(value);
};

const toObject = (value: any, defaultValue?: any) => {
  if (typeof value === 'object' && value !== null) {
    return value;
  }
  return defaultValue ?? {};
};

export const toType = (
  value: any,
  type: TypeValue,
  defaultValue?: any
): any => {
  switch (true) {
    case type === Number: {
      return toNumber(value, defaultValue);
    }
    case type === String: {
      return toString(value, defaultValue);
    }
    case type === Boolean: {
      return toBoolean(value, defaultValue);
    }
    case type === BigInt: {
      return toBigInt(value, defaultValue);
    }
    case typeof type === 'function': {
      return toDto(value, type as Constructor, defaultValue);
    }
    case type === null: {
      return defaultValue ?? null;
    }
    case typeof type === 'object': {
      return toObject(value, value);
    }
    default:
      return defaultValue ?? undefined;
  }
};
