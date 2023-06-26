import { Prop } from '../decorators';

export class MongoConnectSimpleDto {
  @Prop('MONGO_HOST')
  readonly host: string;

  @Prop('MONGO_PORT')
  readonly port: boolean;

  @Prop('MONGO_USER')
  readonly user: boolean;

  @Prop('MONGO_PASSWORD')
  readonly password: boolean;

  @Prop('MONGO_DATABASE')
  readonly database: boolean;
}
