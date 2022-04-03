import { Constructor } from './Constructor';
import { SimpleTypeValue } from './SimpleTypeValue';

export type TypeValue =
  | SimpleTypeValue
  | SimpleTypeValue[]
  | Constructor
  | Constructor[]
  | Record<string, any>
  | Record<string, any>[];
