import { Module } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites';
import { PrismaModule } from '../prisma';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, FavoritesModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
