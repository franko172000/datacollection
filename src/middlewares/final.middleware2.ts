import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export class FinalMiddleware implements ExpressMiddlewareInterface {
  //private logger: debug.IDebugger = debug('project:middleware:FinalMiddleware');

  public use(req: Request, res: Response, next?: NextFunction): void {
    //this.logger('FinalMiddleware reached, ending response.');
    if (!res.headersSent) {
      // TODO: match current url against every registered one
      // because finalhandler is reached if no value is returned in the controller.
      // so we need to set 404 only if really there are no path handling this.
      // or we just have to return with null?
      res.status(404);
      res.send({ status: 404 });
    }
    res.end();
  }
}
