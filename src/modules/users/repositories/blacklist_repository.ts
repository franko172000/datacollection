import { Service } from 'typedi';
import { EntityRepository, Repository } from 'typeorm';
import { UsersBlacklistToken } from '../entities/users_blacklist_token.entity';

@Service()
@EntityRepository(UsersBlacklistToken)
export class BlacklistTokenRepository extends Repository<UsersBlacklistToken> {
  /**
   * Add token to blacklist
   * @param token
   * @param expireAt
   * @returns
   */
  async blacklistToken(token: string, expireAt: string){
    return this.save({
      token,
      expireAt,
    });
  }

  /**
   * Check if token is blacklisted
   * @param token
   * @returns Promise<number>
   */
  async checkBlacklist(token: string) {
    return this.count({ token });
  }
}
