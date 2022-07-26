import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { cwd } from 'process';

import { FavoritesModule } from './favorites';
import { PrismaModule } from './prisma';
import { UsersModule } from './users';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    FavoritesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(cwd(), 'src/schema.graphql'),
      debug: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
