import Joi from 'joi';
import { dtoPropMetadata } from '../metadata';
import { Constructor } from '../types';

export const getClassSchema = <T extends Constructor<any>>(
  dto: T
): Joi.Schema => {
  const keys: Record<string, any> = {};

  const map = dtoPropMetadata.get(dto.prototype);

  for (const [propertyName, params] of map) {
    const property = params.prop ?? propertyName;
    keys[property] = params.joiSchema ?? Joi.any();
  }

  return Joi.object().keys(keys);
};
