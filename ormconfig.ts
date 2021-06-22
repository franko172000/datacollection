import config from './src/config';
const dbConfig = {
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  migrations: ['src/migrations/**/*.ts'],
};

let migrationsDir = 'src/migrations';
const env = process.env.NODE_ENV;

if (env && env.trim() === 'test') {
  migrationsDir = 'src/test/migrations';
  dbConfig['dropSchema'] = true;
 // dbConfig['migrations'] = [migrationsDir + '/**/*.ts'];
}

export default [
  {
    ...dbConfig,
    synchronize: true,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  },
];
