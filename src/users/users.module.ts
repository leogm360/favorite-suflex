import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth';
import { FavoritesModule } from 'src/favorites';
import { PrismaModule } from '../prisma';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, FavoritesModule, AuthModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
