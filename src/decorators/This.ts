import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const This = function () {
  return function (target: Constructor['prototype'], propertyName: string) {
    dtoPropMetadata.merge(target, propertyName, {
      isThis: true,
    });
  };
};
