import * as dotenv from 'dotenv';
import * as process from 'process';
// Load env
dotenv.config();

// Environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// Server config
const PORT: number = parseInt(process.env.PORT, 10) || 8080;
const CONTEXT_PATH: string = process.env.CONTEXT_PATH || '/api';

// Database connection
const DATABASE_HOST: string = process.env.DATABASE_HOST || '';
const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT, 10) || 0;
const DATABASE_USER: string = process.env.DATABASE_USER || '';
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || '';
const DATABASE_NAME: string = process.env.DATABASE_NAME || '';
// Swagger config
const SWAGGER_ENDPOINT = process.env.SWAGGER_ENDPOINT || 'docs';

const LOG_FILE_PATH = process.env.LOG_FILE_PATH || 'logger.log';

const JWT_ACCESS_SECRET = process.env.JWT_SECRET || 'secret';
const AUTH_SCHEME = process.env.AUTH_SCHEME || 'Bearer';
const JWT_ACCESS_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '10h';

const WALLET_NONCE_TTL = parseInt(process.env.WALLET_NONCE_TTL, 10) || 500000;

export {
  NODE_ENV,
  PORT,
  CONTEXT_PATH,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  SWAGGER_ENDPOINT,
  LOG_FILE_PATH,
  JWT_ACCESS_SECRET,
  AUTH_SCHEME,
  JWT_ACCESS_EXPIRES_IN,
  WALLET_NONCE_TTL,
};
