import { Request, Response } from 'express';
import { Service } from 'typedi';
import AuthService from './auth.service';

@Service()
export default class AuthController {
  constructor(private service: AuthService) {}

  async login(req: Request, res: Response) {
    return await this.service.login(req, res);
  }
}
