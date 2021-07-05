import { createConnection } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { useContainer } from 'typeorm';
import path from 'path';

//set root directory
const rootDir = path.join(__dirname, 'src');

/**
 * Exports TypeORM db configurations
 */
export default async () => {
  /**
   * Use TypeDI as TypeORM dependency injector
   */
  useContainer(Container);
  return createConnection();
};
