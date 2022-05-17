import { Constructor, TypeValue } from '../types';
import { dtoPropMetadata } from '../metadata';

export const toDto = (raw: any, dto: Constructor, defaultValue?: TypeValue) => {
  if (raw === undefined && defaultValue !== undefined) {
    return defaultValue;
  }

  const rawObj = typeof raw === 'object' && raw !== null ? raw : {};

  if (typeof dto !== 'function') {
    return undefined;
  }

  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(
      ([key, { type, prop, defaultValue, isThis }]) => {
        const value = isThis ? rawObj : rawObj[prop || key];
        let result;

        if (Array.isArray(type)) {
          if (Array.isArray(value)) {
            result = value.map((subValue: any) => toType(subValue, type[0]));
          } else {
            result = [];
          }
        } else if (type !== undefined) {
          result = toType(value, type, defaultValue);
        } else {
          result = value;
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
    return defaultValue === undefined ? 0 : defaultValue;
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
    return defaultValue === undefined ? BigInt(0) : defaultValue;
  }

  return BigInt(0);
};

const toString = (value: any, defaultValue?: any) => {
  if (typeof value === 'string') {
    return value;
  }

  if (value === undefined) {
    return defaultValue === undefined ? '' : defaultValue;
  }

  return String(value);
};

const toBoolean = (value: any, defaultValue?: any) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (value === undefined) {
    return defaultValue === undefined ? false : defaultValue;
  }

  return Boolean(value);
};

const toObject = (value: any, defaultValue?: any) => {
  if (typeof value === 'object' && value !== null) {
    return value;
  }
  return defaultValue === undefined ? {} : defaultValue;
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
