import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites';
import { PrismaModule } from './prisma';
import { UsersModule } from './users';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    FavoritesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(cwd(), 'src/schema.graphql'),
      debug: false,
      playground: false,
    }),
  ],
})
export class AppModule {}
