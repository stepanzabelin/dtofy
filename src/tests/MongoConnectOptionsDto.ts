import { Prop, Type } from '../index';

export class MongoConnectOptionsDto {
  @Prop('MONGO_SSL')
  @Type(Boolean)
  readonly ssl: boolean = false;
}
