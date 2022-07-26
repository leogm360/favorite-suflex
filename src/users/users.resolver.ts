import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Favorite, FavoritesService } from 'src/favorites';
import { AddUserFavoriteInputs } from './dto/add-favorite.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly favoritesSersvice: FavoritesService,
  ) {}

  @ResolveField(() => [Favorite], { name: 'favorites' })
  favorites(@Parent() user: User) {
    return this.favoritesSersvice.getUserFavorites(user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  addFavorite(
    @Args('addUserFavoriteInputs') addUserFavoriteInputs: AddUserFavoriteInputs,
  ) {
    return this.usersService.addFavorite(addUserFavoriteInputs);
  }

  // @Mutation(() => User)
  // removeFavorite(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return ;
  // }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }
}
