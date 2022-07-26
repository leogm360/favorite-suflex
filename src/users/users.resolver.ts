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
import { Favorite, FavoritesService } from 'src/favorites';
import { AddUserFavoriteInputs } from './dto/add-favorite.input';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JWTAuthGuard)
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  addFavorite(
    @Args('addUserFavoriteInputs') addUserFavoriteInputs: AddUserFavoriteInputs,
    @CurrentUser() user: any,
  ) {
    return this.usersService.addFavorite(addUserFavoriteInputs);
  }

  // @Mutation(() => User)
  // removeFavorite(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return ;
  // }

  @Mutation(() => User)
  @UseGuards(JWTAuthGuard)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => Auth)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;

    return this.authService.login(email, password);
  }
}
