import Joi from 'joi';
import { Constructor } from '../types';
import { TypeValue } from '../types';

export const METADATA_DTO_PROPERTY_KEY = Symbol('Dto property key');

export type DtoPropMetadataData = {
  prop?: string;
  joiSchema?: Joi.Schema;
  type?: TypeValue;
  isThis?: boolean;
};

export const dtoPropMetadata = {
  merge(
    target: Constructor['prototype'],
    propertyName: string,
    data: DtoPropMetadataData
  ) {
    const map = this.get(target);
    map.set(propertyName, { ...map.get(propertyName), ...data });
    this.set(target, map);
  },

  set(target: Constructor['prototype'], map: Map<string, DtoPropMetadataData>) {
    Reflect.defineMetadata(METADATA_DTO_PROPERTY_KEY, map, target);
  },

  get(target: Constructor['prototype']): Map<string, DtoPropMetadataData> {
    return Reflect.getMetadata(METADATA_DTO_PROPERTY_KEY, target) ?? new Map();
  },

  getData(
    target: Constructor['prototype'],
    propertyName: string
  ): DtoPropMetadataData | undefined {
    const map = this.get(target);
    return map.get(propertyName);
  },

  getValue<P extends keyof DtoPropMetadataData>(
    target: Constructor['prototype'],
    propertyName: string,
    param: P
  ): DtoPropMetadataData[P] | undefined {
    return this.getData(target, propertyName)?.[param];
  },
};
