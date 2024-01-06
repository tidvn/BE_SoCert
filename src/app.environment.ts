import * as dotenv from 'dotenv';
import * as process from 'process';
// Load env
dotenv.config();

// Environment
export const NODE_ENV: string = process.env.NODE_ENV || 'development';

// Server config
export const PORT: number = parseInt(process.env.PORT, 10) || 8080;
export const CONTEXT_PATH: string = process.env.CONTEXT_PATH || '';
export const SITE_URL: string = process.env.SITE_URL || 'http://localhost:8080/';
// Database connection
export const DATABASE_HOST: string = process.env.DATABASE_HOST || '';
export const DATABASE_PORT: number = parseInt(process.env.DATABASE_PORT, 10) || 0;
export const DATABASE_USER: string = process.env.DATABASE_USER || '';
export const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || '';
export const DATABASE_NAME: string = process.env.DATABASE_NAME || '';
// Swagger config
export const SWAGGER_ENDPOINT = process.env.SWAGGER_ENDPOINT || 'docs';

export const LOG_FILE_PATH = process.env.LOG_FILE_PATH || 'logger.log';

export const JWT_ACCESS_SECRET = process.env.JWT_SECRET || 'secret';
export const AUTH_SCHEME = process.env.AUTH_SCHEME || 'Bearer';
export const JWT_ACCESS_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '10h';

export const WALLET_NONCE_TTL = parseInt(process.env.WALLET_NONCE_TTL, 10) || 500000;
