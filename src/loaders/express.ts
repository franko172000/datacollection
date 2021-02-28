import createError from 'http-errors';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import config from '../config';
import { useContainer, useExpressServer } from 'routing-controllers';
import routes from '../routes';
import Container from 'typedi';
import { createConnection } from 'typeorm';

export default (app: express.Application): void => {
  //set helmet
  app.use(helmet());
  //set express json
  app.use(express.json());
  //set body paerser
  app.use(bodyParser.json());
  

  //Let routing controller use TypeDI as dependency injector
  useContainer(Container);
  /**
   * Intialise routing controller
   */
  useExpressServer(app,{
    //set up base path
    routePrefix:config.api.prefix,
    //register all controllers
    controllers:[process.cwd() + '/src/**/*.controller.ts']
  })

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
