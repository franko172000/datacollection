import { BaseRepository } from '../../../repository/base.repository';
import { OTP } from '../entity/otp.entity';

export class OTPRepository extends BaseRepository {
  constructor() {
    super(OTP);
  }
  /**
   * Create OTP
   * @param Iotp data OTP interface
   * @returns promise
   */
  async createOTP(data: Iotp) {
    return await this.getRepo().save(data);
  }

  /**
   *
   * @param string code
   * @param string userId
   * @returns promise
   */
  async getOTP(code: number, userId: string) {
    return await this.getRepo().findOne({ code, user_id: userId });
  }
}
