import Joi from 'joi';
import { Prop, JoiSchema } from '../decorators';

export class MongoConnectWithJoiDto {
  @Prop('MONGO_HOST')
  @JoiSchema(Joi.string().required())
  readonly host: string;

  @Prop('MONGO_PORT')
  @JoiSchema(Joi.number().integer().positive().required())
  readonly port: boolean;

  @Prop('MONGO_USER')
  @JoiSchema(Joi.string().required())
  readonly user: boolean;

  @Prop('MONGO_PASSWORD')
  @JoiSchema(Joi.string().required())
  readonly password: boolean;

  @Prop('MONGO_DATABASE')
  @JoiSchema(Joi.string().required())
  readonly database: boolean;
}
