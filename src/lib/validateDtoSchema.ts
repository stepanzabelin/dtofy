import { Constructor } from '../types';
import { getDtoSchema } from './getDtoSchema';

export const validateDtoSchema = <T extends Constructor<any>>(
  dto: T,
  values: any
): T['prototype'] => {
  const { error, value } = getDtoSchema(dto).validate(values);
  console.log({ error, value });

  if (error) {
    throw error;
  }

  return value;
};
