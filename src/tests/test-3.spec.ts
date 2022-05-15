import Joi from 'joi';
import { getClassSchema, map, validateDtoSchema } from '../index';
import 'reflect-metadata';
import { getDtoProps } from '../lib/getDtoProps';
// import { map } from '../lib/map';
import { Deep1 } from '../test-env/Deep1';
import { MongoConnectWithJoiDto } from '../test-env/MongoConnectWithJoiDto';

describe('Args parser2ewrewr22333', () => {
  it('parse commanderer2', () => {
    const result = map(Deep1)({
      guest_id: 3,
      deep_2: {
        user_name: 'John',
      },
    });

    console.log('result', result);
  });
});
