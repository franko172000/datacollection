import { Request, Response } from 'express';
import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';
import AuthService from './auth.service';

@Controller('/auth/')
@Service()
export default class AuthController {
  constructor(private service: AuthService) {}
  
  @Get('login')
  async login() {
    return {message:'this is login'}
  }

  @Get('addUser')
  async addUser(){
      return this.service.addUser();
  }
}
