import { join } from 'path';
import { cwd, env } from 'process';
import { convertToBoolean } from './utils/converters';

export const WORK_DIR = cwd();

export const GRAPHQL_SCHEMA_PATH = join(WORK_DIR, 'src/schema.graphql');

export const ENV_FILE_PATH = join(WORK_DIR, '.env');

export const DEBUG = convertToBoolean(env.DEBUG);

export const PLAYGROUND = convertToBoolean(env.PLAYGROUND);

export const SERVER_PORT = Number(env.PORT);

export const SIGNING_KEY = env.SIGNING_KEY;
