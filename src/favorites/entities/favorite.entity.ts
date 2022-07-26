import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Episode } from 'src/episodes';
import { Location } from 'src/locations';
import { Origin } from 'src/origins';

@ObjectType()
export class Favorite {
  @Field(() => Int, { description: 'Favorite unique identification' })
  id: number;

  @Field({ description: 'Favorite unique name' })
  name: string;

  @Field({ description: 'Favorite status' })
  status: string;

  @Field({ description: 'Favorite species' })
  species: string;

  @Field({ description: 'Favorite type' })
  type: string;

  @Field({ description: 'Favorite gender' })
  gender: string;

  @Field({ description: 'Favorite origin' })
  origin: Origin;

  @Field({ description: 'Favorite location' })
  location: Location;

  @Field({ description: 'Favorite image url' })
  image: string;

  @Field(() => [Episode], { description: 'Favorite character episodes' })
  episodes: Episode[];

  @Field({ description: 'Favorite profile url' })
  url: string;

  @Field({ description: 'Favorite created at' })
  created: string;
}
