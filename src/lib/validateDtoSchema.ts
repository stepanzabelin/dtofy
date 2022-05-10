import { ValidationOptions } from 'joi';
import { Constructor } from '../types';
import { getDtoSchema } from './getDtoSchema';
import { map } from './map';

export const validateDtoSchema = <T extends Constructor<any>>(
  dto: T,
  values: any,
  options?: ValidationOptions
): T['prototype'] => {
  const { error, value } = getDtoSchema(dto).validate(values, options);
  // console.log({ error, value });

  if (error) {
    throw error;
  }

  // console.log('map(dto)(value)', map(dto)(value));

  return map(dto)(value);
};
