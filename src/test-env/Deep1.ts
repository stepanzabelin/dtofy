import { Prop, Type } from '../decorators';
import { Deep2 } from './Deep2';

export class Deep1 {
  @Prop('deep_2')
  @Type(Deep2)
  readonly deep2: Deep2;

  @Prop('guest_id')
  readonly guestId: number;

  @Prop('guest_name')
  readonly guestName: string;

  @Prop('guest_email')
  @Type(String, null)
  readonly guestEmail: string;
}
