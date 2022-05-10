export const METADATA_ENTITY_KEY = Symbol('entity');
import { Constructor } from '../types';

export type EntityMetadataData = {
  name: string;
};

export const entityMetadata = {
  set(target: Constructor['prototype'], name: string) {
    Reflect.defineMetadata(METADATA_ENTITY_KEY, { name }, target);
  },

  get(target: Constructor['prototype']): EntityMetadataData | undefined {
    return Reflect.getMetadata(METADATA_ENTITY_KEY, target);
  },

  has(target: Constructor['prototype']): boolean {
    return Reflect.hasMetadata(METADATA_ENTITY_KEY, target);
  },
};
