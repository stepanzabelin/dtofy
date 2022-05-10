import { entityMetadata } from '../metadata';
import { Constructor } from '../types';

export const Entity = function (name?: string) {
  return function (constructor: Constructor) {
    entityMetadata.set(constructor.prototype, name || constructor.name);
  };
};
