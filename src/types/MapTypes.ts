import { Constructor } from './Constructor';

export type MapTypes<BaseType> = BaseType extends typeof Number
  ? number
  : BaseType extends typeof String
  ? string
  : BaseType extends typeof Boolean
  ? boolean
  : BaseType extends typeof BigInt
  ? bigint
  : BaseType extends Constructor<infer C>
  ? C
  : BaseType extends null
  ? null
  : BaseType extends undefined
  ? undefined
  : BaseType extends (infer Item)[]
  ? MapTypes<Item>[]
  : BaseType extends Record<string, any>
  ? Record<string, any>
  : any;
