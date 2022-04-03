import Joi from 'joi';
import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const JoiSchema = function (joiSchema: Joi.Schema) {
  return function (target: Constructor['prototype'], propertyName: string) {
    dtoPropMetadata.merge(target, propertyName, {
      joiSchema,
    });
  };
};
