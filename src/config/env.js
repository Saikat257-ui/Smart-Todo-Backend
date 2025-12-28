import dotenv from 'dotenv';
dotenv.config();

/**
 * Centralized environment configuration
 * All environment variables are accessed through this module
 */
export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-todo';
export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_change_in_production';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '24h';
export const NODE_ENV = process.env.NODE_ENV || 'development';
