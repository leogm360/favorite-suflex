import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Origin {
  @Field(() => Int, { description: 'Origin unique identification' })
  id: number;

  @Field({ description: 'Origin unique name' })
  name: string;

  @Field({ description: 'Origin unique url', nullable: true })
  url: string;
}
