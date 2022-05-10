import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const getDtoProps = (dto: Constructor) => {
  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(([key, { type, prop }]) => {
      return [key, prop ?? key];
    })
  ) as any;
};
