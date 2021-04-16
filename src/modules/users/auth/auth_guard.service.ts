import { verify } from 'jsonwebtoken';
import moment from 'moment';
import { UnauthorizedError } from 'routing-controllers';
import { Service } from 'typedi';
import config from '../../../config';
import { BlacklistTokenRepository } from '../repositories/blacklist_repository';

@Service()
export default class AuthGuardSerivce {
  constructor(private readonly blacklistRepo: BlacklistTokenRepository) {}

  /**
   * Add token to blacklist
   * @param token
   * @param expireAt
   */
  async blacklistToken(token: string, expireAt: number) {
    const expiryDate = moment.unix(expireAt).format('YYYY-MM-DD HH:mm:ss');
    await this.blacklistRepo.blacklistToken(token, expiryDate);
  }

  /**
   * Check if token is blacklisted
   * @param token
   * @returns
   */
  async isBlacklisted(token: string): Promise<boolean> {
    const count = await this.blacklistRepo.checkBlacklist(token);
    return count > 0;
  }

  /**
   * Validate token
   * @param token
   * @returns string
   */
  async validateToken(token: string) {
    try {
      const decoded = verify(token, config.jwtSecret);
      return decoded;
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired token');
    }
  }
}
