import Joi from 'joi';
import { getClassSchema, map, validateDtoSchema } from '../index';
// import { getDtoProps } from '../lib/getDtoProps';
import { unmap } from '../lib/unmap';
import { MongoConnectWithJoiDto } from '../test-env/MongoConnectWithJoiDto';

const isJoiError = (result: Joi.ValidationResult<any>) =>
  result.error instanceof Joi.ValidationError;

describe('Args parser222', () => {
  it('parse command', () => {
    expect(
      isJoiError(
        getClassSchema(MongoConnectWithJoiDto).validate({
          branch: 'master',
          'ignore-submodules': 'unknown',
        })
      )
    ).toEqual(true);
  });

  it('parse command2', () => {
    const tt = validateDtoSchema(MongoConnectWithJoiDto, {
      MONGO_HOST: 'localhost',
      MONGO_PORT: '3000',
      MONGO_USER: 'user',
      MONGO_PASSWORD: 'pass',
      MONGO_DATABASE: 'db-name',
    });

    // const tt2 = map(MongoConnectWithJoiDto)({
    //   MONGO_HOST: 'localhost',
    //   MONGO_PORT: '3000',
    //   MONGO_USER: 'user',
    //   MONGO_PASSWORD: 'pass',
    //   MONGO_DATABASE: 'db-name',
    // });

    console.log('???', tt);

    expect(
      validateDtoSchema(MongoConnectWithJoiDto, {
        MONGO_HOST: 'localhost',
        MONGO_PORT: '3000',
        MONGO_USER: 'user',
        MONGO_PASSWORD: 'pass',
        MONGO_DATABASE: 'db-name',
      })
    ).toEqual({
      host: 'localhost',
      port: 3000,
      user: 'user',
      password: 'pass',
      database: 'db-name',
    });

    console.log(
      'unmap',
      unmap(MongoConnectWithJoiDto)({
        host: 'localhost',
        port: 3000,
        user: 'user',
        password: 'pass',
        database: 'db-name',
      })
    );

    // console.log('unmap', getDtoProps(MongoConnectWithJoiDto));
  });
});
