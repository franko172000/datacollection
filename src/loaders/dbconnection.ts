import {createConnection, useContainer} from 'typeorm';
import config from '../config';
import path from 'path';
import Container from 'typedi';

//set root directory
const rootDir = path.join(__dirname,'src');


/**
 * Exports TypeORM db configurations
 */
export default async () => {
    /**
     * Use TypeDI as TypeORM dependency injector
     */
    //useContainer(Container);
    await createConnection()
}