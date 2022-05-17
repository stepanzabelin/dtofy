import { dtoPropMetadata, PropMetadata } from '../metadata';
import { Constructor } from '../types';

export const getPropsMetadata = (
  dto: Constructor
): (PropMetadata & { key: string })[] => {
  return Array.from(dtoPropMetadata.get(dto.prototype), ([key, props]) => ({
    key,
    ...props,
  }));
};

export const mapPropsKeys = (dto: Constructor): Record<string, any> => {
  return Object.fromEntries(
    [...dtoPropMetadata.get(dto.prototype)].map(([key, { prop }]) => {
      return [key, prop ?? key];
    })
  );
};
