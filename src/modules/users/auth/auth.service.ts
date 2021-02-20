import { Request, Response } from 'express';
import { Service } from 'typedi';
import { BaseService } from '../../../services/BaseService';

@Service()
export default class AuthService extends BaseService {
  async login(req: Request, res: Response) {
    return this.clientError(res);
  }
}
