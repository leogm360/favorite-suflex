import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Episode {
  @Field(() => Int, { description: 'Episode unique identification' })
  id: number;

  @Field({ description: 'Episode unique url' })
  url: string;
}
