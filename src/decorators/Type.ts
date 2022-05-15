import { dtoPropMetadata } from '../metadata';
import {
  TypeValue,
  Constructor,
  MapTypes,
  TypedPropertyDecorator,
} from '../types';

export const Type = function <
  BaseType extends TypeValue,
  DefaultType extends MapTypes<TypeValue>
>(type: BaseType, defaultValue?: DefaultType) {
  const fn = function (target: Constructor['prototype'], propertyName: string) {
    dtoPropMetadata.merge(target, propertyName, {
      type,
      defaultValue,
    });
  };

  return fn as TypedPropertyDecorator<MapTypes<BaseType>>;
};
