import { Constructor } from '../types';
import { TypeValue } from '../types';

export const METADATA_DTO_PROPERTY_KEY = Symbol('Dto property key');

export type PropMetadata = {
  prop?: string;
  type?: TypeValue;
  isThis?: boolean;
  defaultValue?: any;
};

export const dtoPropMetadata = {
  merge(
    target: Constructor['prototype'],
    propertyName: string,
    data: PropMetadata
  ) {
    const map = this.get(target);
    map.set(propertyName, { ...map.get(propertyName), ...data });
    this.set(target, map);
  },

  set(target: Constructor['prototype'], map: Map<string, PropMetadata>) {
    Reflect.defineMetadata(METADATA_DTO_PROPERTY_KEY, map, target);
  },

  get(target: Constructor['prototype']): Map<string, PropMetadata> {
    return Reflect.getMetadata(METADATA_DTO_PROPERTY_KEY, target) ?? new Map();
  },

  getData(
    target: Constructor['prototype'],
    propertyName: string
  ): PropMetadata | undefined {
    const map = this.get(target);
    return map.get(propertyName);
  },

  getValue<P extends keyof PropMetadata>(
    target: Constructor['prototype'],
    propertyName: string,
    param: P
  ): PropMetadata[P] | undefined {
    return this.getData(target, propertyName)?.[param];
  },
};
