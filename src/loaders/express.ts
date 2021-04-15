import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from '../config';
import { useContainer, useExpressServer } from 'routing-controllers';
import MessageBrooker from '../brooker';
import Container from 'typedi';
import cors from 'cors';

export default (app: express.Application): void => {
  //register message brooker receiver
  MessageBrooker();
  //set helmet
  app.use(helmet());
  //set express json
  app.use(express.json());
  //set body paerser
  app.use(bodyParser.json());
  //use cors
  app.use(cors());

  //Let routing controller use TypeDI as dependency injector
  useContainer(Container);
  /**
   * Intialise routing controller
   */
  useExpressServer(app, {
    //set up base path
    routePrefix: config.api.prefix,
    defaultErrorHandler: false, // disable default error handler
    //register all controllers
    controllers: [process.cwd() + '/src/**/*.controller.ts'],
    middlewares: [process.cwd() + '/src/**/*.middleware.ts'],
    interceptors: [process.cwd() + '/src/**/*.interceptor.ts'],
  });

  //load routes
  //app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404));
  // });

  // // error handler
  // app.use(function (err, req, res, next) {
  //   // set locals, only providing error in development
  //   res.locals.message = err.message;
  //   res.locals.error = req.app.get('env') === 'development' ? err : {};

  //   // render the error page
  //   res.status(err.status || 500);
  //   res.render('error');
  // });
};
