import { Field, InputType } from '@nestjs/graphql';

@InputType()
class OriginInput {
  @Field({ description: 'Origin unique name' })
  originName: string;

  @Field({ description: 'Origin unique url', nullable: true })
  originUrl: string;
}

@InputType()
class LocationInput {
  @Field({ description: 'Location unique name' })
  locationName: string;

  @Field({ description: 'Location unique url', nullable: true })
  locationUrl: string;
}

@InputType()
export class CreateFavoriteInput {
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

  @Field(() => OriginInput, { description: 'Favorite origin' })
  origin: OriginInput;

  @Field(() => LocationInput, { description: 'Favorite location' })
  location: LocationInput;

  @Field({ description: 'Favorite image url' })
  image: string;

  @Field(() => [String], { description: 'Favorite episodes' })
  episodes: string[];

  @Field({ description: 'Favorite created at' })
  created: string;
}
