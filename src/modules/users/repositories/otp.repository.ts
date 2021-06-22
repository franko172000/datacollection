import { Service } from 'typedi';
import { BaseRepository } from '../../../repository/base.repository';
import { OTP } from '../entities/otp.entity';
import { Iotp } from '../interfaces';

@Service()
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
    return this.getRepo().save(data);
  }

  /**
   *
   * @param string code
   * @param string userId
   * @returns promise
   */
  async getOTP(code: number, userId: string) {
    return this.getRepo().findOne({ code, user_id: userId });
  }

  /**
   * Delete OTP from database
   * @param id number
   */
  async deleteOTP(id: number) {
    this.getRepo().delete({ id });
  }
}
