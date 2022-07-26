import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => Int, { description: 'Location unique identification' })
  id: number;

  @Field({ description: 'Location unique name' })
  name: string;

  @Field({ description: 'Location unique url' })
  url: string;
}
