import { Prop, This, Type } from '../index';
import { MongoConnectOptionsDto } from './MongoConnectOptionsDto';

export class MongoConnectDto {
  @Prop('MONGO_HOST')
  @Type(String)
  readonly host: string = 'default';

  @Prop('MONGO_PORT')
  @Type(Number)
  readonly port: number;

  @Prop('MONGO_USER')
  @Type([String])
  readonly user: string[];

  @Prop('MONGO_PASSWORD')
  @Type(String)
  readonly password: string | null;

  @Prop('MONGO_DATABASE')
  @Type(String)
  readonly database: string;

  @This()
  @Type(MongoConnectOptionsDto)
  readonly options: MongoConnectOptionsDto;
}
