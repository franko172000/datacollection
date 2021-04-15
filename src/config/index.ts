import dotenv from 'dotenv';
import msgChannels from './brooker_channels';
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '3000', 10),

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api/v1/',
  },

  /**
   * Database configurations
   */
  db: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
    port: process.env.DB_PORT || '3306',
    type: process.env.DB_TYPE || '',
  },

  amqpUrl: process.env.AMQP_URL,
  brookerChannels: msgChannels,
};
