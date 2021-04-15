import { Action, Interceptor, InterceptorInterface } from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    return content;
  }
}
