import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { IUsers } from '../interfaces';

@Service()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(data: IUsers) {
    return this.save(data);
  }
}
