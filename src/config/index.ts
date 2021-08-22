import dotenv from 'dotenv';
import msgChannels from './brooker_channels';
// Set the NODE_ENV to 'development' by default
const environment = process.env.NODE_ENV || '';
const envFound = dotenv.config();

//default development db config
const db = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  type: process.env.DB_TYPE || 'mysql',
};

//Test db for running unit test
if (environment && environment.trim() === 'test') {
  db['host'] = process.env.TEST_DB_HOST;
  db['username'] = process.env.TEST_DB_USER;
  db['password'] = process.env.TEST_DB_PASSWORD;
  db['database'] = process.env.TEST_DB_NAME;
}

if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  environment: environment.trim(),
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
  db,

  amqpUrl: process.env.AMQP_URL,
  brookerChannels: msgChannels,
  /**
   * Send grid API key
   */
  sendgridKey: process.env.SENDGRID_API,
  emailSender: process.env.EMAIL_FROM,
};
