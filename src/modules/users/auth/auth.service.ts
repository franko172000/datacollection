import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Connection, getConnection, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BaseService } from '../../../services/base.service';
import { Users } from '../entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

@Service()
export default class AuthService extends BaseService {
  //@InjectRepository(Users) private readonly userRepo: Repository<Users>
  private readonly repository: any;
  constructor(private readonly userRepo:UsersRepository){
      super();
  }

  async login(req: Request, res: Response) {
    return this.clientError(res);
  }

  async addUser() {
    // const data = await this.userRepo.createUser({
    //   email: "franko172000@gmail.com",
    //   password: "Test"
    // })
    this.userRepo.createUser({
      email: "franko172000@gmail.com",
      password: "Test"
    })
    return {message:"User created"}
  }
}
