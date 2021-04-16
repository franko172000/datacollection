import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { UsersBlacklistToken } from '../entities/users_blacklist_token.entity';

@Service()
export class BlacklistTokenRepository extends BaseRepository {
  constructor() {
    super(UsersBlacklistToken);
  }

  /**
   * Add token to blacklist
   * @param token
   * @param expireAt
   * @returns
   */
  async blacklistToken(token: string, expireAt: string): Promise<unknown> {
    return await this.getRepo().save({
      token,
      expireAt,
    });
  }

  /**
   * Check if token is blacklisted
   * @param token
   * @returns Promise<number>
   */
  async checkBlacklist(token: string): Promise<number> {
    return await this.getRepo().count({ token });
  }
}
