import { map, Prop, Type } from '../index';
import 'reflect-metadata';
import { getPropsMetadata } from '../lib/getPropsMetadata';
// import { map } from '../lib/map';
import { Deep1 } from '../test-env/Deep1';
import { MongoConnectSimpleDto } from '../test-env/MongoConnectSimpleDto';
import { inspect } from 'util';
import { This } from '../decorators';
class OriginalDeckDto {
  @Prop()
  @Type(Number)
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
  // @Type(OriginalDeckDto)
  readonly original: OriginalDeckDto;

  @Prop()
  // @This()
  @Type(TranslationDeckDto)
  readonly translation: TranslationDeckDto;
}

class GetSampleDecksDataDto {
  @Prop()
  @Type([GetSampleDecksListItemDto])
  readonly list: GetSampleDecksListItemDto[];
}

describe('Args parser2ewrewr22333', () => {
  it('parse commanderer2', () => {
    // console.log(getPropsMetadata(Deep1));

    // const result = map(Deep1)({
    //   guest_id: 3,
    //   deep_2: {
    //     user_name: 'John',
    //   },
    // });

    // console.log('result', result);

    console.log(
      inspect(
        map(GetSampleDecksDataDto)({
          list: [
            {
              original: {
                id: 5,
                user_name: 'er',
              },
              translation: {
                id: 4,
                test: 4,
                title: '5',
              },
            },
          ],
        }),
        { showHidden: false, depth: null, colors: true }
      )
    );
  });
});
