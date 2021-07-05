import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { UsersProfile } from '../entities/users_profile.entity';
import { accountStatus } from '../enum';
import { IUsers } from '../interfaces';

@Service()
@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  // constructor() {
  //   super(Users);
  // }
  /**
   * Create new user
   * @param data user data
   * @returns object
   */
  async createUser(data: IUsers) {
    /**this will trigger the @BeforeInsert() event on the entity class */
    return this.save(this.create(data));
  }

  /**
   * Get user by email
   * @param email user email
   * @returns object
   */
  async getUserByEmail(email: string) {
    return this.findOne(
      { email },
      {
        relations: ['profile'],
      },
    );
  }

  /**
   * Get user by id
   * @param userid user email
   * @returns object
   */
  async getUserById(userid: string): Promise<any> {
    return this.findOne(
      { id: userid },
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
  async updateAccount(data: any, userId: string): Promise<any> {
    return this.update({ id: userId }, data);
  }

  /**
   * Activate user account
   * @param userId user id
   * @returns object
   */
  async activateAccount(userId: string): Promise<any> {
    return this.update(
      { id: userId },
      {
        isActivated: true,
        accountStatus: accountStatus.ac,
      },
    );
  }
}
