import { Field, InputType } from '@nestjs/graphql';
import { CreateFavoriteInput } from '../../favorites/dto/create-favorite.input';

@InputType()
export class AddUserFavoriteInputs extends CreateFavoriteInput {
  @Field({ description: 'User unique identification' })
  userId: string;
}
