import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Auth, AuthService, CurrentUser, JWTAuthGuard } from 'src/auth';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { Favorite, FavoritesService } from 'src/favorites';
import { AddUserFavoriteInputs } from './dto/add-favorite.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly favoritesSersvice: FavoritesService,
    private readonly authService: AuthService,
  ) {}

  @ResolveField(() => [Favorite], { name: 'favorites' })
  favorites(@Parent() user: User) {
    return this.favoritesSersvice.getUserFavorites(user.id);
  }

  @Mutation(() => User, { name: 'createUser' })
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'findOneUser' })
  @UseGuards(JWTAuthGuard)
  findOneUser(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @UseGuards(JWTAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, { name: 'addUserFavorite' })
  @UseGuards(JWTAuthGuard)
  addUserFavorite(
    @Args('addUserFavoriteInputs') addUserFavoriteInputs: AddUserFavoriteInputs,
    @CurrentUser() user: any,
  ) {
    return this.usersService.addFavorite(addUserFavoriteInputs);
  }

  @Mutation(() => User, { name: 'removeUserFavorite' })
  @UseGuards(JWTAuthGuard)
  removeUserFavorite(
    @Args('userId') userId: string,
    @Args('favoriteId') favoriteId: string,
  ) {
    return this.usersService.removeFavorite(userId, favoriteId);
  }

  @Mutation(() => User, { name: 'removeUser' })
  @UseGuards(JWTAuthGuard)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Auth, { name: 'login' })
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;

    return this.authService.login(email, password);
  }
}
