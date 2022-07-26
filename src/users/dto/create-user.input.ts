import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User unique login email' })
  email: string;

  @Field({ description: 'User password' })
  password: string;

  @Field({ description: 'User name' })
  name: string;
}
