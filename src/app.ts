import 'reflect-metadata';
import express from 'express';
import http from 'http';
import config from './config';
import Logger from './loaders/logger';
import loader from './loaders';
const app = express();

// /**
//  * Use TypeDI as TypeORM dependency injector
//  */
// useContainer(Container);

export const startServer = async () => {
  //load initial dependencies
  await loader(app);

  /**
   * Get port from environment and store in Express.
   */
  const port = config.port;
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    Logger.info('Listening on' + bind);
    console.log('Listening on ' + bind);
  });
};

startServer();
