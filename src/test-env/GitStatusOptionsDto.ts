import { Prop } from '../decorators';

export class GitStatusOptionsDto {
  readonly branch?: string;

  @Prop('short')
  readonly short?: boolean;

  @Prop('ignore-submodules')
  readonly ignoreSubmodules?: 'none' | 'untracked' | 'dirty' | 'all';
}
