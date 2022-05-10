import { entityMetadata } from '../metadata';
import { Constructor } from '../types';

export const getEntityData = <T extends Constructor<any>>(dto: T) => {
  return entityMetadata.get(dto);
};
