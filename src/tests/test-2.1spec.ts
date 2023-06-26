import { map } from '../index';

// import { getDtoProps } from '../lib/getDtoProps';
// import { unmap } from '../lib/unmap';
import { MongoConnectSimpleDto } from '../test-env/MongoConnectSimpleDto';

// const isJoiError = (result: Joi.ValidationResult<any>) =>
//   result.error instanceof Joi.ValidationError;

describe('Args parser222', () => {
  // it('parse command', () => {
  //   expect(
  //     isJoiError(
  //       getClassSchema(MongoConnectSimpleDto).validate({
  //         branch: 'master',
  //         'ignore-submodules': 'unknown',
  //       })
  //     )
  //   ).toEqual(true);
  // });

  it('parse command2', () => {
    // const tt = validateDtoSchema(MongoConnectSimpleDto, {
    //   MONGO_HOST: 'localhost',
    //   MONGO_PORT: '3000',
    //   MONGO_USER: 'user',
    //   MONGO_PASSWORD: 'pass',
    //   MONGO_DATABASE: 'db-name',
    // });
    // const tt2 = map(MongoConnectSimpleDto)({
    //   MONGO_HOST: 'localhost',
    //   MONGO_PORT: '3000',
    //   MONGO_USER: 'user',
    //   MONGO_PASSWORD: 'pass',
    //   MONGO_DATABASE: 'db-name',
    // });
    // console.log('???', tt);
    // expect(
    //   validateDtoSchema(MongoConnectSimpleDto, {
    //     MONGO_HOST: 'localhost',
    //     MONGO_PORT: '3000',
    //     MONGO_USER: 'user',
    //     MONGO_PASSWORD: 'pass',
    //     MONGO_DATABASE: 'db-name',
    //   })
    // ).toEqual({
    //   host: 'localhost',
    //   port: 3000,
    //   user: 'user',
    //   password: 'pass',
    //   database: 'db-name',
    // });
    // console.log(
    //   'unmap',
    //   unmap(MongoConnectSimpleDto)({
    //     host: 'localhost',
    //     port: 3000,
    //     user: 'user',
    //     password: 'pass',
    //     database: 'db-name',
    //   })
    // );
    // console.log('unmap', getDtoProps(MongoConnectSimpleDto));
  });
});
