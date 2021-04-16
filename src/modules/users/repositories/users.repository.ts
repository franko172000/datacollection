import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { Users } from '../entities/users.entity';
import { accountStatus } from '../enum';
import { IUsers } from '../interfaces';

@Service()
export class UsersRepository extends BaseRepository {
  constructor() {
    super(Users);
  }
  /**
   * Create new user
   * @param data user data
   * @returns object
   */
  async createUser(data: IUsers) {
    return await this.getRepo().save(data);
  }

  /**
   * Get user by email
   * @param email user email
   * @returns object
   */
  async getUserByEmail(email: string) {
    return await this.getRepo().findOne(
      { email },
      {
        relations: ['profile'],
      },
    );
  }

  /**
   * Update user account
   * @param data user data
   * @param userId user id
   * @returns object
   */
  async updateAccount(data: any, userId: string){
    return await this.getRepo().update({ id: userId }, data);
  }

  /**
   * Activate user account
   * @param userId user id
   * @returns object
   */
  async activateAccount(userId: string) {
    return await this.getRepo().update(
      { id: userId },
      {
        is_activated: 1,
        account_status: accountStatus.ac,
      },
    );
  }
}
