import Joi from 'joi';
import { getClassSchema, map, Prop, Type, validateDtoSchema } from '../index';
import 'reflect-metadata';
import { getDtoProps } from '../lib/getDtoProps';
// import { map } from '../lib/map';
import { Deep1 } from '../test-env/Deep1';
import { MongoConnectWithJoiDto } from '../test-env/MongoConnectWithJoiDto';

class OriginalDeckDto {
  @Prop()
  readonly id: number;
}

class TranslationDeckDto {
  @Prop()
  readonly id: number;

  @Prop()
  readonly title!: string;
}

class GetSampleDecksListItemDto {
  @Prop()
  readonly original: OriginalDeckDto;

  @Prop()
  readonly translation: TranslationDeckDto;
}

class GetSampleDecksDataDto {
  @Prop()
  @Type([GetSampleDecksListItemDto])
  readonly list: GetSampleDecksListItemDto[];
}

describe('Args parser2ewrewr22333', () => {
  it('parse commanderer2', () => {
    const result = map(Deep1)({
      guest_id: 3,
      deep_2: {
        user_name: 'John',
      },
    });

    console.log('result', result);

    console.log(
      map(GetSampleDecksDataDto)({
        list: [
          {
            id: 1,
          },
        ],
      })
    );
  });
});
