import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const getPropsMap = (dto: Constructor): Record<string, string> => {
  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(([key, { prop }]) => {
      return [key, prop ?? key];
    })
  );
};
