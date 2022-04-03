import Joi from 'joi';
import { Prop, JoiSchema } from '../decorators';

export class GitStatusOptionsDto {
  @JoiSchema(Joi.string().required())
  readonly branch?: string;

  @Prop('short')
  @JoiSchema(Joi.boolean().optional())
  readonly short?: boolean;

  @Prop('ignore-submodules')
  @JoiSchema(Joi.string().valid('none', 'untracked', 'dirty', 'all').required())
  readonly ignoreSubmodules?: 'none' | 'untracked' | 'dirty' | 'all';
}
