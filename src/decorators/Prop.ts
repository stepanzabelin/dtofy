import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const Prop = function (prop?: string) {
  return function (target: Constructor['prototype'], propertyName: string) {
    dtoPropMetadata.merge(target, propertyName, {
      prop,
    });
  };
};
