import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';
import AuthGuardSerivce from '../auth/auth_guard.service';

@Service()
export class AuthGuard implements ExpressMiddlewareInterface {
  constructor(private authGuardService: AuthGuardSerivce) {}

  async use(request: any, response: any, next: (err?: any) => any) {
    const token = request.headers['authorization']
      ? request.headers['authorization'].split(' ')[1]
      : request.body.token;

    const decoded = await this.authGuardService.validateToken(token);

    //update the request object
    request.params['userId'] = decoded.data.id;

    next();
  }
}
