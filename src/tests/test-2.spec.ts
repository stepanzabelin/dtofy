import Joi from 'joi';
import { getClassSchema, validateDtoSchema } from '../index';
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
    console.log(
      validateDtoSchema(MongoConnectWithJoiDto, {
        MONGO_HOST: 'localhost',
        MONGO_PORT: '3000',
        MONGO_USER: 'user',
        MONGO_PASSWORD: 'pass',
        MONGO_DATABASE: 'db-name',
      })
    );

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
  });
});
