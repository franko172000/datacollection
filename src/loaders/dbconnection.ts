import {createConnection} from 'typeorm';
import config from '../config';
import path from 'path';
//set root directory
const rootDir = path.join(__dirname,'src');
/**
 * Exports TypeORM db configurations
 */
export default async () => {
    return await createConnection({
        type: "mysql",
        host: config.db.host,
        port: parseInt(config.db.port),
        username: config.db.user,
        password: config.db.password,
        database: config.db.name,
        synchronize: true
    })
}