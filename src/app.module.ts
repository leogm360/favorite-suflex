import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
  DEBUG,
  ENV_FILE_PATH,
  GRAPHQL_SCHEMA_PATH,
  PLAYGROUND,
} from './settings';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ENV_FILE_PATH }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: GRAPHQL_SCHEMA_PATH,
      debug: DEBUG,
      playground: PLAYGROUND,
    }),
  ],
})
export class AppModule {}
