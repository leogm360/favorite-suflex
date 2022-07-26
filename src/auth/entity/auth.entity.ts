import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field({ description: 'User jwt authentication token' })
  token: string;
}
