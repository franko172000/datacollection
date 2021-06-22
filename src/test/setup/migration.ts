import { createConnection } from 'typeorm';
import config from '../../config';

const initConnection = async () => {
  return createConnection({
    ...config.db,
    logging: true,
    migrations: [process.cwd() + '/src/migrations/**/*.ts'],
    cli: {
      migrationsDir: process.cwd() + '/src/migrations',
    },
  });
};

const dropTables = async () => {
  const connection = await initConnection();
  const result = await connection.query(
    `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${config.db.database}'`,
  );

  for (let i = 0; i < result.length; i++) {
    await connection.query(`SET FOREIGN_KEY_CHECKS = 0`);
    console.log(`Dropping table ${result[i].TABLE_NAME}`);
    await connection.query(`DROP TABLE IF EXISTS ${result[i].TABLE_NAME}`);
  }
  await connection.close();
};

const runMigration = async () => {
  const connection = await initConnection();
  await connection.runMigrations({
    transaction: 'all',
  });
  await connection.close();
};

(async () => {
  await dropTables();

  await runMigration();
})();
